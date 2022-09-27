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

  data_sources = [
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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  checkIfFormulaContainsOnlyOneTypeOpearations = (arr) => {
    let op1 = ['+', '-'];
    let op2 = ['*', '/'];
    let is_only_one_type = undefined;

    for (let i of arr) {
      i = i['name'];
      if (op1.includes(i)) {
        if (!is_only_one_type || is_only_one_type == op1) {
          is_only_one_type = op1;
        } else {
          is_only_one_type = undefined;
          break;
        }
      }
      if (op2.includes(i)) {
        if (!is_only_one_type || is_only_one_type == op2) {
          is_only_one_type = op2;
        } else {
          is_only_one_type = undefined;
          break;
        }
      }
    }

    return is_only_one_type;
  };

  constructGoJSFormattedData = (final_tag,final_arr=[],parentKey=-1) => {
  
    console.log("Final Inp Data - ", final_tag ,final_arr);
    
    if(parentKey==-1){
      parentKey = 1
      final_arr.push({ 
        'key': parentKey, 
        'name': `${final_tag["name"]}`
      })
    }

      if("operands" in final_tag){
        for(let i=0;i<final_tag["operands"].length;i++){
          let obj = final_tag["operands"][i]
    
          console.log("Obj - ",obj);
          
          if(obj["type"]=="computed"){ 
            final_arr.push({ 
              'key': final_arr.length+1, 
              'name': `${obj["name"]}`,
              'parent': parentKey
            })
    
            final_arr = this.constructGoJSFormattedData(obj,final_arr,final_arr.length)
          } 
          else{
            final_arr.push({
              'key': final_arr.length+1, 
              'name': `${obj["name"]}`,
              'parent': parentKey
            })
          }
        } 
      }
      else{
        final_arr.push({
          'key': final_arr.length+1, 
          'name': `${final_tag["name"]}`,
          'parent': parentKey
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
    // const arr = []
    // for(let i in data){
    //   arr.push(data[i])
    // }

    let array = this.constructGoJSFormattedData(data)

    this.model = new go.TreeModel(array)
  }

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
      // this.constructGoJSFormattedData0(data)
      
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

      // this.constructGoJSFormattedData0(data)
      
      return data 
    }
  };

  // getJsonForEachSubFormulaBetweenBrackets = (array,ans=[]) => {
  //   let newArr = []
  //   let test = false 
  //   console.log("Input - ", array);
    
  //   for(let i=0;i<array.length;){ 
  //     if(array[i].name=="("){
  //       i+=1;
  //       test = true
  //       let skip = 0
  //       while(array[i].name!=')' || skip!=0){
  //         if(array[i].name == '('){
  //           skip++;
  //         }
  //         if(array[i].name == ')'){
  //           skip--;
  //         }
           
  //         newArr.push(array[i])
  //         i++;
  //       }
  //     }

  //     // else if (array[i].type == 'operator' || array[i].type == 'constant' || array[i].type!="bracket"){
  //     //   ans.push(array[i])
  //     // }

  //     if(newArr.length > 0){
  //       this.getJsonForEachSubFormulaBetweenBrackets(newArr)
  //       newArr = []
  //     }

  //     i++;
  //   }
  //   if(!test){
  //     let json = this.getAbsoluteFormulaJson(array)
  //     ans.push(json)
  //     console.log("Ans - ", ans);
  //   }

  //   if(!newArr.length){
  //     let json = this.getAbsoluteFormulaJson(newArr)
  //     ans.push(json)
  //     console.log("Ans - ", ans);
  //   }
  // }


  validateAbsoluteFormulaWithBrackets = (inp_formula_array) => {
    let is_formula_valid = true;
    let formula_array = [],
      formula = '';
    let open = 0
    let close = 0


    console.log("Validating - ", inp_formula_array);
    

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
        window.alert("InValid Formula - "+ formula)
        return false;
      }
    } else { 
      window.alert("InValid Formula - "+ formula)
      return false;
    }

  };

  handleAbsoluteDataLoggingFormulas = () => {
    console.log(
      'Handling Absolute Data Logging Formula Request  - ',
      this.frequency
    );

    let temp_array = this.validateAbsoluteFormulaWithBrackets(this.dropped_tags)

    console.log("Temp Array - ", temp_array);
    

    if(temp_array){
      let json = this.getJsonForEachSubFormulaBetweenBrackets(temp_array)
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

  onSaveTag = () => {
    if (this.configurating_tag == 'NA') {
      return window.alert('Please Select Tag First');
    } else {
      let isRequestHandled = this.handleAbsoluteDataLoggingFormulas();
      if (isRequestHandled) return;

      let i = 0;
      let is_formula_valid = true;
      let formula_array = [];
      let formula = '';

      // construct valid formula else say invalid formula
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
          }
        } else {
          let last_obj = formula_array[formula_array.length - 1];
          let next_type = '';
          if (last_obj['type'] == 'aggregator') {
            next_type = 'operator';
          } else if (last_obj['type'] == 'operator') {
            next_type = 'tag||constant';
          } else if (last_obj['type'] == 'constant') {
            next_type = 'operator';
          } else {
            next_type = 'aggregator';
          }

          if (
            (next_type == this.dropped_tags[i]['type'] &&
              next_type == 'aggregator') ||
            (next_type == this.dropped_tags[i]['type'] &&
              next_type == 'operator')
          ) {
            formula_array.push(this.dropped_tags[i]);
          } else if (
            next_type != this.dropped_tags[i]['type'] &&
            next_type == 'tag||constant' &&
            this.dropped_tags[i]['type'] != 'aggregator' &&
            this.dropped_tags[i]['type'] != 'operator'
          ) {
            formula_array.push(this.dropped_tags[i]);
          } else {
            is_formula_valid = false;
            break;
          }
        }
        i++;
      }

      if (
        formula_array.length == 0 ||
        (formula_array[formula_array.length - 1]['type'] != 'aggregator' &&
          formula_array[formula_array.length - 1]['type'] != 'constant')
      ) {
        is_formula_valid = false;
      }

      // if invalid formula check with first as a default aggregator
      if (formula_array.length != 0 && !is_formula_valid) {
        is_formula_valid = true;
        formula_array = [];
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
            }
          } else {
            let last_obj = formula_array[formula_array.length - 1];
            let next_type = '';
            if (last_obj['type'] == 'aggregator') {
              next_type = 'operator';
            } else if (last_obj['type'] == 'operator') {
              next_type = 'tag||constant';
            } else if (last_obj['type'] == 'constant') {
              next_type = 'operator';
            } else {
              next_type = 'aggregator';
            }

            if (
              (next_type == this.dropped_tags[i]['type'] &&
                next_type == 'aggregator') ||
              (next_type == this.dropped_tags[i]['type'] &&
                next_type == 'operator')
            ) {
              formula_array.push(this.dropped_tags[i]);
            } else if (
              next_type != this.dropped_tags[i]['type'] &&
              next_type == 'tag||constant' &&
              this.dropped_tags[i]['type'] != 'aggregator' &&
              this.dropped_tags[i]['type'] != 'operator'
            ) {
              formula_array.push(this.dropped_tags[i]);
            } else {
              if (
                next_type == 'aggregator' &&
                this.dropped_tags[i]['type'] == 'operator'
              ) {
                formula_array.push({
                  type: 'aggregator',
                  name: 'first',
                });

                formula_array.push(this.dropped_tags[i]);
              } else {
                console.log('Hi 3 ', i);
                is_formula_valid = false;
                break;
              }
            }
          }
          i++;
        }
      }

      if (formula_array.length != 0 && is_formula_valid) {
        if (
          formula_array[formula_array.length - 1]['type'] != 'aggregator' &&
          formula_array[formula_array.length - 1]['type'] != 'constant'
        ) {
          formula_array.push({
            type: 'aggregator',
            name: 'first',
          });
        }
      }

      // display formula logic and save new tag and update existing
      if (is_formula_valid) {
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
          });
        }

        this.saved_tags_copy = JSON.parse(JSON.stringify(this.tags.saved_tags));

        this.update_tag(this.configurating_tag);

        this.onReset();
      } else {
        window.alert('Invalid Formula');
      }

      // construct backend json for valid formula
      if (is_formula_valid) {
        console.log('Formula Info : ', this.formula_info);

        let arr = formula.split(' ');

        let op1 = ['+', '-'];
        let op2 = ['*', '/'];
        let is_only_one_type = undefined;
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
          operands: [],
          collection_name: this.collection_name,
          distinct_columns: this.distinct_tags_selected,
        };

        for (let i of arr) {
          if (op1.includes(i)) {
            if (!is_only_one_type || is_only_one_type == op1) {
              is_only_one_type = op1;
            } else {
              is_only_one_type = undefined;
              break;
            }
          }
          if (op2.includes(i)) {
            if (!is_only_one_type || is_only_one_type == op2) {
              is_only_one_type = op2;
            } else {
              is_only_one_type = undefined;
              break;
            }
          }
        }

        let data = {};

        if (arr.length == 1) {
          is_only_one_type = true;
        }
        console.log('Only one type : ', is_only_one_type);
        if (is_only_one_type) {
          let json_arr = [];

          for (let i of arr) {
            if (op1.includes(i) || op2.includes(i)) {
              json_arr.push(i);
              continue;
            }
            let tag = i.split('{')[0];
            let agg = i.split('{')[1].split('}')[0];

            json_arr.push(this.generate_tag_plus_aggregator_operand(tag, agg));
          }

          if (json_arr.length > 2) {
            data['name'] = '0+1';
            data['type'] = 'computed';
            if (json_arr[1] == '+') {
              data['operator'] = 'addition';
            } else if (json_arr[1] == '-') {
              data['operator'] = 'subtraction';
            } else if (json_arr[1] == '/') {
              data['operator'] = 'division';
            } else {
              data['operator'] = 'multiplication';
            }

            data['operands'] = [json_arr[0], json_arr[2]];

            let j = 2;

            for (j = 2; j < json_arr.length - 1; j++) {
              let temp = JSON.parse(JSON.stringify(data));

              if (json_arr[j] == '+') {
                data['operands'][0] = temp;
                data['operands'][1] = json_arr[j + 1];
                data['name'] = 'Result - ' + j;
                data['type'] = 'computed';
                data['operator'] = 'addition';
              } else if (json_arr[j] == '-') {
                data['operands'][0] = temp;
                data['operands'][1] = json_arr[j + 1];
                data['name'] = 'Result - ' + j;
                data['type'] = 'computed';
                data['operator'] = 'subtraction';
              } else if (json_arr[j] == '*') {
                data['operands'][0] = temp;
                data['operands'][1] = json_arr[j + 1];
                data['name'] = 'Result - ' + j;
                data['type'] = 'computed';
                data['operator'] = 'multiplication';
              } else if (json_arr[j] == '/') {
                data['operands'][0] = temp;
                data['operands'][1] = json_arr[j + 1];
                data['name'] = 'Result - ' + j;
                data['type'] = 'computed';
                data['operator'] = 'division';
              }
            }
          } else if (json_arr.length == 2) {
            data['name'] = '0+1';
            data['type'] = 'computed';
            if (json_arr[1] == '+') {
              data['operator'] = 'addition';
            } else if (json_arr[1] == '-') {
              data['operator'] = 'subtraction';
            } else if (json_arr[1] == '/') {
              data['operator'] = 'division';
            } else {
              data['operator'] = 'multiplication';
            }

            data['operands'] = [json_arr[0], json_arr[2]];
          } else if (json_arr.length == 1) {
            data['name'] = '0+1';
            data['type'] = 'computed';
            data['operator'] = 'addition';
            data['operands'] = [
              json_arr[0],
              {
                name: '0',
                type: 'constant',
              },
            ];
          }

          parent['operands'].push(data);
          console.log('Final Data Object : ', parent);
        } else {
          let json_arr = [];
          let temp_arr = [];
          console.log('Test 01 ', arr);
          for (let i of arr) {
            if (op1.includes(i) || op2.includes(i)) {
              json_arr.push(i);
              continue;
            }
            // else if(typeof(Number(i)) == Number){

            // }
            let tag = i.split('{')[0];
            let agg = i.split('{')[1].split('}')[0];

            json_arr.push(this.generate_tag_plus_aggregator_operand(tag, agg));
          }

          if (json_arr.length > 2) {
            console.log('Test 0 ', json_arr);

            json_arr = this.generate_json_by_removing_divisions(json_arr);
            json_arr = this.generate_json_by_removing_multipliers(json_arr);

            console.log('Final Json Array at save : ');
            console.log(json_arr);

            data['name'] = '0+1';
            data['type'] = 'computed';
            if (json_arr[1] == '+') {
              data['operator'] = 'addition';
            } else if (json_arr[1] == '-') {
              data['operator'] = 'subtraction';
            } else if (json_arr[1] == '/') {
              data['operator'] = 'division';
            } else {
              data['operator'] = 'multiplication';
            }

            data['operands'] = [json_arr[0], json_arr[2]];

            let j = 2;

            for (j = 2; j < json_arr.length - 1; j++) {
              let temp = JSON.parse(JSON.stringify(data));

              if (json_arr[j] == '+') {
                data['operands'][0] = temp;
                data['operands'][1] = json_arr[j + 1];
                data['name'] = 'Result - ' + j;
                data['type'] = 'computed';
                data['operator'] = 'addition';
              } else if (json_arr[j] == '-') {
                data['operands'][0] = temp;
                data['operands'][1] = json_arr[j + 1];
                data['name'] = 'Result - ' + j;
                data['type'] = 'computed';
                data['operator'] = 'subtraction';
              } else if (json_arr[j] == '*') {
                data['operands'][0] = temp;
                data['operands'][1] = json_arr[j + 1];
                data['name'] = 'Result - ' + j;
                data['type'] = 'computed';
                data['operator'] = 'multiplication';
              } else if (json_arr[j] == '/') {
                data['operands'][0] = temp;
                data['operands'][1] = json_arr[j + 1];
                data['name'] = 'Result - ' + j;
                data['type'] = 'computed';
                data['operator'] = 'division';
              }
            }

            parent['operands'].push(data);
            console.log('Final Data Object - 2 : ', parent);
          } else if (json_arr.length == 2) {
            data['name'] = '0+1';
            data['type'] = 'computed';
            if (json_arr[1] == '+') {
              data['operator'] = 'addition';
            } else if (json_arr[1] == '-') {
              data['operator'] = 'subtraction';
            } else if (json_arr[1] == '/') {
              data['operator'] = 'division';
            } else {
              data['operator'] = 'multiplication';
            }

            data['operands'] = [json_arr[0], json_arr[2]];
          } else if (json_arr.length == 1) {
            data['name'] = '0+1';
            data['type'] = 'computed';
            data['operator'] = 'addition';
            data['operands'] = [
              json_arr[0],
              {
                name: '0',
                type: 'constant',
              },
            ];
          }
        }

        this.backend_data.push(parent);

        console.log('Backend Array : ', this.backend_data);
      }
    }
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

    this.tags.derived_tags.push({
      name: 'tag-' + ind.toString(),
      type: 'derived',
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

      this.getJsonForEachSubFormulaBetweenBrackets(this.dropped_tags)
    }

    this.tags.datasource_tags = JSON.parse(
      JSON.stringify(this.datasources_tags_copy)
    );
    this.aggregators = JSON.parse(JSON.stringify(this.aggregators_copy));
    this.operators = JSON.parse(JSON.stringify(this.operators_copy));

    this.tags.saved_tags = JSON.parse(JSON.stringify(this.saved_tags_copy));
  }

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
    console.log('Json Array : ', json_arr);
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
      console.log('Returning : ', temp_arr);
      return temp_arr;
    }

    return this.generate_json_by_removing_divisions(temp_arr);
  };

  generate_json_by_removing_multipliers = (json_arr) => {
    console.log('Json Array : ', json_arr);
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
      console.log('Returning : ', temp_arr);
      return temp_arr;
    }

    return this.generate_json_by_removing_multipliers(temp_arr);
  };

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
        this.constructGoJSFormattedData0(final_data)
      }
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
        data: {},
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
    if (this.backend_data.length == 0) {
      return window.alert(
        'No Tags added to save. Please add at least 1 tag to proceed.'
      );
    }

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
