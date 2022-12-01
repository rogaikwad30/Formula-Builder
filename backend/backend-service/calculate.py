import pymongo
import datetime
import os
import json
import time 


mongo_cli = pymongo.MongoClient(host="localhost", username="admin", password="admin123", authSource="analyse_db")
db = mongo_cli["analyse_db"]

FORMULA_METADATA_COLLECTION = "formula_metadata"
SLEEP_TIME = 10
derived_value_dict = {}

def get_distinct_key (distinct_columns,doc):
    key = "#"
    for i in distinct_columns:
        if i not in doc or doc[i] is None:
            key = ""
            break
        key += (str(doc[i]) + "#" )
    return key


# return the calculation between two operands depending on operator.
def apply_formula(operand1, operand2, operator):
    result = None
    if type(operand1) not in [int, float] or type(operand2) not in [int, float]:
        return None
    if operator in ["addition", "average"]:
        result = operand1 + operand2
    elif operator == "subtraction":
        result = operand1 - operand2
    elif operator == "multiplication":
        result = operand1 * operand2
    elif operator == "division":
        if operand2 == 0:
            return None
        result = operand1 / operand2
    elif operator == "power":
        result = operand1 ** operand2
    elif operator == "min":
        result = operand1 if operand1 < operand2 else operand2
    elif operator == "max":
        result = operand1 if operand1 > operand2 else operand2
    return result

# Recursively calculate the formula and return a single
# result value to the caller.
def recursive_calculate(formula_json, db, doc=None):
    if "operands" not in formula_json:
        # This is the base case.
        # Return the value corresponding to operand,
        # based on its type:
        # "variable": return the corresponding value in the document.
        # "derived" : return the corresponding value in the document and
        #             also update the derived_operand_dict.
        # "constant": convert the string parameter into float and return.
        if formula_json["type"] == "constant":
            return float(formula_json["name"])
        try:
            key = formula_json["column"]
        except KeyError:
            return None
        if formula_json["type"] == "variable":
            return doc.get(key)
        if key in derived_value_dict:
            return derived_value_dict[key]
        derived_collection = formula_json["collection_name"]
        col_obj = db[derived_collection]
        doc = col_obj.find_one({formula_json["column"]: {"$exists": 1}})
        # TODO: Handle None doc result.
        value = doc[formula_json["column"]]
        derived_value_dict[key] = value
        return value
    operator = formula_json["operator"]
    result = "NON-INITIALIZED"
    noperands = 0
    for operand_data in formula_json["operands"]:
        if result == "NON-INITIALIZED":
            result = recursive_calculate(operand_data, db, doc)
            continue
        elif result == None:
            return None
        result2 = recursive_calculate(operand_data, db, doc)
        if result2 == None:
            return None
        result = apply_formula(result, result2, operator)
        noperands += 1
    if operator == "average" and result != None:
        result /= noperands
    return result

def construct_querry_from_distinct_columns(distinct_columns=[],distinct_key="#",start_time=1):
    querry = {
        "time_EP": {"$eq": start_time},
        "key_name" : distinct_key,
    }
    if len(distinct_columns) == 0:
        return querry

    values_array = distinct_key.split('#')
    # ['', 'value-1','value-2' , ......, '#']
    i = 1
    for key in distinct_columns:
        querry[key] = values_array[i]
        i += 1
    return querry

def update_result(formula_name, db, resultcol, start_time, result_tag_name, result_dict={},distinct_columns=[]):
    # Check if any document exists with the same time value in the
    # result collection. If so we just need to add the formula column
    # to the document. Otherwise a new document needs to be created.
    
    for key in result_dict:
        result = result_dict[key][result_tag_name]
        querry = construct_querry_from_distinct_columns(distinct_columns,key,start_time)

        # print("Saving Result - ")
        resultcol.update_one(
            querry, 
            {
                "$set": {
                    formula_name: result, 
                    "time": datetime.datetime.fromtimestamp(start_time)
                }
            },  
            upsert=True 
        )

