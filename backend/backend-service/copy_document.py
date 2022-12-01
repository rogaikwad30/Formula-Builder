import datetime as dt
FORMULA_METADATA_COLLECTION = "formula_metadata"

# can be removed from here
import time
import pymongo
mongo_cli = pymongo.MongoClient(host="localhost", username="admin", password="admin123", authSource="analyse_db")
db = mongo_cli["analyse_db"]



def handleCopyDocumentTypeFormulas(fjson,db,col,FORMULA_METADATA_COLLECTION):
    formula_name = fjson["formula_name"]
    result_col = db[fjson["result_collection"]]
    time_column = fjson["time_column"]
    time_column_ep = fjson["time_column"]

    if len(time_column) < 4 or time_column[-3:] != "_EP":
        time_column_ep = time_column + "_EP"
    else:
        time_column = time_column[:len(time_column-3)]

    formula_metacol = db[FORMULA_METADATA_COLLECTION]
    try:
        fmeta_doc = formula_metacol.find_one({formula_name: {"$exists": 1}})
    except Exception:
        fmeta_doc = None
    
    start_ep = fjson["interval_start"]
    if fmeta_doc is not None:
        start_ep = fmeta_doc[formula_name]["last_time_processed"]
    
    copy_configs = fjson["config"]
    times = copy_configs["times"]
    tags = copy_configs["tags"]

    projection = {}
    for tag in tags:
        projection[tag] = {
            "$first" : "$" + tag
        } 

    current_ep = dt.datetime.now().timestamp()
    while start_ep < current_ep:
        start_obj = dt.datetime.fromtimestamp(start_ep)
        processing_date = start_obj.day
        processing_month = start_obj.month
        processing_year = start_obj.year

        for obj in times: 
            insert_time_obj = dt.datetime(
                year = processing_year,
                month = processing_month,
                day = processing_date,
                hour = obj["hour"],
                minute = obj["minutes"],
                second = obj["seconds"] 
            )
            insert_time_ep = insert_time_obj.timestamp()
            op = "$gt"
            time_sort_dir = 1
            if "less than" in obj["operator"]:
                op = "$lt"
                time_sort_dir = -1

            distinct_obj = { }
            for tag in fjson['distinct_columns']:
                distinct_obj[tag] = '$' + tag
            projection['_id'] = distinct_obj
            pipeline = [
                {
                    '$match': {
                        time_column_ep : {
                            op : insert_time_ep
                        }
                    }
                }, {
                    '$sort': {
                        time_column_ep : time_sort_dir
                    }
                }, {
                    '$group': projection
                }
            ]


            print("Pipeline is - ", pipeline)
            
            cursor = col.aggregate(pipeline)
            for aggregate_doc in cursor:
                if '_id' not in aggregate_doc:
                    continue
                
                querry = aggregate_doc['_id']
                querry[time_column_ep] = insert_time_ep
                doc = col.find_one(querry)

                if doc is not None:
                    # print("\nDocument for - ",insert_time_obj, querry ,' already exists; hence not inserting copied document.\n')
                    continue
                
                doc = aggregate_doc
                if '_id' not in doc:
                    continue
                doc.pop('_id')
                
                doc[time_column] = insert_time_obj
                doc[time_column_ep] = insert_time_ep
                doc['added_by_fb'] = True

                # print("New Document to be added is - ", doc, "\n")
                result_col.insert_one(doc)
        
        fmeta_doc = formula_metacol.find_one({
            formula_name: {"$exists": 1}
        })
        if fmeta_doc != None:
            formula_metacol.update_one({
                formula_name: {"$exists": 1}}, {
                    "$set": {
                        formula_name: {
                            "last_time_processed": start_ep,
                            "last_time_processed_obj": start_obj
                        }
                    }
                }
            )
        else:
            formula_metacol.insert_one({
                formula_name: {
                    "last_time_processed": start_ep,
                    "last_time_processed_obj": start_obj
                }
            })
        start_ep += 86400

while 1:
    cursor = db["formulas"].find()
    for doc in cursor:
        fjson = doc
        col = db[fjson["collection_name"]]
        if "interval_type" not in fjson and fjson["interval_type"] != "copyDocument":
            continue
        handleCopyDocumentTypeFormulas(fjson,db,col,FORMULA_METADATA_COLLECTION)
    
    time.sleep(1000)

