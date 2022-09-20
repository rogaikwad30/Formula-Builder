import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop'; 


@Component({
  selector: 'app-final-new-ui',
  templateUrl: './final-new-ui.component.html',
  styleUrls: ['./final-new-ui.component.css']
})
export class FinalNewUiComponent implements OnInit {
  formula_name = "";
  result_collection = "";
  configurating_tag = "" || "NA";
  formula_representation = "";
  backend_data = []
  formula_info = {}
  is_it_final_tag = false
  collection_name = ""
  // using for saving data in formulas collection later


  tag_name = "";
  time_col = "";
  formula_id = "";

  datasource_id = ""

  selectable_tags = [];
  distinct_tags_selected = [];

  data_sources = [  
    {
      "conf": {
        "collection": "Archive-CrateData",
        "path": "localhost",
        "dbname": "SAR",
        "table": "CrateData",
        "db_table": "CrateData",
        "columninfo": [
          {
            "name": "shift",
            "type": "shift"
          },
          {
            "name": "id",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Sr no",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Parameter ID",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Source",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          }
        ]
      },
      "updated_at": "2022-07-27T12:53:12.308",
      "datatype": "db",
      "requesttype": "data",
      "id": "data-source-1658906592",
      "type": "Archive",
      "clientip": "localhost",
      "frequency": 60,
      "__v": 0
    }, 
    {
      "conf": {
        "collection": "Archive-Data",
        "path": "localhost",
        "dbname": "SAR",
        "table": "Data",
        "db_table": "Data",
        "columninfo": [
          {
            "name": "shift",
            "type": "shift"
          },
          {
            "name": "time",
            "type": "time",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "time_EP",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "varint",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "sub_varinat",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "quality",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "prod_count",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "performance",
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
      "updated_at": "2022-08-02T12:42:57.300",
      "datatype": "db",
      "requesttype": "data",
      "id": "data-source-1659424377",
      "type": "Archive",
      "clientip": "localhost",
      "frequency": 60,
      "__v": 0
    }, 
    {
      "conf": {
        "collection": "Archive-mahale-rejection",
        "path": "localhost",
        "dbname": "SAR",
        "table": "mahale",
        "db_table": "mahale",
        "columninfo": [
          {
            "name": "shift",
            "type": "shift"
          },
          {
            "name": "Machine",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "SubMachine",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Variant",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "time_EP",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "rejection",
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
      "updated_at": "2022-08-26T13:34:44.690",
      "datatype": "db",
      "requesttype": "data",
      "id": "data-source-1661501084",
      "type": "Archive",
      "clientip": "localhost",
      "frequency": 60,
      "__v": 0
    }, 
    {
      "conf": {
        "collection": "Archive-mahale-data",
        "path": "localhost",
        "dbname": "SAR",
        "table": "mahale",
        "db_table": "mahale",
        "columninfo": [
          {
            "name": "shift",
            "type": "shift"
          },
          {
            "name": "Machine",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "SubMachine",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Variant",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "Shift",
            "type": "text",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "time_EP",
            "type": "number",
            "property": "none",
            "format": "none",
            "isMatchColumn": false,
            "isUniqueTimeColumn": false,
            "isenddate": false,
            "isstartdate": false
          },
          {
            "name": "ProdCount",
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
      "updated_at": "2022-08-26T13:34:46.707",
      "datatype": "db",
      "requesttype": "data",
      "id": "data-source-1661501086",
      "type": "Archive",
      "clientip": "localhost",
      "frequency": 60,
      "__v": 0
    }
  ]
  
  tags = {
    "datasource_tags" : [],
    "derived_tags" : [],
    "saved_tags" : []
  }
 
  datasources_tags_copy = []
  saved_tags_copy = []

  dropped_tags = []
  aggregators = [
    {
      type : "aggregator",
      name : "sum"
    },
    {
      type : "aggregator",
      name : "avg"
    },
    {
      type : "aggregator",
      name : "min"
    },
    {
      type : "aggregator",
      name : "max"
    },
    {
      type : "aggregator",
      name : "count"
    },
    {
      type : "aggregator",
      name : "first"
    },
    {
      type : "aggregator",
      name : "last"
    },
    {
      type : "aggregator",
      name : "distinct count"
    },
    {
      type : "aggregator",
      name : "unique count"
  }]
  aggregators_copy = JSON.parse(JSON.stringify(this.aggregators)) 

  operators = [ 
    {
      type : "operator",
      name : "+"
    },
    {
      type : "operator",
      name : "-"
    },
    {
      type : "operator",
      name : "*"
    },
    {
      type : "operator",
      name : "/"
    }
  ]
  operators_copy = JSON.parse(JSON.stringify(this.operators))

  constructor(private route: ActivatedRoute,private http : HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        let key = params["_id"]
        if(key != "new"){
          let url = 'http://localhost:5000/formulas/' + key
          this.http.get(url).subscribe( (Response) => {  
            if(Response['resp'] == "success"){ 
              this.formula_name = Response["data"]["formula_name"]
              this.result_collection = Response["data"]["result_collection"]
              this.formula_id = key
              console.log("Response : ", Response["data"])
              if("data" in Response){
                this.tags.saved_tags = JSON.parse(JSON.stringify(Response["data"]["saved_tags"]))
                this.saved_tags_copy = JSON.parse(JSON.stringify(Response["data"]["saved_tags"]))
                this.tags.derived_tags = JSON.parse(JSON.stringify(Response["data"]["saved_tags"])) 
                this.formula_info = Response["data"]
                this.time_col = Response["data"]["time_column"]
              }
            } 
            else{
              window.location.href = "/"
            }
          });
        }
      });
  }

  searchObjFromList = (list_of_objs, name) => { 
    for(let i=0;i<list_of_objs.length;i++){
      if(list_of_objs[i]["name"] == name){ 
        return i
      }
    }

    return -1
  }

  onReset = () => {
    this.dropped_tags = [] 
  }
  
  onChangeDataSource = (collection) => { 
    this.selectable_tags = []
    for(let obj of this.data_sources){
      if (obj["conf"]["collection"] == collection.value){ 
        this.tags.datasource_tags = obj["conf"]["columninfo"]
        this.datasources_tags_copy = JSON.parse(JSON.stringify(obj["conf"]["columninfo"]))

        for(let obj of this.tags.datasource_tags){
          this.selectable_tags.push(obj["name"])
        }

        console.log("Selected Ds : ",obj);
        this.datasource_id = obj["id"]
        this.collection_name = collection.value
        
      }
    }
  }

  onAddingTag = () => {
    let ind = this.tags.derived_tags.length 
 
    this.tags.derived_tags.push({
      "name" : "tag-" + ind.toString(),
      "type" : "derived"
    })  
  }

  onClickDerivedTag = (tagObj) => { 
    this.configurating_tag = tagObj["name"] || "NA"
    let tag_name = tagObj["name"] || "NA";

    this.tag_name = tag_name

    let is_tag_saved = false;
    if(tag_name && tag_name!="NA"){
      console.log("Saved tags over here are : ", this.tags.saved_tags)
      // search if the tag is saved or not 
      for(let obj of this.tags.saved_tags){ 
        if(obj["name"] == tag_name){ 
          this.dropped_tags = obj["formula_array"]
          this.formula_representation = `${this.configurating_tag} = ${obj['formula']}`
          is_tag_saved = true
          this.distinct_tags_selected = obj["distinct_columns"]
          this.is_it_final_tag = obj["is_it_final_tag"]
          break
        }
      }

      if(!is_tag_saved){
        this.formula_representation = ""
        this.dropped_tags = []
        this.distinct_tags_selected = []
        this.is_it_final_tag = false
      }
    }
  }

  onDrop(event: CdkDragDrop<object[]>) {  
    console.log("Hi Drop event : ",event);
     
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
        event.currentIndex);
    }

    this.tags.datasource_tags = JSON.parse(JSON.stringify(this.datasources_tags_copy))
    this.aggregators = JSON.parse(JSON.stringify(this.aggregators_copy))
    this.operators = JSON.parse(JSON.stringify(this.operators_copy))


    this.tags.saved_tags = JSON.parse(JSON.stringify(this.saved_tags_copy))
  } 

  generate_tag_plus_aggregator_operand = (tagName,aggr)=>{
    let op =  {
      "name" : tagName+ "{" + aggr + "}",
      "type" : "aggregate",
      "aggregator" : aggr,
      "operands" : [ 
        {
            "name" : tagName + " + 0",
            "type" : "computed",
            "operator" : "addition",
            "operands" : [ 
                {
                    "name" : tagName,
                    "type" : "variable",
                    "column" : tagName
                }, 
                {
                    "name" : "0",
                    "type" : "constant"
                }
            ]
        }
      ]
    }

    return op;
  }

  generate_json_by_removing_divisions = (json_arr) => {
    console.log("Json Array : ", json_arr)
    let temp_arr = []
    let is_div_present = false
    for(let i=0;i<json_arr.length;i++){
      if(json_arr[i]=="/"){
        is_div_present = true
        let op1 = temp_arr.pop()
        let op2 = json_arr[i+1]

        let test = {
          "name" :   "Result + " + i,
          "type" : "computed",
          "operator" : "division",
          "operands" : [ 
            op1,
            op2
          ]
        }
        
        temp_arr.push(test)
        i += 2;
        while(i<json_arr.length){
          temp_arr.push(json_arr[i])
          i++;
        }

        break;
      }
      else{
        temp_arr.push(json_arr[i])
      }
    }

    if(!is_div_present){
      console.log("Returning : ", temp_arr);
      return temp_arr
    }

    return this.generate_json_by_removing_divisions(temp_arr)
  }

  generate_json_by_removing_multipliers = (json_arr) => {
    console.log("Json Array : ", json_arr)
    let temp_arr = []
    let is_div_present = false
    for(let i=0;i<json_arr.length;i++){
      if(json_arr[i]=="*"){
        is_div_present = true
        let op1 = temp_arr.pop()
        let op2 = json_arr[i+1]

        let test = {
          "name" :   "Result + " + i,
          "type" : "computed",
          "operator" : "multiplication",
          "operands" : [ 
            op1,
            op2
          ]
        }
        
        temp_arr.push(test)
        i += 2;
        while(i<json_arr.length){
          temp_arr.push(json_arr[i])
          i++;
        }

        break;
      }
      else{
        temp_arr.push(json_arr[i])
      }
    }

    if(!is_div_present){
      console.log("Returning : ", temp_arr);
      return temp_arr
    }

    return this.generate_json_by_removing_multipliers(temp_arr)
  }

  onSaveTag = () => { 
    if (this.configurating_tag=="NA"){
      return window.alert("Please Select Tag First")
    }
    else{ 
      let i=0;
      let is_formula_valid = true;
      let formula_array = []
      let formula = "";
      while(i<this.dropped_tags.length){
        if (i==0){ 
          if(this.dropped_tags[i]["type"] == "aggregator" || this.dropped_tags[i]["type"] == "operator"){
            is_formula_valid = false 
            break
          }
          else{
            formula_array.push(this.dropped_tags[i])
          }
        }
        else{
          let last_obj = formula_array[formula_array.length-1]
          let next_type = ""
          if(last_obj["type"] == "aggregator"){
            next_type = "operator"
          }
          else if(last_obj["type"] == "operator"){
            next_type = "tag"
          }
          else{
            next_type = "aggregator"
          }

          if( (next_type == this.dropped_tags[i]["type"] && next_type=="aggregator") || (next_type == this.dropped_tags[i]["type"] && next_type=="operator") ){
            formula_array.push(this.dropped_tags[i])
          }
          else if( (next_type != this.dropped_tags[i]["type"] && next_type == "tag" &&
          (this.dropped_tags[i]["type"] != "aggregator" && this.dropped_tags[i]["type"] != "operator") ) ){
            formula_array.push(this.dropped_tags[i])
          }
          else{
            is_formula_valid = false 
            break
          }
        } 
        i++;
      }

      if(formula_array.length == 0 || formula_array[formula_array.length-1]["type"] != "aggregator"){
        is_formula_valid = false
      }

      
      if(formula_array.length != 0 && !is_formula_valid){ 
        is_formula_valid = true
        formula_array = []
        let i=0;
        while(i<this.dropped_tags.length){
          if(i==0){
            if(this.dropped_tags[i]["type"] == "aggregator" || this.dropped_tags[i]["type"] == "operator"){
              is_formula_valid = false 
              break
            }
            else{
              formula_array.push(this.dropped_tags[i])
            }
          }
          else{
            let last_obj = formula_array[formula_array.length-1]
            let next_type = ""
            if(last_obj["type"] == "aggregator"){
              next_type = "operator"
            }
            else if(last_obj["type"] == "operator"){
              next_type = "tag"
            }
            else{
              next_type = "aggregator"
            }

            if( (next_type == this.dropped_tags[i]["type"] && next_type=="aggregator") || (next_type == this.dropped_tags[i]["type"] && next_type=="operator") ){
              formula_array.push(this.dropped_tags[i])
            }
            else if( (next_type != this.dropped_tags[i]["type"] && next_type == "tag" &&
            (this.dropped_tags[i]["type"] != "aggregator" && this.dropped_tags[i]["type"] != "operator") ) ){
              formula_array.push(this.dropped_tags[i])
            }
            else{
              if(next_type=="aggregator" && this.dropped_tags[i]["type"]=="operator"){
                
              console.log("Hi 2 ,",i);
              formula_array.push({
                type : "aggregator",
                name : "first"
              })
              
              formula_array.push(this.dropped_tags[i])
              }
              else{  
                console.log("Hi 3 ", i);
                is_formula_valid = false 
                break
              }
            }
          }
          i++;
        }
      }

      if(formula_array.length != 0 && is_formula_valid){
        if(formula_array[formula_array.length-1]["type"]!="aggregator"){
          formula_array.push({
            "type" : "aggregator",
            "name" : "first"
          })
        }
      }

      if(is_formula_valid){ 
        for(let obj of formula_array){
          if (obj["type"] == "aggregator"){
            formula += `{${obj["name"]}}`
          }
          else if (obj["type"] == "operator"){
            formula += ` ${obj["name"]} `
          }
          else{
            formula += obj["name"]
          }
        }
        window.alert("Formula is : " + formula)
        this.formula_representation = `${this.configurating_tag} = ${formula}`
        let exists = false
        for(let tag of this.tags.saved_tags){
          if (tag["name"] == this.configurating_tag){ 
            tag["formula"] = formula
            tag["formula_array"] = formula_array
            exists = true ,
            tag["distinct_columns"] = this.distinct_tags_selected
            tag["is_it_final_tag"] = this.is_it_final_tag
          }
        }
        if(!exists){
          this.tags.saved_tags.push({
            type : "derived",
            name : `${this.configurating_tag}`,
            formula : formula,
            formula_array : formula_array,
            distinct_columns : this.distinct_tags_selected,
            is_it_final_tag : this.is_it_final_tag
          })
        }

        this.saved_tags_copy = JSON.parse(JSON.stringify(this.tags.saved_tags)) 


        this.update_tag(this.configurating_tag)
        
        this.onReset()
        
      }
      else{
        window.alert("Invalid Formula")
      }



      if(is_formula_valid){
        console.log("Formula Info : ", this.formula_info);
        
        let arr = formula.split(" ") 

        let op1 = ["+","-"]
        let op2 = ["*", "/"]
        let is_only_one_type = undefined
        let parent = {
          "name" : this.formula_name,
          "type" : "continuous",
          "interval_type" : "time",
          "time_column" : this.time_col,
          "formula_name" : this.configurating_tag,
          "interval_start" : this.formula_info["start_from"] || 1,
          "interval_value" : this.formula_info["interval"] || 600,
          "result_collection" : this.formula_info["result_collection"],
          "datasource_id" : this.datasource_id || -1,
          "operands" : [],
          "collection_name" : this.collection_name
        }

        console.log("Hey : ", parent);
        
 
        for(let i of arr){ 
          
          if(op1.includes(i)){
            if(!is_only_one_type || is_only_one_type==op1){
              is_only_one_type = op1
            }
            else{
              is_only_one_type = undefined
              break
            }
          }
          if(op2.includes(i)){
            if(!is_only_one_type || is_only_one_type == op2){
              is_only_one_type = op2
            }
            else{
              is_only_one_type = undefined
              break
            }
          }
        }


        let data = {}

        if(arr.length==1){
          is_only_one_type = true
        }
        console.log("Only one type : ", is_only_one_type)
        if(is_only_one_type){
          let json_arr = [] 

          for(let i of arr){
            
            if(op1.includes(i) || op2.includes(i)) {
              json_arr.push(i)
              continue
            }  
            let tag = i.split("{")[0]
            let agg = i.split("{")[1].split("}")[0]

            json_arr.push(this.generate_tag_plus_aggregator_operand(tag,agg))
          }

           


          if(json_arr.length>2){
            data["name"] = "0+1"
            data["type"] = "computed"
            if(json_arr[1] == "+"){
              data["operator"] = "addition"
            }
            else if (json_arr[1] == "-"){
              data["operator"] = "subtraction"
            }
            else if(json_arr[1] == "/"){
              data["operator"] = "division"
            }
            else{
              data["operator"] = "multiplication"
            }
            

            data["operands"] = [
              json_arr[0],
              json_arr[2]
            ]

            let j = 2;

            for(j=2;j<json_arr.length-1;j++){
              let temp = JSON.parse(JSON.stringify(data))
              
              if(json_arr[j] == "+"){
                data["operands"][0] = temp
                data["operands"][1] = json_arr[j+1]
                data["name"] = "Result - "+j
                data["type"] = "computed"
                data["operator"] = "addition"
              }
              else if(json_arr[j] == "-"){
                data["operands"][0] = temp
                data["operands"][1] = json_arr[j+1]
                data["name"] = "Result - "+j
                data["type"] = "computed"
                data["operator"] = "subtraction"
              }
              else if(json_arr[j] == "*"){
                data["operands"][0] = temp
                data["operands"][1] = json_arr[j+1]
                data["name"] = "Result - "+j
                data["type"] = "computed"
                data["operator"] = "multiplication"
              }
              else if(json_arr[j] == "/"){
                data["operands"][0] = temp
                data["operands"][1] = json_arr[j+1]
                data["name"] = "Result - "+j
                data["type"] = "computed"
                data["operator"] = "division"
              } 
            }
          }

          else if(json_arr.length == 2){
            data["name"] = "0+1"
            data["type"] = "computed"
            if(json_arr[1] == "+"){
              data["operator"] = "addition"
            }
            else if (json_arr[1] == "-"){
              data["operator"] = "subtraction"
            }
            else if(json_arr[1] == "/"){
              data["operator"] = "division"
            }
            else{
              data["operator"] = "multiplication"
            }

            data["operands"] = [
              json_arr[0],
              json_arr[2]
            ]
          }

          else if(json_arr.length==1){
            data["name"] = "0+1"
            data["type"] = "computed" 
            data["operator"] = "addition" 
            data["operands"] = [ 
              json_arr[0] , 
              {
                "name": "0",
                "type": "constant"
              }
            ]
          }


          parent["operands"].push(data)
          console.log("Final Data Object : ",parent);
          
          
        } 
        else{

          let json_arr = [] 
          let temp_arr = []
          console.log("Test 01 ", arr);
          for(let i of arr){
            
            if(op1.includes(i) || op2.includes(i)) {
               
              json_arr.push(i)
              continue
            }  
            let tag = i.split("{")[0]
            let agg = i.split("{")[1].split("}")[0]

            json_arr.push(this.generate_tag_plus_aggregator_operand(tag,agg))
          }
 
          if(json_arr.length>2){ 
            
            console.log("Test 0 ", json_arr);

            json_arr = this.generate_json_by_removing_divisions(json_arr)
            json_arr = this.generate_json_by_removing_multipliers(json_arr)

            console.log("Final Json Array at save : ");
            console.log(json_arr);
            
             
            data["name"] = "0+1"
            data["type"] = "computed"
            if(json_arr[1] == "+"){
              data["operator"] = "addition"
            }
            else if (json_arr[1] == "-"){
              data["operator"] = "subtraction"
            }
            else if(json_arr[1] == "/"){
              data["operator"] = "division"
            }
            else{
              data["operator"] = "multiplication"
            }

            data["operands"] = [
              json_arr[0],
              json_arr[2]
            ]

            let j = 2;

            for(j=2;j<json_arr.length-1;j++){ 
              
              let temp = JSON.parse(JSON.stringify(data))
              
              if(json_arr[j] == "+"){
                data["operands"][0] = temp
                data["operands"][1] = json_arr[j+1]
                data["name"] = "Result - "+j
                data["type"] = "computed"
                data["operator"] = "addition"
              }
              else if(json_arr[j] == "-"){
                data["operands"][0] = temp
                data["operands"][1] = json_arr[j+1]
                data["name"] = "Result - "+j
                data["type"] = "computed"
                data["operator"] = "subtraction"
              }
              else if(json_arr[j] == "*"){
                data["operands"][0] = temp
                data["operands"][1] = json_arr[j+1]
                data["name"] = "Result - "+j
                data["type"] = "computed"
                data["operator"] = "multiplication"
              }
              else if(json_arr[j] == "/"){
                data["operands"][0] = temp
                data["operands"][1] = json_arr[j+1]
                data["name"] = "Result - "+j
                data["type"] = "computed"
                data["operator"] = "division"
              } 
            }

            parent["operands"].push(data)
            console.log("Final Data Object - 2 : ",parent);

          }

          else if(json_arr.length == 2){
            data["name"] = "0+1"
            data["type"] = "computed"
            if(json_arr[1] == "+"){
              data["operator"] = "addition"
            }
            else if (json_arr[1] == "-"){
              data["operator"] = "subtraction"
            }
            else if(json_arr[1] == "/"){
              data["operator"] = "division"
            }
            else{
              data["operator"] = "multiplication"
            }

            data["operands"] = [
              json_arr[0],
              json_arr[2]
            ]
          }

          else if(json_arr.length==1){
            data["name"] = "0+1"
            data["type"] = "computed" 
            data["operator"] = "addition" 
            data["operands"] = [ 
              json_arr[0] , 
              {
                "name": "0",
                "type": "constant"
              }
            ]
          }



        } 


        this.backend_data.push(parent)

        console.log("Backend Array : ", this.backend_data);
        

      }
    }
    

    console.log("Saved jsons are : ", this.backend_data)
  }

  

  // UseCase
  // let's say tag2 = tag1{sum} + tag1{max}
  // now user updates tag1's name 
  // then we need to update the formula_array of those derived tags which are dependent on this tag1
  updateNameInFormulaArray = (formula_array,name) => {
    let arr_of_ind = []
    for(let i=0;i<formula_array.length;i++){
      if(formula_array[i]["name"] == name){
        arr_of_ind.push(i)
      }
    }

    return arr_of_ind
  }


  update_tag = (update_tag_name) => {
    let ind = this.searchObjFromList(this.tags.derived_tags,update_tag_name)
    let ind2 = this.searchObjFromList(this.tags.saved_tags,update_tag_name)
 
    if(ind != -1){   
      this.tag_name = this.tag_name
      this.tags.derived_tags[ind]["name"] = this.tag_name
      this.configurating_tag = this.tag_name 
    }


    console.log("Updated in Saved tags ")
    if(ind != -1 && ind2 != -1){
      let old_name = this.tags.saved_tags[ind2]["name"]
      this.tags.saved_tags[ind2]["name"] = this.tag_name
      

      // let i = this.searchObjFromList(this.tags.saved_tags[ind2]["formula_array"], old_name)
      

      
      for(let obj of this.tags.saved_tags){ 
        let arr_of_ind = this.updateNameInFormulaArray(obj["formula_array"],old_name)
        for(let i of arr_of_ind){
          obj["formula_array"][i]["name"] = this.tag_name
        }
      }  


      this.saved_tags_copy = JSON.parse(JSON.stringify(this.tags.saved_tags))
    }
  }

  onChangeName = (event) => {
    this.tag_name = event.target.value
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
  }

  onSelectDistinctTag = () => {  
  }

  onSaveFormula = () => {
    if(this.tags.saved_tags.length == 0){
      return window.alert("Please Create a Formula first to save")
    }
    else{
      console.log("Saving formula requested : ", this.tags.saved_tags)


      let url = "http://localhost:5000/save-formula/" + this.formula_id
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      const request_body = {
        // "_id" : this.formula_id,
        "saved_tags" : this.tags.saved_tags,
        "time_column": this.time_col,
        "data" : {}
      } 

      console.log("Process : ", this.tags.saved_tags)
 
      console.log("Posting : " ,request_body)
      this.http.post(url,request_body,httpOptions).subscribe( (Response) => {  
        console.log("Post Response is : " ,Response)
        if(Response["resp"]=="success"){  
          console.log("Formula Saved Success : ", Response)
          this.saveBackendFormulasData()
          window.alert("Saved Formula successfully")
        }
        else{
          window.alert("Formula cannot be saved : invalid data")
        }
      });






    }
  }

  onChangeFinalTag = (event) => {
    if(event.target.value=="False") this.is_it_final_tag = false;
    else this.is_it_final_tag = true;
  }


  saveBackendFormulasData = () =>{
    if(this.backend_data.length == 0){
      return window.alert("No Tags added to save. Please add at least 1 tag to proceed.")
    }

    let url = "http://localhost:5000/save-all-formulas"
    let request_body = {
      "name" : this.formula_name,
      "data" : this.backend_data
    }

    console.log("Backend Req : ", this.backend_data);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.http.post(url,request_body,httpOptions).subscribe( (Response) => {  
      console.log("Post Response is : " ,Response)
      if(Response["resp"]=="success"){  
         
        window.alert("Backend Data Saved successfully")
      }
      else{
        window.alert("Formula cannot be saved : invalid data")
      }
    });
  }



  onChangeTimeCol = (event) => {
    this.time_col = event.target.value
  }

}