def continuous_calculate_absolute(fjson, db, col, distinct_columns=[]):
    interval = fjson["interval_value"]
    formula_name = fjson["formula_name"]
    result_col = db[fjson["result_collection"]]
    aggr = fjson["aggregation"]
    time_column = fjson["time_column"]
    start_time = fjson["interval_start"]
    formula_metacol = db[FORMULA_METADATA_COLLECTION]
    if len(time_column) < 4 or time_column[-3:] != "_EP":
        # The time column passed isn't and epoch time column.
        # We need to convert it into epoch before further series handling.
        time_column += "_EP"
    nentries_read = 0
    try:
        fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
    except Exception:
        fmeta_doc = None
    if fmeta_doc != None:
        nentries_read = fmeta_doc[formula_name]["nentries_processed"]
    local_nentries_read = 0
    cursor = col.find({time_column: {"$gte": start_time}}).skip(nentries_read)
    count = cursor.count()
    if count == 0:
        return
    aggr_result = None
    ndocs = 0


    result_dict = {}


    for doc in cursor:
        key = get_distinct_key(distinct_columns,doc)
        if key == "":
            # required tags are absent in doc
            continue
        if key not in result_dict:
            result_dict[key] = {} 
        result = recursive_calculate(fjson["operands"][0], db, doc)
        result_dict[key][fjson["operands"][0]['name']] = result

        print("Result dict - ", result_dict)






        if result == None:
            local_nentries_read += 1
            nentries_read += 1
            continue
        if aggr_result == None:
            start_time = doc[time_column]
            aggr_result = result
        else:
            if aggr in ["sum", "average"]:
                aggr_result = aggr_result + result
            elif aggr == "min":
                if aggr_result > result:
                    aggr_result = result
            elif aggr == "max":
                if aggr_result < result:
                    aggr_result = result
            elif aggr == "absolute":
                if aggr_result == None:
                    aggr_result = result
        local_nentries_read += 1
        nentries_read += 1
        ndocs += 1
        if local_nentries_read >= interval:
            if aggr == "average":
                aggr_result = aggr_result / ndocs



            
            update_result(formula_name, db, result_col, start_time, fjson["operands"][0]['name'] ,result_dict, distinct_columns)
            result_dict = {}






            fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
            if fmeta_doc != None:
                formula_metacol.update_one({formula_name: {"$exists": 1}}, \
                    {"$set": {formula_name: {"nentries_processed": nentries_read}}})
            else:
                formula_metacol.insert_one({formula_name: \
                    {"nentries_processed": nentries_read}})
            local_nentries_read = 0
            ndocs = 0
            aggr_result = None
    
    update_result(formula_name, db, result_col, start_time, fjson["operands"][0]['name'] ,result_dict, distinct_columns)

def continuous_calculate_time(fjson, db, col):
    interval = fjson["interval_value"]
    formula_name = fjson["formula_name"]
    result_col = db[fjson["result_collection"]]
    formula_metacol = db[FORMULA_METADATA_COLLECTION]
    start_time = None
    aggr = fjson["aggregation"]
    time_column = fjson["time_column"]
    if len(time_column) < 4 or time_column[-3:] != "_EP":
        # The time column passed isn't and epoch time column.
        # We need to convert it into epoch before further series handling.
        time_column += "_EP"
    fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
    if fmeta_doc != None:
        start_time = fmeta_doc[formula_name]["last_time_processed"]
        interval_end = start_time + interval
        cursor = col.find({time_column: {"$gte": start_time}})
    else:
        cursor = col.find({time_column: {"$gte": fjson["interval_start"]}})
    if cursor.count() == 0:
        return
    result = None
    aggr_result = None
    ndocs = 0
    for doc in cursor:
        if start_time == None:
            start_time = doc[time_column]
            interval_end = start_time + interval
        result = recursive_calculate(fjson["operands"][0], db, doc)
        if result == None:
            continue
        if aggr_result == None:
            aggr_result = result
        else:
            if aggr in ["sum", "average"]:
                aggr_result = aggr_result + result
            elif aggr == "min":
                if aggr_result > result:
                    aggr_result = result
            elif aggr == "max":
                if aggr_result < result:
                    aggr_result = result
            elif aggr == "absolute":
                if aggr_result == None:
                    aggr_result = result
        ndocs += 1
        if doc[time_column] >= (interval_end - 1):
            if aggr == "average":
                aggr_result = aggr_result / ndocs
            update_result(formula_name, db, result_col, start_time, aggr_result)
            fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
            if fmeta_doc != None:
                formula_metacol.update_one({formula_name: {"$exists": 1}}, \
                    {"$set": {formula_name: {"last_time_processed": interval_end}}})
            else:
                formula_metacol.insert_one({formula_name: \
                    {"last_time_processed": interval_end}})
            start_time = interval_end
            interval_end = interval_end + interval
            aggr_result = None
            ndocs = 0
    
    update_result(formula_name, db, result_col, start_time, aggr_result)

