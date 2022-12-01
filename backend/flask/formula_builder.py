from unittest import result
import pymongo
from flask import Flask, request
from itanta import host_environ
from flask_cors import CORS, cross_origin
from bson import ObjectId
from itanta_metadata import updateMetadata

mongo_cli = pymongo.MongoClient(host="localhost", username="admin", password="admin123", authSource="analyse_db")
db = mongo_cli["analyse_db"]

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def getTagsDict(data):
    sampleDict = {
        "time" : "time"
    }
    for doc in data:
        if 'formula_name' in doc:
            if '_ep' in doc['formula_name'].lower():
                sampleDict[doc['formula_name']] = "number"
                sampleDict[doc['formula_name'][:-3]] = "time"
            else:
                sampleDict[doc['formula_name']] = "number"
        if 'distinct_columns' in doc:
            for colName in doc['distinct_columns']:
                sampleDict[colName] = "text"
        print(sampleDict)
        updateMetadata(doc['result_collection'], sampleDict)

@app.route('/save-all-formulas', methods=['POST'])
@cross_origin()
def save_all_formulas():
    # try:
        if request.method != 'POST':
            return {'resp': 'failure', 'error': 'invalid request'}
        requestBody = request.get_json()
        name = requestBody.get('name', None)
        data = requestBody.get('data', None)
        if name == None or data == None:
            return {"resp": "failure", "error": "invalid data"}
        db.formulas.delete_many({"name": name})
        db.formulas.insert_many(data)
        print("Hii")
        getTagsDict(data)
        # db.formulas_info.update_one({"formula_name": name}, {"$set": {"data": data}}, upsert = True)
        return {"resp": "success"}
    # except Exception as e:
    #     return {"resp": "failure", "error": str(e)}


@app.route('/save-formula', methods=['POST'])
@cross_origin()
def save_formula():
    try:
        if request.method != 'POST':
            return {'resp': 'failure', 'error': 'invalid request'}
        data = request.get_json()
        formula_name = data.get('formula_name', None)
        start_from = data.get('start_from', 1)
        start_from_obj = data.get('start_from_obj', "")
        interval = data.get('interval', 100)
        result_collection = data.get('result_collection', None)
        if formula_name == None or result_collection == None:
            return {"resp": "failure", "error": "invalid data"}
        db.formulas_info.update_one({"formula_name": formula_name}, {"$set": {"result_collection": result_collection,"start_from" : start_from, "start_from_obj":start_from_obj,"interval":interval}}, upsert=True)
        result = db.formulas_info.find_one({"formula_name": formula_name})
        _id = result.get('_id', None)
        return {"resp": "success", "_id": str(_id)}
    except Exception as e:
        return {"resp": "failure", "error": str(e)}

@app.route('/formulas', methods=['GET'])

@cross_origin()

def get_formulas():
    try:
        if request.method != 'GET':
            return {'resp': 'failure', 'error': 'invalid request'}
        formulas = db.formulas_info.find({})
        formulas_list = []
        for formula in formulas:
            formula['_id'] = str(formula['_id'])
            formulas_list.append(formula)
        return {"resp": "success", "data": formulas_list}
    except Exception as e:
        return {"resp": "failure", "error": str(e)}

@app.route('/formulas/<_id>', methods=['GET', 'DELETE'])
@cross_origin()
def get_formula(_id):
    try:
        if request.method != 'GET' and request.method != 'DELETE':
            return {'resp': 'failure', 'error': 'invalid request'}
        formula = db.formulas_info.find_one({"_id": ObjectId(_id)}, {"_id": 0})
        if formula == None:
            return {"resp": "failure", "error": "doesn't exists"}
        if request.method == 'GET':
            return {"resp": "success", "data": formula}
        elif request.method == 'DELETE':
            db.formulas_info.delete_one({"_id":ObjectId(_id)})
            formula = db.formulas_info.find({})
            formulas_list = []
            for formula in formula:
                formula['_id'] = str(formula['_id'])
                formulas_list.append(formula)
            return {"resp": "success", "data": formulas_list}
    except Exception as e:
        return {"resp": "failure", "error": str(e)}

@app.route('/save-formula/<_id>', methods=['POST'])

@cross_origin()
def update_formula(_id):
    try:
        if request.method != 'POST':
            return {'resp': 'failure', 'error': 'invalid request'}
        data = request.get_json()
        print(data, _id)
        db.formulas_info.update_one({"_id": ObjectId(_id)}, {"$set": data})
        return {"resp": "success"}
    except Exception as e:
        return {"resp": "failure", "error": str(e)}


@app.route('/formulas/all', methods=['DELETE'])
@cross_origin()
def delete_all_formulas():
    try:
        if request.method != 'DELETE':
            return {'resp': 'failure', 'error': 'invalid request'}
        formulas = db.formulas_info.find({}, {"_id": 0})
        formulas_list = []
        for formula in formulas:
            formulas_list.append(formula)
        formulas = db.formulas_info.delete_many({})
        return {"resp": "success", "data": formulas_list}
    except Exception as e:
        return {"resp": "failure", "error": str(e)}

@app.route('/test-api', methods=['POST', 'GET'])
def test_api():
    if request.method == 'GET':
        data = [
                {"name" : "Formula A", "_id" : 1, "result_collection" : "Archive-Test-1"},
                {"name" : "Formula B", "_id" : 2, "result_collection" : "Archive-Test-2"},
                {"name" : "Formula C", "_id" : 3, "result_collection" : "Archive-Test-3"},
                {"name" : "Formula D", "_id" : 4, "result_collection" : "Archive-Test-4"},
                {"name" : "Formula E", "_id" : 5, "result_collection" : "Archive-Test-5"}
            ]
        
        key = int(request.args.to_dict().get('_id'))
        print("checking for key : ", key)
        obj = {
            "resp" : "failure"
        }
        for i in data:
            if i["_id"] == key:
                obj = i
                obj["resp"] = "success"
                break
        return obj

    # elif request.method == 'GET':
    #     return {
    #         "resp" : "success",
    #         "sample_list": [
    #             {"name" : "Formula A", "_id" : 1},
    #             {"name" : "Formula B", "_id" : 2},
    #             {"name" : "Formula C", "_id" : 3},
    #             {"name" : "Formula D", "_id" : 4},
    #             {"name" : "Formula E", "_id" : 5}
    #         ]
    #     }
    else:
        return {"resp" : "failure"}

if __name__ == '__main__':
    app.run(debug=True)