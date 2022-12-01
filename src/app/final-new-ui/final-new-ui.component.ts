import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import * as go from 'gojs';


@Component({
  selector: 'app-final-new-ui',
  templateUrl: './final-new-ui.component.html',
  styleUrls: ['./final-new-ui.component.css'],
})
export class FinalNewUiComponent implements OnInit {
  public model: go.TreeModel = new go.TreeModel(
    []
  );

  
  formula_name = '';
  result_collection = '';
  configurating_tag = '' || 'NA';
  formula_representation = '';
  backend_data = [];
  formula_info = {};
  is_it_final_tag = false;
  collection_name = '';

  tag_name = '';
  time_col = '';
  formula_id = '';

  datasource_id = '';
  frequency = 0;

  selectable_tags = [];
  distinct_tags_selected = [];
  onchange_tags_selected = []

  data_sources = [
{
   // "_id" : ObjectId("6374bb0b0c5c8a938d08cf8b"),
    "conf" : {
        "collection" : "Archive-TotalizerRawData",
        "path" : "localhost",
        "dbname" : "SAR",
        "table" : "TotalizerRawData",
        "db_table" : "TotalizerRawData",
        "columninfo" : [ 
            {
                "name" : "LogTime",
                "type" : "time",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "SubMachineName",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "MachineName",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "ProdCount",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "LogTime_EP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }
        ]
    },
   // "updated_at" : ISODate("2022-11-16T15:57:23.181Z"),
    "datatype" : "db",
    "requesttype" : "data",
    "id" : "data-source-1668594443",
    "type" : "Archive",
    "clientip" : "localhost",
    "frequency" : 60,
    "__v" : 0
},
{
   // "_id" : ObjectId("6374b8e5ccdb4b8ee0ae4593"),
    "conf" : {
        "collection" : "Archive-TotalizerResults",
        "path" : "localhost",
        "dbname" : "SAR",
        "table" : "TotalizerResults",
        "db_table" : "TotalizerResults",
        "columninfo" : [ 
            {
                "name" : "MachineName",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "SubMachineName",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "key_name",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "time_EP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "time",
                "type" : "time",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "totalizer",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }
        ]
    },
    //"updated_at" : ISODate("2022-11-16T15:48:13.402Z"),
    "datatype" : "db",
    "requesttype" : "data",
    "id" : "data-source-1668593893",
    "type" : "Archive",
    "clientip" : "localhost",
    "frequency" : 60,
    "__v" : 0
},
    {
      conf: {
        collection: 'Archive-CrateData',
        path: 'localhost',
        dbname: 'SAR',
        table: 'CrateData',
        db_table: 'CrateData',
        columninfo: [
          {
            name: 'shift',
            type: 'shift',
          },
          {
            name: 'id',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'Sr no',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'Parameter ID',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'Source',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
        ],
      },
      updated_at: '2022-07-27T12:53:12.308',
      datatype: 'db',
      requesttype: 'data',
      id: 'data-source-1658906592',
      type: 'Archive',
      clientip: 'localhost',
      frequency: 60,
      __v: 0,
    },
    {
      "conf" : {
          "collection" : "Archive-Deviation",
          "path" : "localhost",
          "dbname" : "SAR",
          "table" : "Deviation",
          "db_table" : "Deviation",
          "columninfo" : [ 
              {
                  "name" : "Batch Count",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Ingredient",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Line",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "key_name",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "time_EP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Deviation",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "time",
                  "type" : "time",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Deviation Percent",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Set",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Actual",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }
          ]
      },
      "datatype" : "db",
      "requesttype" : "data",
      "id" : "data-source-1665056768",
      "type" : "Archive",
      "clientip" : "localhost",
      "frequency" : 60,
      "__v" : 0
  },
    {
      "_id": {
        "$oid": "633dbce2c94c6e40fc10aaa9"
      },
      "conf": {
        "collection": "Archive-opc-Mixing_NSP_Tags",
        "path": "localhost",
        "dbname": "SAR",
        "table": "opc",
        "db_table": "opc",
        "columninfo": [
          {
            "name": "Line",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Ingredient",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Batch Count",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Set",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Actual",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Archive-opc-Mixing_NSP_Tags_TIMESTAMP",
            "type": "time",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Archive-opc-Mixing_NSP_Tags_TIMESTAMP_EP",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          }
        ]
      },
      "updated_at": {
        "$date": {
          "$numberLong": "1665010234183"
        }
      },
      "datatype": "db",
      "requesttype": "data",
      "id": "data-source-1664990434",
      "type": "Archive",
      "clientip": "localhost",
      "frequency": 60,
      "__v": 0
    },
    {
      // "_id" : ObjectId("62cc04d58fe90266efd584f7"),
      "conf" : {
          "collection" : "Archive-REPORTING_REF_1",
          "path" : "DESKTOP-NP7TK6N\\WINCC",
          "dbname" : "CC_LEHA_NEW_21_09_28_19_19_25",
          "table" : "REPORTING_REF_1",
          "db_table" : "REPORTING",
          "columninfo" : [ 
              {
                  "name" : "TK-101_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-101_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-101_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-101_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-101_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-101_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-102_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-102_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-102_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-102_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-102_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-102_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-103_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-103_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-103_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-103_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-103_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-103_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-104_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-104_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-104_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-104_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-104_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-104_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-105_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-105_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-105_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-105_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-105_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-105_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-106_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-106_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-106_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-106_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-106_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-106_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-107_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-107_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-107_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-107_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-107_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-107_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-108_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-108_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-108_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-108_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-108_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-108_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-109_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-109_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-109_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-109_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-109_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-109_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-110_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-110_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-110_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-110_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-110_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-110_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-111_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-111_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-111_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-111_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-111_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-111_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-112_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-112_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-112_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-112_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-112_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-112_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-113_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-113_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-113_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-113_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-113_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-113_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-114_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-114_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-114_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-114_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-114_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-114_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-115_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-115_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-115_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-115_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-115_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-115_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-116_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-116_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-116_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-116_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-116_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-116_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-117_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-117_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-117_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-117_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-117_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-117_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-118_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-118_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-118_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-118_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-118_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-118_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-119_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-119_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-119_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-119_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-119_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-119_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-120_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-120_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-120_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-120_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-120_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-120_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-121_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-121_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-121_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-121_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-121_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-121_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-122_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-122_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-122_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-122_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-122_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-122_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-302_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-302_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-302_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-302_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-302_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-302_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-303_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-303_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-303_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-303_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-303_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-303_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-305_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-305_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-305_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-305_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-305_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-305_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-306_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-306_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-306_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-306_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-306_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-306_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-307_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-307_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-307_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-307_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-307_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-307_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-501_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-501_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-501_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-501_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-501_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-501_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-502_OBSERV_DENSITY",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-502_PRODUCT_CODE",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-502_PRODUCT_LVL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-502_PRODUCT_MASS",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-502_PRODUCT_TEMP",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "TK-502_TOT_OBSERV_VOL",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Timestamp",
                  "type" : "time",
                  "property" : "sort",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }
          ],
          "username" : "sa",
          "password" : "CIMPLICITY8.2",
          "portnumber" : 1433
      },
      // "updated_at" : ISODate("2022-10-31T16:20:09.825Z"),
      "datatype" : "db",
      "requesttype" : "data",
      "id" : "data-source-1657537749",
      "type" : "Archive",
      "clientip" : "localhost",
      "dstype" : "WINCC-SQL",
      "__v" : 0,
      "connectorname" : "WinCC Tag Logging (7.4 SP1 + Update 4 and Above)",
      "frequency" : 60
  },
  {
    // "_id" : ObjectId("636a23323b58046a9267b6ee"),
    "conf" : {
        "collection" : "Archive-tbl_production_log",
        "path" : "localhost",
        "dbname" : "SAR",
        "table" : "tbl_production_log",
        "db_table" : "tbl_production_log",
        "columninfo" : [ 
            {
                "name" : "ProdCountlog_Id",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "LogTime",
                "type" : "time",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Mapping_Id",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "SubMachId",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Shift_Id",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Variant_Id",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Hour_Id",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "ProdCount",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "OrgLogTime",
                "type" : "time",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "SubMachine_Name",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Machine_Name",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Machines_id",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "ShiftName",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "VariantName",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Line_Name",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "LogTime_EP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "OrgLogTime_EP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }
        ]
    },
    // "updated_at" : ISODate("2022-11-08T15:06:50.990Z"),
    "datatype" : "db",
    "requesttype" : "data",
    "id" : "data-source-1667900210",
    "type" : "Archive",
    "clientip" : "localhost",
    "frequency" : 60,
    "__v" : 0
},
  {
    // "_id" : ObjectId("633c05cd4b4abbfe27db1d7c"),
    "conf" : {
        "collection" : "Archive-opc-Mixing_NSP_Tags",
        "path" : "bit-line-a.ABB.AfwOpcDaSurrogate",
        "dbname" : "IBPL_",
        "table" : "Mixing_NSP_Tags",
        "db_table" : "Mixing_NSP_Tags",
        "columninfo" : [ 
            {
                "name" : "Line",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Line"
            }, 
            {
                "name" : "Ingredient",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Ingredient"
            }, 
            {
                "name" : "Batch Count",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Batch Count"
            }, 
            {
                "name" : "Set",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Set"
            }, 
            {
                "name" : "Actual",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Actual"
            }, 
            {
                "name" : "NewEra_Batch:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "NewEra_Batch:Actual_Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Flavour1_MBK_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Flavour1_MBK_Tot_BC:Value"
            }, 
            {
                "name" : "Flavour1_MBK_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Flavour1_MBK_Tot_BC:Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Biscuitdust_tol_bc:value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Biscuitdust_tol_bc:value"
            }, 
            {
                "name" : "Sugar_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Sugar_Tot_BC:Value"
            }, 
            {
                "name" : "APalmOil_BC:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "APalmOil_BC:Actual_Value"
            }, 
            {
                "name" : "Flavour1_MBK_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Flavour1_MBK_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Liquid_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Liquid_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Flavour2_NC_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Flavour2_NC_Tot_BC:Value"
            }, 
            {
                "name" : "Flavour2_NC_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Flavour2_NC_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Powder_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Powder_Tot_BC:Value"
            }, 
            {
                "name" : "Flavour3_Nice_Tot_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Flavour3_Nice_Tot_BC:Value"
            }, 
            {
                "name" : "BFlour_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BFlour_BC:Value"
            }, 
            {
                "name" : "BGSugar_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BGSugar_BC:Value"
            }, 
            {
                "name" : "BPowder_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BPowder_BC:Value"
            }, 
            {
                "name" : "BPowder_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BPowder_BC:Value"
            }, 
            {
                "name" : "BPowder_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BPowder_BC:Value"
            }, 
            {
                "name" : "BPowder_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BPowder_BC:Value"
            }, 
            {
                "name" : "BPowder_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BPowder_BC:Value"
            }, 
            {
                "name" : "BLQD_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BLQD_BC:Value"
            }, 
            {
                "name" : "BLQD_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BLQD_BC:Value"
            }, 
            {
                "name" : "BLQD_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BLQD_BC:Value"
            }, 
            {
                "name" : "BLQD_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BLQD_BC:Value"
            }, 
            {
                "name" : "BLQD_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BLQD_BC:Value"
            }, 
            {
                "name" : "BFlavour_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BFlavour_BC:Value"
            }, 
            {
                "name" : "BFlavour_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BFlavour_BC:Value"
            }, 
            {
                "name" : "BFlavour_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BFlavour_BC:Value"
            }, 
            {
                "name" : "Root/PLCConnect Servers/OPC Servers/BIL_Creamer/BCreamer_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Root/PLCConnect Servers/OPC Servers/BIL_Creamer/BCreamer_BC:Value"
            }, 
            {
                "name" : "Root/PLCConnect Servers/OPC Servers/BIL_Creamer/BCreamer_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Root/PLCConnect Servers/OPC Servers/BIL_Creamer/BCreamer_BC:Value"
            }, 
            {
                "name" : "BSugar_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BSugar_BC:Value"
            }, 
            {
                "name" : "Root/PLCConnect Servers/OPC Servers/BIL_Creamer/BCreamer_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Root/PLCConnect Servers/OPC Servers/BIL_Creamer/BCreamer_BC:Value"
            }, 
            {
                "name" : "BPalm_Oil_BC:Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BPalm_Oil_BC:Value"
            }, 
            {
                "name" : "NewEra_set_Wt:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "NewEra_set_Wt:Actual_Value"
            }, 
            {
                "name" : "Salt_Sol_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Salt_Sol_SW:Actual_Value"
            }, 
            {
                "name" : "SBC_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "SBC_SW:Actual_Value"
            }, 
            {
                "name" : "Vitamin_PreMix_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Vitamin_PreMix_SW:Actual_Value"
            }, 
            {
                "name" : "Calcium_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Calcium_SW:Actual_Value"
            }, 
            {
                "name" : "ABC_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "ABC_SW:Actual_Value"
            }, 
            {
                "name" : "Lecithin_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Lecithin_SW:Actual_Value"
            }, 
            {
                "name" : "DMG_Paste_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "DMG_Paste_SW:Actual_Value"
            }, 
            {
                "name" : "SMP_Sol_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "SMP_Sol_SW:Actual_Value"
            }, 
            {
                "name" : "FCCM_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "FCCM_SW:Actual_Value"
            }, 
            {
                "name" : "Invert_Cyrup_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Invert_Cyrup_SW:Actual_Value"
            }, 
            {
                "name" : "Vanilla_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Vanilla_SW:Actual_Value"
            }, 
            {
                "name" : "FFM_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "FFM_SW:Actual_Value"
            }, 
            {
                "name" : "Water_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Water_SW:Actual_Value"
            }, 
            {
                "name" : "ACreamer_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "ACreamer_SW:Actual_Value"
            }, 
            {
                "name" : "Sugar_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Sugar_SW:Actual_Value"
            }, 
            {
                "name" : "APalmOil_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "APalmOil_SW:Actual_Value"
            }, 
            {
                "name" : "BIL_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BIL_SW:Actual_Value"
            }, 
            {
                "name" : "Salt_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Salt_SW:Actual_Value"
            }, 
            {
                "name" : "Datum_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Datum_SW:Actual_Value"
            }, 
            {
                "name" : "Malt_Extract_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Malt_Extract_SW:Actual_Value"
            }, 
            {
                "name" : "Glocuse_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Glocuse_SW:Actual_Value"
            }, 
            {
                "name" : "Montreal_Sugar_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Montreal_Sugar_SW:Actual_Value"
            }, 
            {
                "name" : "Malton_Dextrin_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Malton_Dextrin_SW:Actual_Value"
            }, 
            {
                "name" : "BCG19_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BCG19_SW:Actual_Value"
            }, 
            {
                "name" : "BM29_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BM29_SW:Actual_Value"
            }, 
            {
                "name" : "Starch_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Starch_SW:Actual_Value"
            }, 
            {
                "name" : "Coconut_Milk_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Coconut_Milk_SW:Actual_Value"
            }, 
            {
                "name" : "Lactose_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Lactose_SW:Actual_Value"
            }, 
            {
                "name" : "WHEY_PWD_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "WHEY_PWD_SW:Actual_Value"
            }, 
            {
                "name" : "Toasted_Coconut_SW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Toasted_Coconut_SW:Actual_Value"
            }, 
            {
                "name" : "BFlr_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BFlr_SW:Actual_value"
            }, 
            {
                "name" : "BGSugar_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BGSugar_SW:Actual_value"
            }, 
            {
                "name" : "BSalt_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BSalt_SW:Actual_value"
            }, 
            {
                "name" : "Bsbc_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Bsbc_SW:Actual_value"
            }, 
            {
                "name" : "BVitamin_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BVitamin_SW:Actual_value"
            }, 
            {
                "name" : "BCalcium_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BCalcium_SW:Actual_value"
            }, 
            {
                "name" : "BABC_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BABC_SW:Actual_value"
            }, 
            {
                "name" : "BLecithin_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BLecithin_SW:Actual_value"
            }, 
            {
                "name" : "BGMS_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BGMS_SW:Actual_value"
            }, 
            {
                "name" : "BSMP_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BSMP_SW:Actual_value"
            }, 
            {
                "name" : "BMILK_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BMILK_SW:Actual_value"
            }, 
            {
                "name" : "BSyrup_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BSyrup_SW:Actual_value"
            }, 
            {
                "name" : "BVanila_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BVanila_SW:Actual_value"
            }, 
            {
                "name" : "BBil_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BBil_SW:Actual_value"
            }, 
            {
                "name" : "BFFM_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BFFM_SW:Actual_value"
            }, 
            {
                "name" : "BWater_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BWater_SW:Actual_value"
            }, 
            {
                "name" : "BBiscuitDust_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BBiscuitDust_SW:Actual_value"
            }, 
            {
                "name" : "BSugar_SW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BSugar_SW:Actual_value"
            }, 
            {
                "name" : "BCream_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BCream_AW:Actual_value"
            }, 
            {
                "name" : "Act_qty:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Act_qty:Actual_Value"
            }, 
            {
                "name" : "Maida_Wt_Actual:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Maida_Wt_Actual:Actual_Value"
            }, 
            {
                "name" : "Salt_Sol_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Salt_Sol_AW:Actual_Value"
            }, 
            {
                "name" : "SBC_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "SBC_AW:Actual_Value"
            }, 
            {
                "name" : "Vitamin_PreMix_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Vitamin_PreMix_AW:Actual_Value"
            }, 
            {
                "name" : "Calcium_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Calcium_AW:Actual_Value"
            }, 
            {
                "name" : "ABC_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "ABC_AW:Actual_Value"
            }, 
            {
                "name" : "Lecithin_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Lecithin_AW:Actual_Value"
            }, 
            {
                "name" : "DMG_Paste_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "DMG_Paste_AW:Actual_Value"
            }, 
            {
                "name" : "SMP_Sol_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "SMP_Sol_AW:Actual_Value"
            }, 
            {
                "name" : "FCCM_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "FCCM_AW:Actual_Value"
            }, 
            {
                "name" : "Invert_Cyrup_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Invert_Cyrup_AW:Actual_Value"
            }, 
            {
                "name" : "Vanilla_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Vanilla_AW:Actual_Value"
            }, 
            {
                "name" : "FFM_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "FFM_AW:Actual_Value"
            }, 
            {
                "name" : "Water_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Water_AW:Actual_Value"
            }, 
            {
                "name" : "ACreamer_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "ACreamer_AW:Actual_Value"
            }, 
            {
                "name" : "Sugar_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Sugar_AW:Actual_Value"
            }, 
            {
                "name" : "APalmOil_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "APalmOil_AW:Actual_Value"
            }, 
            {
                "name" : "BIL_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BIL_AW:Actual_Value"
            }, 
            {
                "name" : "Salt_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Salt_AW:Actual_Value"
            }, 
            {
                "name" : "Datum_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Datum_AW:Actual_Value"
            }, 
            {
                "name" : "Malt_Extract_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Malt_Extract_AW:Actual_Value"
            }, 
            {
                "name" : "Glocuse_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Glocuse_AW:Actual_Value"
            }, 
            {
                "name" : "Montreal_Sugar_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Montreal_Sugar_AW:Actual_Value"
            }, 
            {
                "name" : "Malton_Dextrin_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Malton_Dextrin_AW:Actual_Value"
            }, 
            {
                "name" : "BCG19_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BCG19_AW:Actual_Value"
            }, 
            {
                "name" : "BM29_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BM29_AW:Actual_Value"
            }, 
            {
                "name" : "Starch_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Starch_AW:Actual_Value"
            }, 
            {
                "name" : "Coconut_Milk_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Coconut_Milk_AW:Actual_Value"
            }, 
            {
                "name" : "Lactose_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Lactose_AW:Actual_Value"
            }, 
            {
                "name" : "WHEY_PWD_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "WHEY_PWD_AW:Actual_Value"
            }, 
            {
                "name" : "Toasted_Coconut_AW:Actual_Value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Toasted_Coconut_AW:Actual_Value"
            }, 
            {
                "name" : "BFlour_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BFlour_AW:Actual_value"
            }, 
            {
                "name" : "BGSugar_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BGSugar_AW:Actual_value"
            }, 
            {
                "name" : "BSalt_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BSalt_AW:Actual_value"
            }, 
            {
                "name" : "Bsbc_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Bsbc_AW:Actual_value"
            }, 
            {
                "name" : "BVitamin_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BVitamin_AW:Actual_value"
            }, 
            {
                "name" : "BCalcium_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BCalcium_AW:Actual_value"
            }, 
            {
                "name" : "BABC_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BABC_AW:Actual_value"
            }, 
            {
                "name" : "BLecithin_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BLecithin_AW:Actual_value"
            }, 
            {
                "name" : "BGMS_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BGMS_AW:Actual_value"
            }, 
            {
                "name" : "BSMP_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BSMP_AW:Actual_value"
            }, 
            {
                "name" : "BMILK_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BMILK_AW:Actual_value"
            }, 
            {
                "name" : "BSyrup_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BSyrup_AW:Actual_value"
            }, 
            {
                "name" : "BVanila_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BVanila_AW:Actual_value"
            }, 
            {
                "name" : "BBil_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BBil_AW:Actual_value"
            }, 
            {
                "name" : "BFFM_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BFFM_AW:Actual_value"
            }, 
            {
                "name" : "BWater_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BWater_AW:Actual_value"
            }, 
            {
                "name" : "BBiscuitDust_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BBiscuitDust_AW:Actual_value"
            }, 
            {
                "name" : "BSugar_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BSugar_AW:Actual_value"
            }, 
            {
                "name" : "BCream_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BCream_AW:Actual_value"
            }, 
            {
                "name" : "BPalm_Oil_AW:Actual_value",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "BPalm_Oil_AW:Actual_value"
            }, 
            {
                "name" : "Archive-opc-Mixing_NSP_Tags_TIMESTAMP",
                "type" : "time",
                "property" : "sort",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false,
                "itemName" : "Archive-opc-Mixing_NSP_Tags_TIMESTAMP"
            }
        ],
        "spath" : "",
        "cname" : "IBPL_",
        "rmode" : "HOT"
    },
    // "updated_at" : ISODate("2022-10-04T15:37:09.577Z"),
    "datatype" : "opc",
    "requesttype" : "data",
    "id" : "data-source-1664878029",
    "type" : "Archive",
    "clientip" : "localhost",
    "dstype" : "OPC-DA-NEW",
    "__v" : 0,
    "frequency" : 60000
},
  {
    // "_id" : ObjectId("62d157978dec20fb53a6062a"),
    "conf" : {
        "collection" : "Archive-REPORTING_REF_2",
        "path" : "DESKTOP-6F9GBB4\\WINCC",
        "dbname" : "CC_P-81_FRA_22_07_13_17_01_56",
        "table" : "REPORTING_REF_2",
        "db_table" : "REPORTING",
        "columninfo" : [ 
            {
                "name" : "TK-401_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-401_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-401_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-401_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-401_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-401_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-402_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-402_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-402_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-402_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-402_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-402_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-403_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-403_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-403_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-403_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-403_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-403_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-404_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-404_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-404_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-404_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-404_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-404_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-405_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-405_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-405_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-405_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-405_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-405_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-406_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-406_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-406_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-406_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-406_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-406_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-407_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-407_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-407_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-407_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-407_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-407_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-408_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-408_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-408_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-408_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-408_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-408_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-410_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-410_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-410_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-410_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-410_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-410_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-411_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-411_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-411_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-411_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-411_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-411_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-412_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-412_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-412_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-412_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-412_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-412_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-413_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-413_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-413_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-413_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-413_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-413_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-414_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-414_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-414_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-414_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-414_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-414_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-415_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-415_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-415_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-415_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-415_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-415_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_1_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_1_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_1_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_1_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_1_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_1_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_2_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_2_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_2_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_2_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_2_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_2_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_3_OBSERV_DENSITY",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_3_PRODUCT_CODE",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_3_PRODUCT_LVL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_3_PRODUCT_MASS",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_3_PRODUCT_TEMP",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TK-907_3_TOT_OBSERV_VOL",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Timestamp",
                "type" : "time",
                "property" : "sort",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }
        ],
        "username" : "sa",
        "password" : "CIMPLICITY8.2",
        "portnumber" : 1433
    },
    // "updated_at" : ISODate("2022-10-31T16:28:12.839Z"),
    "datatype" : "db",
    "requesttype" : "data",
    "id" : "data-source-1657886615",
    "type" : "Archive",
    "clientip" : "localhost",
    "dstype" : "WINCC-SQL",
    "__v" : 0,
    "connectorname" : "WinCC Tag Logging (7.4 SP1)",
    "frequency" : 10
},
    {
      // "_id" : ObjectId("635a4d571fd22bb519717d36"),
      "conf" : {
          "collection" : "Archive-Melsec_OEE_Results",
          "path" : "localhost",
          "dbname" : "SAR",
          "table" : "Melsec_OEE_Results",
          "db_table" : "Melsec_OEE_Results",
          "columninfo" : [ 
              {
                  "name" : "Product_count",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Rejection",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Avail_Time",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Loss_Time",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "Ideal_Cycle_Time",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }
          ]
      },
      "__v" : 0,
      "clientip" : "localhost",
      "datatype" : "db",
      "frequency" : 60,
      "id" : "data-source-1666863512",
      "requesttype" : "data",
      "type" : "Archive",
      // "updated_at" : ISODate("2022-10-27T09:38:32.708Z")
  },
    { 
      "conf" : {
          "collection" : "Archive-raw_location_data",
          "path" : "FTSCADAvantage",
          "dbname" : "FTSCADAvantage",
          "table" : "raw_location_data",
          "db_table" : "analogview",
          "columninfo" : [ 
              {
                  "name" : "name",
                  "type" : "text",
                  "property" : "unique",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "description",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "value",
                  "type" : "number",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "units",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "inserttimestamp",
                  "type" : "time",
                  "property" : "sort",
                  "format" : "%d-%b-%Y %H:%M:%S.%f",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false,
                  "realtime" : true
              }, 
              {
                  "name" : "ga",
                  "type" : "text",
                  "property" : "derived-indexed",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "type",
                  "type" : "text",
                  "property" : "derived-indexed",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "location",
                  "type" : "text",
                  "property" : "derived-indexed",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "instrument",
                  "type" : "text",
                  "property" : "derived-indexed",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "make",
                  "type" : "text",
                  "property" : "derived-indexed",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "parameter",
                  "type" : "text",
                  "property" : "derived-indexed",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "location-type",
                  "type" : "text",
                  "property" : "derived-indexed",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "make-instrument",
                  "type" : "text",
                  "property" : "derived-indexed",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "CGS-instrument",
                  "type" : "text",
                  "property" : "derived-indexed",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "userstring01",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "userstring02",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "userstring03",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "userstring04",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "userstring05",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "userstring06",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "userstring07",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "userstring08",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }, 
              {
                  "name" : "userstring09",
                  "type" : "text",
                  "property" : "none",
                  "format" : "none",
                  "isMatchColumn" : false,
                  "isUniqueTimeColumn" : false,
                  "isenddate" : false,
                  "isstartdate" : false
              }
          ],
          "username" : "SYSTEM",
          "password" : "tgabb12345$"
      }, 
      "datatype" : "db",
      "requesttype" : "data",
      "id" : "data-source-1644578327",
      "type" : "Archive",
      "clientip" : "localhost",
      "dstype" : "SCADAvantage",
      "__v" : 0,
      "connectorname" : "Advantage SCADA",
      "frequency" : 1800
  },
  {
    "_id" : "633403d56108171beaa42720",
    "conf" : {
        "collection" : "Archive-Melsec_Raw_Data",
        "path" : "localhost",
        "dbname" : "SAR",
        "table" : "Archive-Melsec_Raw_Data",
        "db_table" : "Archive-Melsec_Raw_Data",
        "columninfo" : [ 
            {
                "name" : "RUNTIME",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
              "name" : "Ideal Cycle",
              "type" : "number",
              "property" : "none",
              "format" : "none",
              "isMatchColumn" : false,
              "isUniqueTimeColumn" : false,
              "isenddate" : false,
              "isstartdate" : false
          }, 
            {
                "name" : "DOWNTIME",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "TOTAL_COUNT",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "ACTUAL_COUNT",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "REJECTED_COUNT",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Date_Time",
                "type" : "time",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "Date_Time_EP",
                "type" : "text",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }, 
            {
                "name" : "__v",
                "type" : "number",
                "property" : "none",
                "format" : "none",
                "isMatchColumn" : false,
                "isUniqueTimeColumn" : false,
                "isenddate" : false,
                "isstartdate" : false
            }
        ]
    },
    "updated_at" : "2022-09-28T13:50:37.304Z",
    "datatype" : "db",
    "requesttype" : "data",
    "id" : "data-source-1664353237",
    "type" : "Archive",
    "clientip" : "localhost",
    "frequency" : 60,
    "__v" : 0
},
    {
      conf: {
        collection: 'Archive-Data',
        path: 'localhost',
        dbname: 'SAR',
        table: 'Data',
        db_table: 'Data',
        columninfo: [
          {
            name: 'shift',
            type: 'shift',
          },
          {
            name: 'time',
            type: 'time',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'time_EP',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'varint',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'sub_varinat',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'quality',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'prod_count',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'performance',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
        ],
      },
      updated_at: '2022-08-02T12:42:57.300',
      datatype: 'db',
      requesttype: 'data',
      id: 'data-source-1659424377',
      type: 'Archive',
      clientip: 'localhost',
      frequency: 60,
      __v: 0,
    },
    {
      conf: {
        collection: 'Archive-mahale-rejection',
        path: 'localhost',
        dbname: 'SAR',
        table: 'mahale',
        db_table: 'mahale',
        columninfo: [
          {
            name: 'shift',
            type: 'shift',
          },
          {
            name: 'Machine',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'SubMachine',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'Variant',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'time_EP',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'rejection',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
        ],
      },
      updated_at: '2022-08-26T13:34:44.690',
      datatype: 'db',
      requesttype: 'data',
      id: 'data-source-1661501084',
      type: 'Archive',
      clientip: 'localhost',
      frequency: 60,
      __v: 0,
    },
    {
      conf: {
        collection: 'Archive-mahale-data',
        path: 'localhost',
        dbname: 'SAR',
        table: 'mahale',
        db_table: 'mahale',
        columninfo: [
          {
            name: 'shift',
            type: 'shift',
          },
          {
            name: 'Machine',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'SubMachine',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'Variant',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'Shift',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'time_EP',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'ProdCount',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
        ],
      },
      updated_at: '2022-08-26T13:34:46.707',
      datatype: 'db',
      requesttype: 'data',
      id: 'data-source-1661501086',
      type: 'Archive',
      clientip: 'localhost',
      frequency: 60,
      __v: 0,
    },
    {
      conf: {
        collection: 'Archive-trendview',
        path: 'localhost',
        dbname: 'SAR',
        table: 'mahale',
        db_table: 'mahale',
        columninfo: [
          {
            name: 'area',
            type: 'shift',
          },
          {
            name: 'location',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'component',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'value',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'inserttimestamp',
            type: 'text',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
          {
            name: 'inserttimestamp',
            type: 'number',
            property: 'none',
            format: 'none',
            isMatchColumn: false,
            isUniqueTimeColumn: false,
            isenddate: false,
            isstartdate: false,
          },
        ],
      },
      updated_at: '2022-08-26T13:34:46.707',
      datatype: 'db',
      requesttype: 'data',
      id: 'data-source-1661501086',
      type: 'Archive',
      clientip: 'localhost',
      frequency: 60,
      __v: 0,
    },
  ];

  tags = {
    datasource_tags: [],
    derived_tags: [],
    saved_tags: [],
  };

  copy_tags = []
  copy_times = []
  copy_time = ""
  copy_operator = ""
  datasources_tags_copy = [];
  saved_tags_copy = [];

  dropped_tags = [];
  aggregators = [
    {
      type: 'aggregator',
      name: 'sum',
    },
    {
      type: 'aggregator',
      name: 'avg',
    },
    {
      type: 'aggregator',
      name: 'min',
    },
    {
      type: 'aggregator',
      name: 'max',
    },
    {
      type: 'aggregator',
      name: 'count',
    },
    {
      type: 'aggregator',
      name: 'first',
    },
    {
      type: 'aggregator',
      name: 'last',
    },
    {
      type: 'aggregator',
      name: 'distinct count',
    },
    {
      type: 'aggregator',
      name: 'unique count',
    },
  ];
  aggregators_copy = JSON.parse(JSON.stringify(this.aggregators));

  operators = [
    {
      type: 'bracket',
      name: '(',
    },
    {
      type: 'bracket',
      name: ')',
    },
    {
      type: 'operator',
      name: '+',
    },
    {
      type: 'operator',
      name: '-',
    },
    {
      type: 'operator',
      name: '*',
    },
    {
      type: 'operator',
      name: '/',
    },
    {
      type: 'constant',
      name: 'Constant',
    },
  ];
  operators_copy = JSON.parse(JSON.stringify(this.operators));

  colors = [ [178,231,255], [253, 253, 9], [200, 255, 0], [184, 232, 252],  [255,0,91],  [255, 245, 9], [250, 244, 211], [255, 133, 82], [230, 230, 230], [41, 115, 115],[214, 203, 193],[214, 169, 154], [233, 250, 227],[155, 162, 255]]
  tagsColorsDict = {}

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  onEditCopyTimes(obj){
    console.log(obj);
    
    this.copy_time = obj['format']
    this.copy_operator = obj['operator']
  }

  onDeleteCopyTimes(obj){
    this.copy_times = this.copy_times.filter(item => item !== obj)
  }

  onChangeCopyTime(event){
     this.copy_time = event.target.value
  }
  
  onSaveCopyConfig(){
    if(!this.copy_time || !this.copy_operator){
      return window.alert("configs missings")
    }
    this.copy_times.push({
      'id' : this.copy_tags.length,
      'hour' : parseInt(this.copy_time.split(":")[0]),
      'minutes': parseInt(this.copy_time.split(":")[1]),
      'format' : this.copy_time,
      'operator': this.copy_operator,
      "seconds" : 0
    }) 
  }

  checkIfFormulaContainsOnlyOneTypeOpearations = (arr) => {
    let op1 = ['+', '-'];
    let op2 = ['*', '/'];
    let is_only_one_type = undefined;

    let cnt = 0
    for (let i of arr) {
      i = i['name'];
      if (op1.includes(i)) {
        cnt++;
        if (!is_only_one_type || is_only_one_type == op1) {
          is_only_one_type = op1;
        } else {
          is_only_one_type = undefined;
          break;
        }
      }
      if (op2.includes(i)) {
        cnt++;
        if (!is_only_one_type || is_only_one_type == op2) {
          is_only_one_type = op2;
        } else {
          is_only_one_type = undefined;
          break;
        }
      }
    }

    if(cnt==0){
      return op1
    }

    return is_only_one_type;
  };

  $ = go.GraphObject.make
  constructGoJSFormattedData = (final_tag,final_arr=[],parentKey=-1,rgb=this.colors[this.getRandomInt(this.colors.length)], level=1, ind = 0) => {    
    if(!final_tag) return final_arr
    this.tagsColorsDict[ind] = rgb
    let levelColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${level})`
    if(parentKey==-1){
      parentKey = 1
      final_arr.push({ 
        'key': parentKey, 
        'name': `${final_tag["name"]}`,
        'color' : levelColor
      })
    }
    
      // levelColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${level-0.25})`

      // console.log("level - ", final_tag);
      
      if("operands" in final_tag){
        for(let i=0;i<final_tag["operands"].length;i++){
          let obj = final_tag["operands"][i]
          
          if(obj["type"]=="computed"){ 
            final_arr.push({ 
              'key': final_arr.length+1, 
              'name': `${obj["name"]}`,
              'parent': parentKey,
              'color' : levelColor
            })
    
            final_arr = this.constructGoJSFormattedData(obj,final_arr,final_arr.length, rgb, level-0.4,ind)
          } 
          else{
            final_arr.push({
              'key': final_arr.length+1, 
              'name': `${obj["name"]}`,
              'parent': parentKey,
              'color' : `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${0.015})`
            })
          }
        } 
      }
      else{
        final_arr.push({
          'key': final_arr.length+1, 
          'name': `${final_tag["name"]}`,
          'parent': parentKey,
          'color':"red"
        })
      }

    return final_arr
  }
  

  absoluteFormulaJson = (array = []) => {
    console.log('Forming Json for - ', array);
    const is_only_one_type =
      this.checkIfFormulaContainsOnlyOneTypeOpearations(array);

    let processed_array = [];
    for (let i of array) {
      if (i.type == 'operator') {
        processed_array.push(i.name);
      }
      if (i.type != 'operator' && i.type != 'bracket') {
        if (i.type == 'constant') {
          processed_array.push({
            name: i.name,
            type: 'constant',
          });
        }
        // it's a tag
        else {
          processed_array.push({
            name: i.name,
            type: 'variable',
            column: i.name,
          });
        }
      }
    }

    console.log('Processed array - ', processed_array);

    if (is_only_one_type) {
      let data = {};

      if (processed_array.length > 2) {
        let operator = processed_array[1];
        let operand1 = processed_array[0];
        let operand2 = processed_array[2];

        data['name'] = operand1.name + operator + operand2.name;
        data['type'] = 'computed';
        if (operator == '+') {
          data['operator'] = 'addition';
        } else if (operator == '-') {
          data['operator'] = 'subtraction';
        } else if (operator == '/') {
          data['operator'] = 'division';
        } else {
          data['operator'] = 'multiplication';
        }

        data['operands'] = [processed_array[0], processed_array[2]];

        let j = 2;

        for (j = 3; j < processed_array.length - 1; j++) {
          let temp = JSON.parse(JSON.stringify(data));

          if (processed_array[j] == '+') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '+' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'addition';
          } else if (processed_array[j] == '-') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '-' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'subtraction';
          } else if (processed_array[j] == '*') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '*' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'multiplication';
          } else if (processed_array[j] == '/') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '/' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'division';
          }
        }
      }

      console.log('Final Data - ', data);
    } else {
      processed_array =
        this.generate_json_by_removing_divisions(processed_array);
      processed_array =
        this.generate_json_by_removing_multipliers(processed_array);

      let data = {};

      if (processed_array.length > 2) {
        let operator = processed_array[1];
        let operand1 = processed_array[0];
        let operand2 = processed_array[2];

        data['name'] = operand1.name + operator + operand2.name;
        data['type'] = 'computed';
        if (operator == '+') {
          data['operator'] = 'addition';
        } else if (operator == '-') {
          data['operator'] = 'subtraction';
        } else if (operator == '/') {
          data['operator'] = 'division';
        } else {
          data['operator'] = 'multiplication';
        }

        data['operands'] = [processed_array[0], processed_array[2]];

        let j = 2;

        for (j = 3; j < processed_array.length - 1; j++) {
          let temp = JSON.parse(JSON.stringify(data));

          if (processed_array[j] == '+') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '+' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'addition';
          } else if (processed_array[j] == '-') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '-' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'subtraction';
          } else if (processed_array[j] == '*') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '*' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'multiplication';
          } else if (processed_array[j] == '/') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '/' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'division';
          }
        }

        console.log('Final Mixed Json - ', data);
      }
    }
  };

  constructGoJSFormattedData0 = (data) => { 
    let configuratingInd = 0, saved_already=1
    for (let i of this.tags.derived_tags){
      if(i.name == this.configurating_tag){ 
        saved_already = 0
        break
      } 
      configuratingInd++
    }
    
    if(saved_already){
      configuratingInd = this.getRandomInt(this.colors.length)
    }
    console.log(this.tagsColorsDict, configuratingInd);
    


    let array = this.constructGoJSFormattedData(data, [] , -1,this.tagsColorsDict[configuratingInd],1, configuratingInd)

    this.model = new go.TreeModel(array)
  }

  
  onSaveTag = () => {
    if (this.configurating_tag == 'NA') {
      return window.alert('Please Select Tag First');
    } else {
      let isRequestHandled = this.handleAbsoluteDataLoggingFormulas();
      console.log("Abs req res - ",isRequestHandled );
      
      if (isRequestHandled){
        return 
      };

      let valid_aggregate_time_based_formula_array = this.validateAggregateTimeBasedFormulaWithBrackets(this.dropped_tags)
      
      if(valid_aggregate_time_based_formula_array){
        this.getJsonForEachSubFormulaBetweenBracketsAggregateTimeBasedFormula(valid_aggregate_time_based_formula_array)

        console.log("You've the json as - ");
        console.log();
        console.log(this.aggregate_final_json);
        console.log();

        let formula = ""
        let formula_array = valid_aggregate_time_based_formula_array

        if(this.aggregate_final_json){
          for (let obj of formula_array) {
            if (obj['type'] == 'aggregator') {
              formula += `{${obj['name']}}`;
            } else if (obj['type'] == 'operator') {
              formula += ` ${obj['name']} `;
            } else {
              formula += obj['name'];
            }
          }
          window.alert('Formula is : ' + formula);
          this.formula_representation = `${this.configurating_tag} = ${formula}`;
          let exists = false;
          for (let tag of this.tags.saved_tags) {
            if (tag['name'] == this.configurating_tag) {
              tag['formula'] = formula;
              tag['data'] = this.aggregate_final_json
              tag['formula_array'] = formula_array;
              (exists = true),
                (tag['distinct_columns'] = this.distinct_tags_selected);
              tag['is_it_final_tag'] = this.is_it_final_tag;
            }
          }
          if (!exists) {
            this.tags.saved_tags.push({
              type: 'derived',
              name: `${this.configurating_tag}`,
              formula: formula,
              formula_array: formula_array,
              distinct_columns: this.distinct_tags_selected,
              is_it_final_tag: this.is_it_final_tag,
              data: this.aggregate_final_json
            });
          }

          this.saved_tags_copy = JSON.parse(JSON.stringify(this.tags.saved_tags));

          this.update_tag(this.configurating_tag);

          this.onReset();

          let parent = {
            name: this.formula_name,
            type: 'continuous',
            interval_type: 'time',
            time_column: this.time_col,
            formula_name: this.configurating_tag,
            interval_start: this.formula_info['start_from'] || 1,
            interval_value: this.formula_info['interval'] || 600,
            result_collection: this.formula_info['result_collection'],
            datasource_id: this.datasource_id || -1,
            operands: [this.aggregate_final_json],
            // aggregation: "sum",
            collection_name: this.collection_name,
            distinct_columns: this.distinct_tags_selected,
          };

          if(this.frequency == -1){
            parent["interval_type"] = "onchange",
            parent["onchange_tags"] = this.onchange_tags_selected
          }

          if(this.frequency==-2){
            parent["interval_type"] = "copyDocument",
            parent["config"] = {
              'times' : this.copy_times,
              'tags' : this.copy_tags
            }
          }
          this.backend_data.push(parent)

        }        
      }

      // let i = 0;
      // let is_formula_valid = true;
      // let formula_array = [];
      // let formula = '';

      // // construct valid formula else say invalid formula
      // while (i < this.dropped_tags.length) {
      //   if (i == 0) {
      //     if (
      //       this.dropped_tags[i]['type'] == 'aggregator' ||
      //       this.dropped_tags[i]['type'] == 'operator'
      //     ) {
      //       is_formula_valid = false;
      //       break;
      //     } else {
      //       formula_array.push(this.dropped_tags[i]);
      //     }
      //   } else {
      //     let last_obj = formula_array[formula_array.length - 1];
      //     let next_type = '';
      //     if (last_obj['type'] == 'aggregator') {
      //       next_type = 'operator';
      //     } else if (last_obj['type'] == 'operator') {
      //       next_type = 'tag||constant';
      //     } else if (last_obj['type'] == 'constant') {
      //       next_type = 'operator';
      //     } else {
      //       next_type = 'aggregator';
      //     }

      //     if (
      //       (next_type == this.dropped_tags[i]['type'] &&
      //         next_type == 'aggregator') ||
      //       (next_type == this.dropped_tags[i]['type'] &&
      //         next_type == 'operator')
      //     ) {
      //       formula_array.push(this.dropped_tags[i]);
      //     } else if (
      //       next_type != this.dropped_tags[i]['type'] &&
      //       next_type == 'tag||constant' &&
      //       this.dropped_tags[i]['type'] != 'aggregator' &&
      //       this.dropped_tags[i]['type'] != 'operator'
      //     ) {
      //       formula_array.push(this.dropped_tags[i]);
      //     } else {
      //       is_formula_valid = false;
      //       break;
      //     }
      //   }
      //   i++;
      // }

      // if (
      //   formula_array.length == 0 ||
      //   (formula_array[formula_array.length - 1]['type'] != 'aggregator' &&
      //     formula_array[formula_array.length - 1]['type'] != 'constant')
      // ) {
      //   is_formula_valid = false;
      // }

      // // if invalid formula check with first as a default aggregator
      // if (formula_array.length != 0 && !is_formula_valid) {
      //   is_formula_valid = true;
      //   formula_array = [];
      //   let i = 0;
      //   while (i < this.dropped_tags.length) {
      //     if (i == 0) {
      //       if (
      //         this.dropped_tags[i]['type'] == 'aggregator' ||
      //         this.dropped_tags[i]['type'] == 'operator'
      //       ) {
      //         is_formula_valid = false;
      //         break;
      //       } else {
      //         formula_array.push(this.dropped_tags[i]);
      //       }
      //     } else {
      //       let last_obj = formula_array[formula_array.length - 1];
      //       let next_type = '';
      //       if (last_obj['type'] == 'aggregator') {
      //         next_type = 'operator';
      //       } else if (last_obj['type'] == 'operator') {
      //         next_type = 'tag||constant';
      //       } else if (last_obj['type'] == 'constant') {
      //         next_type = 'operator';
      //       } else {
      //         next_type = 'aggregator';
      //       }

      //       if (
      //         (next_type == this.dropped_tags[i]['type'] &&
      //           next_type == 'aggregator') ||
      //         (next_type == this.dropped_tags[i]['type'] &&
      //           next_type == 'operator')
      //       ) {
      //         formula_array.push(this.dropped_tags[i]);
      //       } else if (
      //         next_type != this.dropped_tags[i]['type'] &&
      //         next_type == 'tag||constant' &&
      //         this.dropped_tags[i]['type'] != 'aggregator' &&
      //         this.dropped_tags[i]['type'] != 'operator'
      //       ) {
      //         formula_array.push(this.dropped_tags[i]);
      //       } else {
      //         if (
      //           next_type == 'aggregator' &&
      //           this.dropped_tags[i]['type'] == 'operator'
      //         ) {
      //           formula_array.push({
      //             type: 'aggregator',
      //             name: 'first',
      //           });

      //           formula_array.push(this.dropped_tags[i]);
      //         } else {
      //           console.log('Hi 3 ', i);
      //           is_formula_valid = false;
      //           break;
      //         }
      //       }
      //     }
      //     i++;
      //   }
      // }

      // if (formula_array.length != 0 && is_formula_valid) {
      //   if (
      //     formula_array[formula_array.length - 1]['type'] != 'aggregator' &&
      //     formula_array[formula_array.length - 1]['type'] != 'constant'
      //   ) {
      //     formula_array.push({
      //       type: 'aggregator',
      //       name: 'first',
      //     });
      //   }
      // }

      // // display formula logic and save new tag and update existing
      // if (is_formula_valid) {
      //   for (let obj of formula_array) {
      //     if (obj['type'] == 'aggregator') {
      //       formula += `{${obj['name']}}`;
      //     } else if (obj['type'] == 'operator') {
      //       formula += ` ${obj['name']} `;
      //     } else {
      //       formula += obj['name'];
      //     }
      //   }
      //   window.alert('Formula is : ' + formula);
      //   this.formula_representation = `${this.configurating_tag} = ${formula}`;
      //   let exists = false;
      //   for (let tag of this.tags.saved_tags) {
      //     if (tag['name'] == this.configurating_tag) {
      //       tag['formula'] = formula;
      //       tag['formula_array'] = formula_array;
      //       (exists = true),
      //         (tag['distinct_columns'] = this.distinct_tags_selected);
      //       tag['is_it_final_tag'] = this.is_it_final_tag;
      //     }
      //   }
      //   if (!exists) {
      //     this.tags.saved_tags.push({
      //       type: 'derived',
      //       name: `${this.configurating_tag}`,
      //       formula: formula,
      //       formula_array: formula_array,
      //       distinct_columns: this.distinct_tags_selected,
      //       is_it_final_tag: this.is_it_final_tag,
      //     });
      //   }

      //   this.saved_tags_copy = JSON.parse(JSON.stringify(this.tags.saved_tags));

      //   this.update_tag(this.configurating_tag);

      //   this.onReset();
      // } else {
      //   window.alert('Invalid Formula');
      // }

      // // construct backend json for valid formula
      // if (is_formula_valid) {
      //   console.log('Formula Info : ', this.formula_info);

      //   let arr = formula.split(' ');

      //   let op1 = ['+', '-'];
      //   let op2 = ['*', '/'];
      //   let is_only_one_type = undefined;
      //   let parent = {
      //     name: this.formula_name,
      //     type: 'continuous',
      //     interval_type: 'time',
      //     time_column: this.time_col,
      //     formula_name: this.configurating_tag,
      //     interval_start: this.formula_info['start_from'] || 1,
      //     interval_value: this.formula_info['interval'] || 600,
      //     result_collection: this.formula_info['result_collection'],
      //     datasource_id: this.datasource_id || -1,
      //     operands: [],
      //     collection_name: this.collection_name,
      //     distinct_columns: this.distinct_tags_selected,
      //   };

      //   for (let i of arr) {
      //     if (op1.includes(i)) {
      //       if (!is_only_one_type || is_only_one_type == op1) {
      //         is_only_one_type = op1;
      //       } else {
      //         is_only_one_type = undefined;
      //         break;
      //       }
      //     }
      //     if (op2.includes(i)) {
      //       if (!is_only_one_type || is_only_one_type == op2) {
      //         is_only_one_type = op2;
      //       } else {
      //         is_only_one_type = undefined;
      //         break;
      //       }
      //     }
      //   }

      //   let data = {};

      //   if (arr.length == 1) {
      //     is_only_one_type = true;
      //   }
      //   console.log('Only one type : ', is_only_one_type);
      //   if (is_only_one_type) {
      //     let json_arr = [];

      //     for (let i of arr) {
      //       if (op1.includes(i) || op2.includes(i)) {
      //         json_arr.push(i);
      //         continue;
      //       }
      //       let tag = i.split('{')[0];
      //       let agg = i.split('{')[1].split('}')[0];

      //       json_arr.push(this.generate_tag_plus_aggregator_operand(tag, agg));
      //     }

      //     if (json_arr.length > 2) {
      //       data['name'] = '0+1';
      //       data['type'] = 'computed';
      //       if (json_arr[1] == '+') {
      //         data['operator'] = 'addition';
      //       } else if (json_arr[1] == '-') {
      //         data['operator'] = 'subtraction';
      //       } else if (json_arr[1] == '/') {
      //         data['operator'] = 'division';
      //       } else {
      //         data['operator'] = 'multiplication';
      //       }

      //       data['operands'] = [json_arr[0], json_arr[2]];

      //       let j = 2;

      //       for (j = 2; j < json_arr.length - 1; j++) {
      //         let temp = JSON.parse(JSON.stringify(data));

      //         if (json_arr[j] == '+') {
      //           data['operands'][0] = temp;
      //           data['operands'][1] = json_arr[j + 1];
      //           data['name'] = 'Result - ' + j;
      //           data['type'] = 'computed';
      //           data['operator'] = 'addition';
      //         } else if (json_arr[j] == '-') {
      //           data['operands'][0] = temp;
      //           data['operands'][1] = json_arr[j + 1];
      //           data['name'] = 'Result - ' + j;
      //           data['type'] = 'computed';
      //           data['operator'] = 'subtraction';
      //         } else if (json_arr[j] == '*') {
      //           data['operands'][0] = temp;
      //           data['operands'][1] = json_arr[j + 1];
      //           data['name'] = 'Result - ' + j;
      //           data['type'] = 'computed';
      //           data['operator'] = 'multiplication';
      //         } else if (json_arr[j] == '/') {
      //           data['operands'][0] = temp;
      //           data['operands'][1] = json_arr[j + 1];
      //           data['name'] = 'Result - ' + j;
      //           data['type'] = 'computed';
      //           data['operator'] = 'division';
      //         }
      //       }
      //     } else if (json_arr.length == 2) {
      //       data['name'] = '0+1';
      //       data['type'] = 'computed';
      //       if (json_arr[1] == '+') {
      //         data['operator'] = 'addition';
      //       } else if (json_arr[1] == '-') {
      //         data['operator'] = 'subtraction';
      //       } else if (json_arr[1] == '/') {
      //         data['operator'] = 'division';
      //       } else {
      //         data['operator'] = 'multiplication';
      //       }

      //       data['operands'] = [json_arr[0], json_arr[2]];
      //     } else if (json_arr.length == 1) {
      //       data['name'] = '0+1';
      //       data['type'] = 'computed';
      //       data['operator'] = 'addition';
      //       data['operands'] = [
      //         json_arr[0],
      //         {
      //           name: '0',
      //           type: 'constant',
      //         },
      //       ];
      //     }

      //     parent['operands'].push(data);
      //     console.log('Final Data Object : ', parent);
      //   } else {
      //     let json_arr = [];
      //     let temp_arr = [];
      //     console.log('Test 01 ', arr);
      //     for (let i of arr) {
      //       if (op1.includes(i) || op2.includes(i)) {
      //         json_arr.push(i);
      //         continue;
      //       }
      //       // else if(typeof(Number(i)) == Number){

      //       // }
      //       let tag = i.split('{')[0];
      //       let agg = i.split('{')[1].split('}')[0];

      //       json_arr.push(this.generate_tag_plus_aggregator_operand(tag, agg));
      //     }

      //     if (json_arr.length > 2) {
      //       console.log('Test 0 ', json_arr);

      //       json_arr = this.generate_json_by_removing_divisions(json_arr);
      //       json_arr = this.generate_json_by_removing_multipliers(json_arr);

      //       console.log('Final Json Array at save : ');
      //       console.log(json_arr);

      //       data['name'] = '0+1';
      //       data['type'] = 'computed';
      //       if (json_arr[1] == '+') {
      //         data['operator'] = 'addition';
      //       } else if (json_arr[1] == '-') {
      //         data['operator'] = 'subtraction';
      //       } else if (json_arr[1] == '/') {
      //         data['operator'] = 'division';
      //       } else {
      //         data['operator'] = 'multiplication';
      //       }

      //       data['operands'] = [json_arr[0], json_arr[2]];

      //       let j = 2;

      //       for (j = 2; j < json_arr.length - 1; j++) {
      //         let temp = JSON.parse(JSON.stringify(data));

      //         if (json_arr[j] == '+') {
      //           data['operands'][0] = temp;
      //           data['operands'][1] = json_arr[j + 1];
      //           data['name'] = 'Result - ' + j;
      //           data['type'] = 'computed';
      //           data['operator'] = 'addition';
      //         } else if (json_arr[j] == '-') {
      //           data['operands'][0] = temp;
      //           data['operands'][1] = json_arr[j + 1];
      //           data['name'] = 'Result - ' + j;
      //           data['type'] = 'computed';
      //           data['operator'] = 'subtraction';
      //         } else if (json_arr[j] == '*') {
      //           data['operands'][0] = temp;
      //           data['operands'][1] = json_arr[j + 1];
      //           data['name'] = 'Result - ' + j;
      //           data['type'] = 'computed';
      //           data['operator'] = 'multiplication';
      //         } else if (json_arr[j] == '/') {
      //           data['operands'][0] = temp;
      //           data['operands'][1] = json_arr[j + 1];
      //           data['name'] = 'Result - ' + j;
      //           data['type'] = 'computed';
      //           data['operator'] = 'division';
      //         }
      //       }

      //       parent['operands'].push(data);
      //       console.log('Final Data Object - 2 : ', parent);
      //     } else if (json_arr.length == 2) {
      //       data['name'] = '0+1';
      //       data['type'] = 'computed';
      //       if (json_arr[1] == '+') {
      //         data['operator'] = 'addition';
      //       } else if (json_arr[1] == '-') {
      //         data['operator'] = 'subtraction';
      //       } else if (json_arr[1] == '/') {
      //         data['operator'] = 'division';
      //       } else {
      //         data['operator'] = 'multiplication';
      //       }

      //       data['operands'] = [json_arr[0], json_arr[2]];
      //     } else if (json_arr.length == 1) {
      //       data['name'] = '0+1';
      //       data['type'] = 'computed';
      //       data['operator'] = 'addition';
      //       data['operands'] = [
      //         json_arr[0],
      //         {
      //           name: '0',
      //           type: 'constant',
      //         },
      //       ];
      //     }
      //   }

      //   this.backend_data.push(parent);

      //   console.log('Backend Array : ', this.backend_data);
      // }
    }
  };


  getAbsoluteFormulaJson = (array = []) => {
    const is_only_one_type =
      this.checkIfFormulaContainsOnlyOneTypeOpearations(array);

    let processed_array = [];
    for (let i of array) {
      if (i.type == 'operator') {
        processed_array.push(i.name);
      }
      if (i.type != 'operator' && i.type != 'bracket') {
        if (i.type == 'constant') {
          processed_array.push({
            name: i.name,
            type: 'constant',
          });
        }
        // it's a deived tag
        else if (i.type == "computed"){
          processed_array.push(i)
        }
        // it's a tag
        else {
          processed_array.push({
            name: i.name,
            type: 'variable',
            column: i.name,
          });
        }
      }
    }

    

    if (is_only_one_type) {
      let data = {};

      if(processed_array.length==1) return processed_array[0]

      

      if (processed_array.length > 2) {
        let operator = processed_array[1];
        let operand1 = processed_array[0];
        let operand2 = processed_array[2];

        data['name'] = operand1.name + operator + operand2.name;
        data['type'] = 'computed';
        if (operator == '+') {
          data['operator'] = 'addition';
        } else if (operator == '-') {
          data['operator'] = 'subtraction';
        } else if (operator == '/') {
          data['operator'] = 'division';
        } else {
          data['operator'] = 'multiplication';
        }

        data['operands'] = [processed_array[0], processed_array[2]];

        let j = 2;

        for (j = 3; j < processed_array.length - 1; j++) {
          let temp = JSON.parse(JSON.stringify(data));

          if (processed_array[j] == '+') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '+' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'addition';
          } else if (processed_array[j] == '-') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '-' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'subtraction';
          } else if (processed_array[j] == '*') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '*' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'multiplication';
          } else if (processed_array[j] == '/') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '/' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'division';
          }
        }
      }

      console.log("Simple JSON - ", data); 
      
      return data
    } else {
      
      processed_array =
        this.generate_json_by_removing_divisions(processed_array);
        
      console.log("Processed array - ", processed_array);
      processed_array =
        this.generate_json_by_removing_multipliers(processed_array);
        
      console.log("Processed array 2 - ", processed_array);

      let data = {};

      if (processed_array.length > 2) {
        let operator = processed_array[1];
        let operand1 = processed_array[0];
        let operand2 = processed_array[2];

        data['name'] = operand1.name + operator + operand2.name;
        data['type'] = 'computed';
        if (operator == '+') {
          data['operator'] = 'addition';
        } else if (operator == '-') {
          data['operator'] = 'subtraction';
        } else if (operator == '/') {
          data['operator'] = 'division';
        } else {
          data['operator'] = 'multiplication';
        }

        data['operands'] = [processed_array[0], processed_array[2]];

        let j = 2;

        for (j = 3; j < processed_array.length - 1; j++) {
          let temp = JSON.parse(JSON.stringify(data));

          if (processed_array[j] == '+') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '+' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'addition';
          } else if (processed_array[j] == '-') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '-' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'subtraction';
          } else if (processed_array[j] == '*') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '*' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'multiplication';
          } else if (processed_array[j] == '/') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '/' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'division';
          }
        }
      }
      console.log("Mixed JSON - ", data);
 
      
      return data 
    }
  };

  getAggregateFormulaJson = (array = []) => {
    const is_only_one_type =
      this.checkIfFormulaContainsOnlyOneTypeOpearations(array);

    

    let processed_array = [];
    for (let i=0;i<array.length;i++) {
      if (array[i].type == 'operator') {
        processed_array.push(array[i].name);
      }
      if (array[i].type != 'operator' && array[i].type != 'bracket') {
        if (array[i].type == 'constant') {
          processed_array.push({
            name: array[i].name,
            type: 'constant',
          });
        }
        // it's a derived tag
        else if (array[i].type == "computed"){
          processed_array.push(array[i])
        }
        else {
          // it's a tag
          if (array[i].type != "aggregator" && array[i].type != "aggregate" && i+1<array.length){
            let tag_aggr_json = this.generate_tag_plus_aggregator_operand(array[i].name,array[i+1].name)
            i+=1;

            processed_array.push(tag_aggr_json)
          }
          else if (array[i].type == "aggregate"){
            processed_array.push(array[i])
          }
        }
      }
    }


    
    console.log("Handling - ", array ,processed_array, " MSESSAGE - ", is_only_one_type);

    if(processed_array.length==0) return
    if (is_only_one_type) {
      let data = {};

      if (processed_array.length > 2) {
        let operator = processed_array[1];
        let operand1 = processed_array[0];
        let operand2 = processed_array[2];

        data['name'] = operand1.name + operator + operand2.name;
        data['type'] = 'computed';
        if (operator == '+') {
          data['operator'] = 'addition';
        } else if (operator == '-') {
          data['operator'] = 'subtraction';
        } else if (operator == '/') {
          data['operator'] = 'division';
        } else {
          data['operator'] = 'multiplication';
        }

        data['operands'] = [processed_array[0], processed_array[2]];

        let j = 2;

        for (j = 3; j < processed_array.length - 1; j++) {
          let temp = JSON.parse(JSON.stringify(data));

          if (processed_array[j] == '+') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '+' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'addition';
          } else if (processed_array[j] == '-') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '-' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'subtraction';
          } else if (processed_array[j] == '*') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '*' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'multiplication';
          } else if (processed_array[j] == '/') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '/' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'division';
          }
        }
      }
      if (processed_array.length==2) {

        let tag = processed_array[0].name;
        let aggr = processed_array[1].name; 

        data['name'] = tag + '{' + aggr + "}" ;
        data['type'] = 'aggregate';

        console.log("Hey - ",processed_array);
        
        return this.generate_tag_plus_aggregator_operand(tag,aggr)

      }
      if(processed_array.length ==1){
        console.log("Hey zeroth return - ",processed_array);
        return processed_array[0]
      }


      console.log("Simple JSON - ", data, processed_array); 
      
      return data
    } else {
      
      processed_array =
        this.generate_json_by_removing_divisions(processed_array);
        
      console.log("Removed divisions array - ", processed_array);
      processed_array =
        this.generate_json_by_removing_multipliers(processed_array);
        
      console.log("Removed multipliers array - ", processed_array);

      let data = {};

      if (processed_array.length > 2) {
        let operator = processed_array[1];
        let operand1 = processed_array[0];
        let operand2 = processed_array[2];

        data['name'] = operand1.name + operator + operand2.name;
        data['type'] = 'computed';
        if (operator == '+') {
          data['operator'] = 'addition';
        } else if (operator == '-') {
          data['operator'] = 'subtraction';
        } else if (operator == '/') {
          data['operator'] = 'division';
        } else {
          data['operator'] = 'multiplication';
        }

        data['operands'] = [processed_array[0], processed_array[2]];

        let j = 2;

        for (j = 3; j < processed_array.length - 1; j++) {
          let temp = JSON.parse(JSON.stringify(data));

          if (processed_array[j] == '+') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '+' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'addition';
          } else if (processed_array[j] == '-') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '-' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'subtraction';
          } else if (processed_array[j] == '*') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '*' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'multiplication';
          } else if (processed_array[j] == '/') {
            data['operands'][0] = temp;
            data['operands'][1] = processed_array[j + 1];
            data['name'] =
              data['operands'][0].name + '/' + data['operands'][1].name;
            data['type'] = 'computed';
            data['operator'] = 'division';
          }
        }
      }
      console.log("Mixed JSON - ", data); 
      
      return data 
    }
  };

  generate_tag_plus_aggregator_operand = (tagName, aggr) => {
    let op = {
      name: tagName + '{' + aggr + '}',
      type: 'aggregate',
      aggregator: aggr,
      operands: [
        {
          name: tagName + ' + 0',
          type: 'computed',
          operator: 'addition',
          operands: [
            {
              name: tagName,
              type: 'variable',
              column: tagName,
            },
            {
              name: '0',
              type: 'constant',
            },
          ],
        },
      ],
    };

    return op;
  };

  generate_json_by_removing_divisions = (json_arr) => { 
    let temp_arr = [];
    let is_div_present = false;
    for (let i = 0; i < json_arr.length; i++) {
      if (json_arr[i].name == '/') {
        is_div_present = true;
        let op1 = temp_arr.pop();
        let op2 = json_arr[i + 1];

        let test = {
          name: 'Result + ' + i,
          type: 'computed',
          operator: 'division',
          operands: [op1, op2],
        };

        temp_arr.push(test);
        i += 2;
        while (i < json_arr.length) {
          temp_arr.push(json_arr[i]);
          i++;
        }

        break;
      } else {
        temp_arr.push(json_arr[i]);
      }
    }

    if (!is_div_present) {
      // console.log('Returning : ', temp_arr);
      return temp_arr;
    }

    return this.generate_json_by_removing_divisions(temp_arr);
  };

  generate_json_by_removing_multipliers = (json_arr) => { 
    let temp_arr = [];
    let is_div_present = false;
    for (let i = 0; i < json_arr.length; i++) {
      if (json_arr[i].name == '*') {
        is_div_present = true;
        let op1 = temp_arr.pop();
        let op2 = json_arr[i + 1];

        let test = {
          name: 'Result + ' + i,
          type: 'computed',
          operator: 'multiplication',
          operands: [op1, op2],
        };

        temp_arr.push(test);
        i += 2;
        while (i < json_arr.length) {
          temp_arr.push(json_arr[i]);
          i++;
        }

        break;
      } else {
        temp_arr.push(json_arr[i]);
      }
    }

    if (!is_div_present) {
      // console.log('Returning : ', temp_arr);
      return temp_arr;
    }

    return this.generate_json_by_removing_multipliers(temp_arr);
  };

  final_absolute_json = undefined
  getJsonForEachSubFormulaBetweenBrackets = (array) => {
    let newArr = []
    if(array.length == 0){
      return [] 
    }
    let test = true
    for(let i=0;i<array.length;){
      if(array[i].name != ")"){
        newArr.push(array[i])
        i++;
      }
      else{
        let reverse_array = []
        while(newArr.length && newArr[newArr.length-1].name !='('){
          reverse_array.push(newArr.pop())
          test = false
        }

        if(newArr.length && newArr[newArr.length-1].name =='('){
          newArr.pop()
        }

        reverse_array.reverse()

        let json = this.getAbsoluteFormulaJson(reverse_array)
        console.log("JSON - ",json)
        this.final_absolute_json = json
        newArr.push(json)

        i++;
        while(i<array.length){
          newArr.push(array[i])
          i++;
        }
      }
    }

    if(test == false)
      return this.getJsonForEachSubFormulaBetweenBrackets(newArr)
    
      if(test) {
        const final_data = this.getAbsoluteFormulaJson(newArr)
        if(final_data){
          this.final_absolute_json = final_data
        } 
        console.log();
        console.log(this.final_absolute_json);
        console.log();
        
        
        
        
        this.constructGoJSFormattedData0(this.final_absolute_json)
      }
  }

  aggregate_final_json = undefined 
  getJsonForEachSubFormulaBetweenBracketsAggregateTimeBasedFormula = (array) => {
    let newArr = []
    if(array.length == 0){
      return [] 
    }
    let test = true
    for(let i=0;i<array.length;){
      if(array[i].name != ")"){
        newArr.push(array[i])
        i++;
      }
      else{
        let reverse_array = []
        while(newArr.length && newArr[newArr.length-1].name !='('){
          reverse_array.push(newArr.pop())
          test = false
        }

        if(newArr.length && newArr[newArr.length-1].name =='('){
          newArr.pop()
        }

        reverse_array.reverse()

        console.log("Reverse arr - ", reverse_array);
        

        let json = this.getAggregateFormulaJson(reverse_array)
        this.aggregate_final_json = json
        newArr.push(json)
        console.log("Newarray is - ",newArr);
        

        i++;
        while(i<array.length){
          newArr.push(array[i])
          i++;
        }
      }
    }

    if(test == false ){
      console.log("Recursion newArr - ",newArr );
      
      return this.getJsonForEachSubFormulaBetweenBracketsAggregateTimeBasedFormula(newArr)
    }
    
      if(test) {
        
      console.log("final view newArr - ",newArr );
        const final_data = this.getAggregateFormulaJson(newArr)
        console.log("GetAggregateReturned - ",final_data);
        
        if(final_data){
          this.aggregate_final_json = final_data
        }

        
        this.constructGoJSFormattedData0(this.aggregate_final_json)
      }
  }

  validateAggregateTimeBasedFormulaWithBrackets = (inp_formula_array, showPopUp=true) => {
    let is_formula_valid = true;
    let formula_array = [],
      formula = '';
    let open = 0
    let close = 0

    let i = 0;
    while (i < this.dropped_tags.length) {
      if (i == 0) {
        if (
          this.dropped_tags[i]['type'] == 'aggregator' ||
          this.dropped_tags[i]['type'] == 'operator'
        ) {
          is_formula_valid = false;
          break;
        } else {
          formula_array.push(this.dropped_tags[i]);

          if(inp_formula_array[i]['name'] == '('){
            open += 1
          }
        }
      } else {
        let last_obj = formula_array[formula_array.length - 1];
        let next_type = '';
        if (last_obj['type'] == 'aggregator') {
          next_type = 'operator';
        } else if (last_obj['type'] == 'operator') {
          next_type = 'tag||constant||bracket';
        } else if (last_obj['type'] == 'constant') {
          next_type = 'operator';
        }
        else if (last_obj['type'] == 'bracket' && last_obj['name'] == '(') {
          next_type = 'tag||constant||bracket';
        }
        else if (last_obj['type'] == 'bracket' && last_obj['name'] == ')') {
          next_type = 'operator';
        }
        else {
          next_type = 'aggregator';
        }

        if (
          (next_type == inp_formula_array[i]['type'] && next_type == 'constant') ||
          (next_type == inp_formula_array[i]['type'] && next_type == 'operator') ||
          (next_type == inp_formula_array[i]['type'] && next_type == 'aggregator')
        ) {
          formula_array.push(this.dropped_tags[i]);
        } else if (
          (next_type != inp_formula_array[i]['type'] && next_type == 'tag||constant||bracket' && inp_formula_array[i]['type'] != 'operator' && inp_formula_array[i]['type'] != 'aggregator') 
          ||

          (next_type != inp_formula_array[i]['type'] && next_type == 'operator' && inp_formula_array[i]['name'] == ')') 
        ) {
          formula_array.push(this.dropped_tags[i]);

          if(inp_formula_array[i]['name'] == '('){
            open += 1
          }
          else if(inp_formula_array[i]['name'] == ')'){
            if(close>=open){
              is_formula_valid = false
              break
            }
            open -= 1
          }

        } else {
          is_formula_valid = false;
          break;
        }
      }
      i++;
    }


    if (
      is_formula_valid &&
      formula_array.length != 0 &&
      (formula_array[formula_array.length - 1]['type'] == 'constant' || formula_array[formula_array.length - 1]['type'] == 'aggregator' || formula_array[formula_array.length - 1]['name'] == ')' ) 
    ) {
      if(open == close){
        return formula_array
      }
      else{
        if(showPopUp){
         window.alert("InValid Formula - "+ formula)
        }
        return false;
      }
    } else { 
      if(showPopUp){
        window.alert("InValid Formula - "+ formula)
       }
      return false;
    }



  }


  validateAbsoluteFormulaWithBrackets = (inp_formula_array,showPopUp=true) => {
    let is_formula_valid = true;
    let formula_array = [],
      formula = '';
    let open = 0
    let close = 0


    console.log("Validating absolute - ", inp_formula_array);
    

    for (let i = 0; i < inp_formula_array.length; i++) {
      if (inp_formula_array[i]['type'] == 'aggregator') {
        is_formula_valid = false;
        break;
      }

      if (i == 0) {
        if (inp_formula_array[i]['type'] == 'operator') {
          is_formula_valid = false;
          console.log('Break-1');

          break;
        } else {
          formula += ` ${inp_formula_array[i]['name']}`;
          formula_array.push(inp_formula_array[i]);

          if(inp_formula_array[i]['name'] == '('){
            open += 1
          }
        }
      } else {
        let last_obj = formula_array[formula_array.length - 1];
        let next_type = '';

        if (last_obj['type'] == 'operator') {
          next_type = 'tag||constant||bracket';
        } else if (last_obj['type'] == 'constant') {
          next_type = 'operator';
        }else if (last_obj['type'] == 'bracket' && last_obj['name'] == '(') {
          next_type = 'tag||constant||bracket';
        }
        else if (last_obj['type'] == 'bracket' && last_obj['name'] == ')') {
          next_type = 'operator';
        }
         else {
          next_type = 'operator';
        }

        
        if (
          (next_type == inp_formula_array[i]['type'] && next_type == 'constant') ||
          (next_type == inp_formula_array[i]['type'] && next_type == 'operator')
        ) {
          formula += ` ${inp_formula_array[i]['name']}`;
          formula_array.push(inp_formula_array[i]);
        } else if (
          (next_type != inp_formula_array[i]['type'] &&
          next_type == 'tag||constant||bracket' &&
          inp_formula_array[i]['type'] != 'operator') || 
          (next_type != inp_formula_array[i]['type'] &&
          next_type == 'operator' &&
          inp_formula_array[i]['name'] == ')') 
        ) {
          formula += ` ${inp_formula_array[i]['name']}`;
          formula_array.push(inp_formula_array[i]);

          if(inp_formula_array[i]['name'] == '('){
            open += 1
          }
          else if(inp_formula_array[i]['name'] == ')'){
            if(close>=open){
              is_formula_valid = false
              break
            }
            open -= 1
          }


        } else {
          console.log('Break-2 else', next_type, inp_formula_array[i].type);
          is_formula_valid = false;
          break;
        }
      }
    }

    
    console.log("Bracket Formula - ", formula_array)


    if (
      is_formula_valid &&
      formula_array.length != 0 &&
      formula_array[formula_array.length - 1]['type'] != 'operator'
    ) {
      if(open == close){
        return formula_array
      }
      else{
        if(showPopUp) window.alert("InValid Formula - "+ formula)
        return false;
      }
    } else { 
      if(showPopUp) window.alert("InValid Formula - "+ formula)
      return false;
    }

  };

  handleAbsoluteDataLoggingFormulas = () => {
    console.log(
      'Handling Absolute Data Logging Formula Request  - ',
      this.frequency
    );

    if(this.frequency != 1) return false

    let temp_array = this.validateAbsoluteFormulaWithBrackets(this.dropped_tags)

    if(temp_array){
      let json = this.getJsonForEachSubFormulaBetweenBrackets(temp_array)


      let formula = ""
      let formula_array = temp_array
      if(this.final_absolute_json){
        for (let obj of formula_array) {
          if (obj['type'] == 'aggregator') {
            formula += `{${obj['name']}}`;
          } else if (obj['type'] == 'operator') {
            formula += ` ${obj['name']} `;
          } else {
            formula += obj['name'];
          }
        }
        window.alert('Formula is : ' + formula);
        this.formula_representation = `${this.configurating_tag} = ${formula}`;
        let exists = false;
        for (let tag of this.tags.saved_tags) {
          if (tag['name'] == this.configurating_tag) {
            tag['formula'] = formula;
            tag['data'] = this.aggregate_final_json
            tag['formula_array'] = formula_array;
            (exists = true),
              (tag['distinct_columns'] = this.distinct_tags_selected);
            tag['is_it_final_tag'] = this.is_it_final_tag;
          }
        }
        if (!exists) {
          this.tags.saved_tags.push({
            type: 'derived',
            name: `${this.configurating_tag}`,
            formula: formula,
            formula_array: formula_array,
            distinct_columns: this.distinct_tags_selected,
            is_it_final_tag: this.is_it_final_tag,
            data: this.final_absolute_json
          });
        }

        this.saved_tags_copy = JSON.parse(JSON.stringify(this.tags.saved_tags));

        this.update_tag(this.configurating_tag);

        this.onReset();

        let parent = {
          name: this.formula_name,
          type: 'continuous',
          interval_type: 'absolute',
          time_column: this.time_col,
          formula_name: this.configurating_tag,
          interval_start: this.formula_info['start_from'] || 1,
          interval_value: this.formula_info['interval'] || 600,
          result_collection: this.formula_info['result_collection'],
          datasource_id: this.datasource_id || -1,
          operands: [this.final_absolute_json],
          aggregation: "sum",
          collection_name: this.collection_name,
          distinct_columns: this.distinct_tags_selected,
        };

        this.backend_data.push(parent)

      }  


    }
    return 1

    // if (this.frequency == 1) {
    //   let is_formula_valid = true;
    //   let formula_array = [],
    //     formula = '';

    //   for (let i = 0; i < this.dropped_tags.length; i++) {
    //     if (this.dropped_tags[i]['type'] == 'aggregator') {
    //       is_formula_valid = false;
    //       break;
    //     }

    //     if (i == 0) {
    //       if (this.dropped_tags[i]['type'] == 'operator') {
    //         is_formula_valid = false;
    //         console.log('Break-1');

    //         break;
    //       } else {
    //         formula += ` ${this.dropped_tags[i]['name']}`;
    //         formula_array.push(this.dropped_tags[i]);
    //       }
    //     } else {
    //       let last_obj = formula_array[formula_array.length - 1];
    //       let next_type = '';

    //       if (last_obj['type'] == 'operator') {
    //         next_type = 'tag||constant||bracket';
    //       } else if (last_obj['type'] == 'constant') {
    //         next_type = 'operator';
    //       } else {
    //         next_type = 'operator';
    //       }

    //       if (
    //         (next_type == this.dropped_tags[i]['type'] &&
    //           next_type == 'constant') ||
    //         (next_type == this.dropped_tags[i]['type'] &&
    //           next_type == 'operator')
    //       ) {
    //         formula += ` ${this.dropped_tags[i]['name']}`;
    //         formula_array.push(this.dropped_tags[i]);
    //       } else if (
    //         next_type != this.dropped_tags[i]['type'] &&
    //         next_type == 'tag||constant||bracket' &&
    //         this.dropped_tags[i]['type'] != 'operator'
    //       ) {
    //         formula += ` ${this.dropped_tags[i]['name']}`;
    //         formula_array.push(this.dropped_tags[i]);
    //       } else {
    //         console.log('Break-2', next_type, this.dropped_tags[i]);
    //         is_formula_valid = false;
    //         break;
    //       }
    //     }
    //   }

    //   if (
    //     is_formula_valid &&
    //     formula_array.length != 0 &&
    //     formula_array[formula_array.length - 1]['type'] != 'operator'
    //   ) {
    //     // Here you have a valid formula
    //     // check if only one type of operations are there or not
    //     // if only type operations then easy
    //     // else form correcponding hierarchy jsno

    //     this.absoluteFormulaJson(formula_array);

    //     window.alert(formula);
    //   } else {
    //     window.alert('Invalid Formula');
    //   }
    //   return true;
    // } else {
    //   return false;
    // }
  };

  

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let key = params['_id'];
      if (key != 'new') {
        let url = 'http://localhost:5000/formulas/' + key;
        this.http.get(url).subscribe((Response) => {
          if (Response['resp'] == 'success') {
            this.formula_name = Response['data']['formula_name'];
            this.result_collection = Response['data']['result_collection'];
            this.formula_id = key;
            // console.log("Response : ", Response["data"])
            if ('data' in Response) {
              this.tags.saved_tags = JSON.parse(
                JSON.stringify(Response['data']['saved_tags'] || [])
              );
              this.saved_tags_copy = JSON.parse(
                JSON.stringify(Response['data']['saved_tags'] || [])
              );
              this.tags.derived_tags = JSON.parse(
                JSON.stringify(Response['data']['saved_tags'] || [])
              );
              this.formula_info = Response['data'];
              this.time_col = Response['data']['time_column'];
              this.frequency = Response['data']['interval'];
              this.copy_tags = Response['data']['data']['copy_tags'] || []
              this.copy_times = Response['data']['data']['copy_times'] || []
              console.log('Res - ', Response);
            }
          } else {
            window.location.href = '/';
          }
        });
      }
    });
  }

  searchObjFromList = (list_of_objs, name) => {
    for (let i = 0; i < list_of_objs.length; i++) {
      if (list_of_objs[i]['name'] == name) {
        return i;
      }
    }

    return -1;
  };

  onReset = () => {
    this.dropped_tags = [];
  };

  onChangeDataSource = (collection) => {
    this.selectable_tags = [];
    for (let obj of this.data_sources) {
      if (obj['conf']['collection'] == collection.value) {
        this.tags.datasource_tags = obj['conf']['columninfo'];
        this.datasources_tags_copy = JSON.parse(
          JSON.stringify(obj['conf']['columninfo'])
        );

        for (let obj of this.tags.datasource_tags) {
          this.selectable_tags.push(obj['name']);
        }

        console.log('Selected Ds : ', obj);
        this.datasource_id = obj['id'];
        this.collection_name = collection.value;
      }
    }
  };

  onAddingTag = () => {
    let ind = this.tags.derived_tags.length;

    this.tagsColorsDict[ind] = this.colors[this.getRandomInt(this.colors.length)]

    this.tags.derived_tags.push({
      name: 'tag-' + ind.toString(),
      type: 'derived',
      color : `c${this.tagsColorsDict[ind][0]}${this.tagsColorsDict[ind][1]}${this.tagsColorsDict[ind][2]}`
    });
  };

  onClickDerivedTag = (tagObj) => {
    this.configurating_tag = tagObj['name'] || 'NA';
    let tag_name = tagObj['name'] || 'NA';

    this.tag_name = tag_name;

    let is_tag_saved = false;
    if (tag_name && tag_name != 'NA') {
      console.log('Saved tags over here are : ', this.tags.saved_tags);
      // search if the tag is saved or not 
      for (let obj of this.tags.saved_tags) {
        if (obj['name'] == tag_name) {
          this.dropped_tags = obj['formula_array'];
          this.formula_representation = `${this.configurating_tag} = ${obj['formula']}`;
          is_tag_saved = true;
          this.distinct_tags_selected = obj['distinct_columns'];
          this.is_it_final_tag = obj['is_it_final_tag'];
          this.constructGoJSFormattedData0(obj['data'])
          break;
        } 
      }

      if (!is_tag_saved) {
        this.formula_representation = '';
        this.dropped_tags = [];
        this.distinct_tags_selected = [];
        this.is_it_final_tag = false;
      }
    }
  };

  onDrop(event: CdkDragDrop<object[]>) {
    if (event.previousContainer.data === event.container.data) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if(this.frequency==1){
        let temp_array = this.validateAbsoluteFormulaWithBrackets(this.dropped_tags,false)
        if(temp_array){
          this.getJsonForEachSubFormulaBetweenBrackets(this.dropped_tags)
        }
      }
      else{
        let valid_aggregate_time_based_formula_array = this.validateAggregateTimeBasedFormulaWithBrackets(this.dropped_tags,false)
        if(valid_aggregate_time_based_formula_array){
          this.getJsonForEachSubFormulaBetweenBracketsAggregateTimeBasedFormula(this.dropped_tags)
        }
      }
    }

    this.tags.datasource_tags = JSON.parse(
      JSON.stringify(this.datasources_tags_copy)
    );
    this.aggregators = JSON.parse(JSON.stringify(this.aggregators_copy));
    this.operators = JSON.parse(JSON.stringify(this.operators_copy));

    this.tags.saved_tags = JSON.parse(JSON.stringify(this.saved_tags_copy));
  }

  onChangeConstant = (event) => {
    this.operators[this.operators.length - 1]['name'] = event.target.value;
    console.log('Constant - ', event.target.value);
  };

  // UseCase
  // let's say tag2 = tag1{sum} + tag1{max}
  // now user updates tag1's name
  // then we need to update the formula_array of those derived tags which are dependent on this tag1
  updateNameInFormulaArray = (formula_array, name) => {
    let arr_of_ind = [];
    for (let i = 0; i < formula_array.length; i++) {
      if (formula_array[i]['name'] == name) {
        arr_of_ind.push(i);
      }
    }

    return arr_of_ind;
  };

  update_tag = (update_tag_name) => {
    let ind = this.searchObjFromList(this.tags.derived_tags, update_tag_name);
    let ind2 = this.searchObjFromList(this.tags.saved_tags, update_tag_name);

    if (ind != -1) {
      this.tag_name = this.tag_name;
      this.tags.derived_tags[ind]['name'] = this.tag_name;
      this.configurating_tag = this.tag_name;
    }

    console.log('Updated in Saved tags ');
    if (ind != -1 && ind2 != -1) {
      let old_name = this.tags.saved_tags[ind2]['name'];
      this.tags.saved_tags[ind2]['name'] = this.tag_name;

      // let i = this.searchObjFromList(this.tags.saved_tags[ind2]["formula_array"], old_name)

      for (let obj of this.tags.saved_tags) {
        let arr_of_ind = this.updateNameInFormulaArray(
          obj['formula_array'],
          old_name
        );
        for (let i of arr_of_ind) {
          obj['formula_array'][i]['name'] = this.tag_name;
        }
      }

      this.saved_tags_copy = JSON.parse(JSON.stringify(this.tags.saved_tags));
    }
  };

  onChangeName = (event) => {
    this.tag_name = event.target.value;
    // let ind = this.searchObjFromList(this.tags.derived_tags,this.tag_name)
    // let ind2 = this.searchObjFromList(this.tags.saved_tags, this.tag_name)

    // if(ind != -1){
    //   this.tag_name = event.target.value
    //   this.tags.derived_tags[ind]["name"] = this.tag_name
    //   this.configurating_tag = this.tag_name
    // }

    // console.log("Updated in Saved tags ")
    // if(ind != -1 && ind2 != -1){
    //   let old_name = this.tags.saved_tags[ind2]["name"]
    //   this.tags.saved_tags[ind2]["name"] = this.tag_name

    //   let i = this.searchObjFromList(this.tags.saved_tags[ind2]["formula_array"], old_name)

    //   for(let obj of this.tags.saved_tags){
    //     let arr_of_ind = this.updateNameInFormulaArray(obj["formula_array"],old_name)
    //     for(let i of arr_of_ind){
    //       obj["formula_array"][i]["name"] = this.tag_name
    //     }
    //   }

    //   this.saved_tags_copy = JSON.parse(JSON.stringify(this.tags.saved_tags))
    // }
  };

  onSelectDistinctTag = () => {};

  onSaveFormula = () => {
    if (this.tags.saved_tags.length == 0) {
      return window.alert('Please Create a Formula first to save');
    } else {
      console.log('Saving formula requested : ', this.tags.saved_tags);

      let url = 'http://localhost:5000/save-formula/' + this.formula_id;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      const request_body = {
        // "_id" : this.formula_id,
        saved_tags: this.tags.saved_tags,
        time_column: this.time_col,
        data: {
          'copy_tags' : this.copy_tags,
          'copy_times' : this.copy_times
        }
      };



      console.log('Process : ', this.tags.saved_tags);

      console.log('Posting : ', request_body);
      this.http.post(url, request_body, httpOptions).subscribe((Response) => {
        console.log('Post Response is : ', Response);
        if (Response['resp'] == 'success') {
          console.log('Formula Saved Success : ', Response);
          this.saveBackendFormulasData();
          window.alert('Saved Formula successfully');
        } else {
          window.alert('Formula cannot be saved : invalid data');
        }
      });
    }
  };

  onChangeFinalTag = (event) => {
    if (event.target.value == 'False') this.is_it_final_tag = false;
    else this.is_it_final_tag = true;
  };

  saveBackendFormulasData = () => {
    // if (this.backend_data.length == 0) {
    //   return window.alert(
    //     'No Tags added to save. Please add at least 1 tag to proceed.'
    //   );
    // }

    let url = 'http://localhost:5000/save-all-formulas';
    let request_body = {
      name: this.formula_name,
      data: this.backend_data,
    };

    console.log('Backend Req : ', this.backend_data);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.http.post(url, request_body, httpOptions).subscribe((Response) => {
      console.log('Post Response is : ', Response);
      if (Response['resp'] == 'success') {
        window.alert('Backend Data Saved successfully');
      } else {
        window.alert('Formula cannot be saved : invalid data');
      }
    });
  };

  onChangeTimeCol = (event) => {
    this.time_col = event.target.value;
  };
}