# Fill the additional information related to aggregation
# in the original request json.
# The additional info is whether the aggregation is present
# in the hierarchy of 'computed' components in the json.
# This information helps to decide whether to recursively
# call the internal aggregation function for some aggregator
# operator specified in the hierarchy or call
# recursive_calculate() to directly get the calculation result.
def fill_internal_aggr_info(fjson):
    aggr_present = False
    for operand in fjson["operands"]:
        if operand["type"] in ["aggregate", "computed"]:
            if operand["type"] == "aggregate":
                if aggr_present == False:
                    aggr_present = True
            local_aggr_present = fill_internal_aggr_info(operand)
            aggr_present = aggr_present or local_aggr_present
    fjson["aggr_present"] = aggr_present
    return aggr_present

def recursive_calculate_interval_aggr_copy(fjson, result_dict):
    aggr_result = None
    operator = fjson["operator"]
    for operand in fjson["operands"]:
        op_type = operand["type"]
        if op_type == "constant":
            result = float(operand["name"])
        elif op_type in ["derived", "aggregate"]:
            print("Hey - ", operand["name"] ,result_dict)
            result = result_dict[operand["name"]]
        else:
            recursive_calculate_interval_aggr(operand, result_dict)
            result = result_dict[operand["name"]]
        if result == None:
            result_dict[fjson["name"]] = None
            return
        if aggr_result == None:
            aggr_result = result
            continue
        aggr_result = apply_formula(aggr_result, result, operator)
    result_dict[fjson["name"]] = aggr_result

def recursive_calculate_interval_aggr(fjson, result_dict):
    aggr_result = None
    operator = fjson["operator"]
    for operand in fjson["operands"]:
        op_type = operand["type"]
        if op_type == "constant":
            result = float(operand["name"])
        elif op_type in ["derived", "aggregate"]: 
            result = result_dict[operand["name"]]
        else:
            recursive_calculate_interval_aggr(operand, result_dict)
            result = result_dict[operand["name"]]
        if result == None:
            result_dict[fjson["name"]] = None
            return
        if aggr_result == None:
            aggr_result = result
            continue
        aggr_result = apply_formula(aggr_result, result, operator)
    result_dict[fjson["name"]] = aggr_result

def fun(fjson,result_dict):
    print()
    print("Fun - ", result_dict)
    print()
    for each_distinct_key in result_dict:
        recursive_calculate_interval_aggr(fjson,result_dict[each_distinct_key])

