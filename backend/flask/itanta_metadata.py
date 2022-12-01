import datetime
import time
from pymongo import MongoClient

try:
    HOSTNAME = "127.0.0.1"
    USERNAME = 'admin'
    PASSWORD = 'admin123'
    PORT_NUMBER = '27017'
    DATABASE = 'analyse_db'
    mongo_conn_str = f"mongodb://{USERNAME}:{PASSWORD}@{HOSTNAME}:{PORT_NUMBER}/{DATABASE}"
    client = MongoClient(mongo_conn_str)
    mongoinfo = client.server_info()['version']
    db = client[DATABASE]
except Exception as e:
    while True:
        client = MongoClient(mongo_conn_str)
        mongoinfo = client.server_info()['version']
        db = client[DATABASE]
        break



def parse_data_type(data_type):
    try:
        switcher = {
            "tinyint": "number",
            "smallint": "number",
            "int": "number",
            "bigint": "number",
            "float": "number",
            "double": "number",
            "decimal": "number",
            "boolean": "bool",
            "bool": "bool",
            "number": "number",
            "char": "text",
            "varchar": "text",
            "varchar2": "text",
            "nvarchar": "text",
            "tinytext": "text",
            "ntext": "text",
            "text": "text",
            "blob": "text",
            "mediumtext": "text",
            "mediumblob": "text",
            "longtext": "text",
            "longblob": "text",
            "date": "time",
            "datetime": "time",
            "timestamp": "time",
            "time": "time",
            "datetime2": "time",
            "str": "text",
            "float32": "number",
            "float64": "number",
            "int16": "number",
            "int32": "number",
            "uint16": "number",
            "uint32": "number",
            "bits": "number",
        }
        return switcher.get(data_type, "text")
    except Exception as e:
        print(e)
#["tbl_EM_DeviceAdditionalData","tbl_EM_DeviceElecAlarmLog","tbl_EM_DeviceElecDemandInstant","tbl_EM_DerivedValueData","tbl_EM_DeviceCompressorInstantValue","tbl_EM_DeviceElecArchive","tbl_EM_DeviceElecDigInputLog"]


def updateMetadata(col, doc):
    # obj_collection = db[f'{col}']
    # doc = obj_collection.find_one({}, {"_id": 0})
    column_info_list = []
    for k, v in doc.items():
        column_info_dict = {
            "name": k,
            "type": v,
            "property": "none",
            'format': "none",
            "isMatchColumn": False,
            "isUniqueTimeColumn": False,
            "isenddate": False,
            "isstartdate": False
        }
        if column_info_dict["type"] in ["time"]:
            column_info_dict["property"] = "sort"
        column_info_list.append(column_info_dict)

    insert_data = {"conf": {
        "collection": f'{col}',
        "path": "localhost",
        "dbname": "SAR",
        "table": col.split("-")[1],
        "db_table": col.split("-")[1],  # To do : encrypt password while saving
        "columninfo": column_info_list
    },
        "updated_at": datetime.datetime.now(),
        "datatype": "db",
        "requesttype": "data",
        "id": f"data-source-{str(int(datetime.datetime.now().timestamp()))}",
        "type": col.split("-")[0],
        "clientip": "localhost",
        "frequency": 60,
        "__v": 0,
    }
    obj_metadatas = db["metadatas"]
    try:
        print(insert_data)
        obj_metadatas.update_one({"conf.collection": f'{col}'}, {"$set": insert_data}, upsert=True)
        return True
    except Exception as e:
        return False