def recursive_calculate_aggr(fname, fjson, db, col, doc, result_dict):
    if fjson["type"] == "computed":
        if fjson["aggr_present"]:
            for operand in fjson["operands"]:
                recursive_calculate_aggr(fname, operand, db, col, doc, result_dict)
        else:
            result_dict[fjson["name"]] = recursive_calculate(fjson, db, doc)
        return
    if fjson["type"] == "aggregate":
        aggr = fjson["aggregator"]
        recursive_calculate_aggr(fname, fjson["operands"][0], db, col, doc, result_dict)
        print("Looking For - ",fjson["operands"][0]["name"], result_dict)
        result = result_dict[fjson["operands"][0]["name"]]
        print()
        if fjson["name"] not in result_dict:
            result_dict[fjson["name"]] = result
            if result == None:
                return
        else:
            if result == None:
                return
            if result_dict[fjson["name"]] == None:
                result_dict[fjson["name"]] = result
                return
            prev_value = result_dict[fjson["name"]]
            if aggr == "sum":
                result = result + prev_value
            elif aggr == "min":
                if result > prev_value:
                    result = prev_value
            elif aggr == "max":
                if result < prev_value:
                    result = prev_value 
            elif aggr == "first":
                result = result_dict[fjson["name"]]
                # result_dict[fjson["name"]] = result
            elif aggr == "absolute":
                if aggr_result == None:
                    aggr_result = result
            # TODO: handle average aggregation.
            result_dict[fjson["name"]] = result
        return
    if fjson["type"] == "derived":
        if fjson["name"] not in result_dict:
            col_obj = db[fjson["collection_name"]]
            val_doc = col_obj.find_one({fname: {"$exists": 1}})
            # TODO: handle non-existence of derived value.
            result_dict[fjson["name"]] = val_doc[fjson["column"]]

def calculate_aggregate_internal_absolute(fjson, db, col):
    interval = fjson["interval_value"]
    formula_name = fjson["formula_name"]
    result_col = db[fjson["result_collection"]]
    time_column = fjson["time_column"]
    start_time = fjson["interval_start"]
    formula_metacol = db[FORMULA_METADATA_COLLECTION]
    if len(time_column) < 4 or time_column[-3:] != "_EP":
        # The time column passed isn't and epoch time column.
        # We need to convert it into epoch before further series handling.
        time_column += "_EP"
    nentries_read = 0
    try:
        fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
    except Exception:
        fmeta_doc = None
    if fmeta_doc != None:
        nentries_read = fmeta_doc[formula_name]["nentries_processed"]
    local_nentries_read = 0
    cursor = col.find({time_column: {"$gte": start_time}}).skip(nentries_read)
    count = cursor.count()
    if count == 0:
        return
    result_dict = {}
    start_time = None
    for doc in cursor:
        if start_time == None:
            start_time = doc[time_column]
        recursive_calculate_aggr(formula_name, fjson["operands"][0], db, col, doc, \
            result_dict)
        local_nentries_read += 1
        nentries_read += 1
        if local_nentries_read >= interval:
            recursive_calculate_interval_aggr(fjson["operands"][0], result_dict)
            update_result(formula_name, db, result_col, start_time, \
                result_dict[fjson["operands"][0]["name"]])
            fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
            if fmeta_doc != None:
                formula_metacol.update_one({formula_name: {"$exists": 1}}, \
                    {"$set": {formula_name: {"nentries_processed": nentries_read}}})
            else:
                formula_metacol.insert_one({formula_name: \
                    {"nentries_processed": nentries_read}})
            result_dict = {}
            local_nentries_read = 0
            start_time = None
    
    update_result(formula_name, db, result_col, start_time, \
                result_dict[fjson["operands"][0]["name"]])

def calculate_aggregate_internal_time(fjson, db, col, distinct_columns):
    interval = fjson["interval_value"]
    formula_name = fjson["formula_name"]
    result_col = db[fjson["result_collection"]]
    time_column = fjson["time_column"]
    if len(time_column) < 4 or time_column[-3:] != "_EP":
        time_column += "_EP"
    start_time = None
    formula_metacol = db[FORMULA_METADATA_COLLECTION]
    try:
        fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
    except Exception:
        fmeta_doc = None
    if fmeta_doc != None:
        start_time = fmeta_doc[formula_name]["last_time_processed"]
    if start_time == None:
        cursor = col.find({time_column: {"$gte": fjson["interval_start"]}})
    else:
        cursor = col.find({time_column: {"$gte": start_time}})
    count = cursor.count()
    if count == 0:
        print("bye")
        return
    result_dict = {}
    print("Hi")
    for doc in cursor:
        if start_time == None:
            start_time = fjson["interval_start"]


        key = get_distinct_key(distinct_columns,doc)
        if key == "":
            # required tags are absent in doc
            print("Skipping - ",doc)
            continue
        if key not in result_dict:
            result_dict[key] = {}

        recursive_calculate_aggr(formula_name, fjson["operands"][0], db, col, doc, \
            result_dict[key])



        interval_end = start_time + interval
        if doc[time_column] >= (interval_end - 1):
            fun(fjson["operands"][0], result_dict)

            print()
            print("Backed - ",result_dict)
            print()
            
            update_result(formula_name, db, result_col, start_time, \
                fjson["operands"][0]["name"], result_dict,distinct_columns)
            

            fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
            if fmeta_doc != None:
                formula_metacol.update_one({formula_name: {"$exists": 1}}, \
                    {"$set": {formula_name: {"last_time_processed": interval_end}}})
            else:
                formula_metacol.insert_one({formula_name: \
                    {"last_time_processed": interval_end}})
            result_dict = {}
            start_time = interval_end
        
    fun(fjson["operands"][0], result_dict)
    update_result(formula_name, db, result_col, start_time, fjson["operands"][0]["name"], result_dict,distinct_columns)

    print("Hey Final Result Dict is - ")
    print()
    print(result_dict)
    print()


def construct_querry_from_onchange_columns(onchange_columns=[],onchange_key="#",start_time=1):
    querry = {
        "time_EP": {"$eq": start_time}
    }
    if len(onchange_columns) == 0:
        return querry

    values_array = onchange_key.split('#')
    i = 1
    for key in onchange_columns:
        querry[key] = values_array[i]
        i += 1

    return querry




def update_result_onchange(
    formula_name, db, resultcol, start_time, result_tag_name, 
    result_dict={},distinct_columns=[], 
    onChangeTags=[], previous_value=None, current_value=None, key=None):
    if previous_value is None or current_value is None or len(onChangeTags) == 0:
        return 

    result = result_dict[key][result_tag_name]
    querry = construct_querry_from_distinct_columns(distinct_columns,key,start_time)


    last_value_querry = construct_querry_from_onchange_columns(onChangeTags,previous_value,start_time)
    current_value_querry = construct_querry_from_onchange_columns(onChangeTags,current_value,start_time)


    final_querry = {
        "time_EP" : last_value_querry["time_EP"],
        "key_name" : querry["key_name"]
    }
    for commonKey in last_value_querry:
        if commonKey not in current_value_querry:
            return
        if commonKey in ["time_EP","time"]:
            continue
            
        if last_value_querry[commonKey] != current_value_querry[commonKey]:
            # save the result here
            final_querry["column"] = commonKey

            resultcol.update_one(
                final_querry, 
                {
                    "$set": {
                        formula_name: result, 
                        "last_value" : last_value_querry[commonKey],
                        "current_value" : current_value_querry[commonKey],
                        "time": datetime.datetime.fromtimestamp(start_time)
                    }
                },  
                upsert=True 
            )

            final_querry = {
                "time_EP" : last_value_querry["time_EP"],
                "key_name" : querry["key_name"]
            }


def calculate_continuous_onChangeFormulas(fjson,db,col,distinct_columns, onChangeTags):
    formula_name = fjson["formula_name"]
    result_col = db[fjson["result_collection"]]
    time_column = fjson["time_column"]
    
    if len(time_column) < 4 or time_column[-3:] != "_EP":
        time_column += "_EP"
    start_time = None
    formula_metacol = db[FORMULA_METADATA_COLLECTION]
    last_values = {}

    try:
        fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
    except Exception:
        fmeta_doc = None
    if fmeta_doc != None:
        start_time = fmeta_doc[formula_name]["last_time_processed"]
        last_values = fmeta_doc[formula_name]["last_values"]

    if start_time == None:
        cursor = col.find({time_column: {"$gte": fjson["interval_start"]}})
    else:
        cursor = col.find({time_column: {"$gte": start_time}})
    count = cursor.count()
    if count == 0:
        return
    result_dict = {}
    for doc in cursor:
        if start_time == None:
            start_time = doc[time_column]

        key = get_distinct_key(distinct_columns,doc)
        onChangeKey = None
        for j in onChangeTags:
            if onChangeKey is None:
                onChangeKey = str(j) + "#"
            else:
                onChangeKey += str(j) + "#"      
        onChangeValue = get_distinct_key(onChangeTags, doc)
        if key == "" or onChangeKey is None:
            print("Skipping - ",doc)
            continue
        
        if key not in last_values:
            last_values[key] = {}
        if onChangeKey not in last_values[key]:
            last_values[key][onChangeKey] = onChangeValue        

        interval_end = False
        previous_value = last_values[key][onChangeKey]
        current_value = onChangeValue
        if onChangeValue != last_values[key][onChangeKey]:
            interval_end = True
            last_values[key][onChangeKey] = onChangeValue 
        if key not in result_dict:
            result_dict[key] = {}

        if interval_end:
            recursive_calculate_interval_aggr(fjson["operands"][0],result_dict[key])

            update_result_onchange(
                formula_name, db, result_col, doc[time_column], fjson["operands"][0]["name"], result_dict,distinct_columns,
                onChangeTags, previous_value, current_value,key
            )
            

            fmeta_doc = formula_metacol.find_one({
                formula_name: {"$exists": 1}
            })

            if fmeta_doc != None:
                formula_metacol.update_one({
                    formula_name: {"$exists": 1}}, {
                        "$set": {
                            formula_name: {
                                "last_time_processed": doc[time_column],
                                "last_values": last_values,
                                "last_time_processed_obj": datetime.datetime.fromtimestamp(doc[time_column]),
                            }
                        }
                    }
                )
            else:
                formula_metacol.insert_one({
                    formula_name: {
                        "last_time_processed": doc[time_column],
                        "last_values" : last_values,
                        "last_time_processed_obj": datetime.datetime.fromtimestamp(doc[time_column])
                    }
                })

            result_dict[key] = {}
            start_time = doc[time_column]

        recursive_calculate_aggr(formula_name, fjson["operands"][0], db, col, doc, \
            result_dict[key])            
              

def continuous_calculate(fjson, db, col):
    distinct_columns = []
    onchangeTags = []

    if "distinct_columns" in fjson and fjson["distinct_columns"] is not None:
        distinct_columns = fjson["distinct_columns"]
    if "onchange_tags" in fjson:
        onchangeTags = fjson["onchange_tags"]


    
    if "aggregation" in fjson:
        if fjson["interval_type"] == "absolute":
            return continuous_calculate_absolute(fjson, db, col, distinct_columns)
        return continuous_calculate_time(fjson, db, col)
    



    fill_internal_aggr_info(fjson)

    if "interval_type" in fjson and fjson["interval_type"] == "onchange":
        print("Hey Handling Onchange Calculations now ")
        print()
        calculate_continuous_onChangeFormulas(fjson, db, col, distinct_columns, onchangeTags)
        return


    if "interval_type" in fjson and fjson["interval_type"] == "copyDocument":
        # handleCopyDocumentTypeFormulas(fjson,db,col,FORMULA_METADATA_COLLECTION)
        pass


    if fjson["interval_type"] == "absolute":
        return calculate_aggregate_internal_absolute(fjson, db, col)
    
    return calculate_aggregate_internal_time(fjson, db, col, distinct_columns)


while 1:
    cursor = db["formulas"].find()
    for doc in cursor:
        fjson = doc
        print("Hey2 - ",doc) 
        col = db[fjson["collection_name"]]
        # print("Hey - ",col) 
        continuous_calculate(fjson,db,col)
        print("suceess")
    
    time.sleep(240)


