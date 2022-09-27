import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as go from 'gojs';

@Component({
  selector: 'app-dashboard-new-ui',
  templateUrl: './dashboard-new-ui.component.html',
  styleUrls: ['./dashboard-new-ui.component.css']
})
export class DashboardNewUiComponent implements OnInit {
  formulas_list = []
  public model: go.TreeModel = new go.TreeModel(
    []
  );

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/formulas').subscribe( (Response) => {  
      if(Response['resp'] == "success"){
        console.log("Resp : ", Response)
        this.formulas_list = Response["data"]
        this.onOpenTreeView(Response["data"][1]["_id"])
      } 
      else{
        console.log("REs : ",Response); 
        return window.alert("Error fetching formulas")
      }
    });
  }

  onDelete = ( id ) => {
    console.log("Delete Requested : ", id)
    this.http.delete('http://localhost:5000/formulas/'+id).subscribe( (Response) => {  
      if(Response['resp'] == "success"){
        window.alert("Deleted Formula")
        this.formulas_list = Response["data"] 
        console.log(Response)
      } 
    });
  }

  constructGoJSFormattedData = (final_tag,final_arr=[],parentKey=-1) => {
    if(parentKey==-1){
      parentKey = 1
      final_arr.push({ 
        'key': parentKey, 
        'name': `${final_tag["name"]} = [${final_tag["formula"]}]`
      })
    }
    
    let is_final_level = true 
    for(let obj of final_tag["formula_array"]){
      if(obj["type"]=="derived"){
        is_final_level = false
        final_arr.push({ 
          'key': final_arr.length+1, 
          'name': `${obj["name"]} = [${obj["formula"]}]`,
          'parent': parentKey
        })

        final_arr = this.constructGoJSFormattedData(obj,final_arr,final_arr.length)
      }
    } 

    return final_arr
  }

  onOpenTreeView = (id) => {
    console.log("Requested tree view for : ", id)
    let treeData = []
    let saved_tags = []
    for(let obj of this.formulas_list){ 
      if(obj["_id"] == id){
        saved_tags =  obj["saved_tags"]
        break;
      }
    }
    
    for(let obj of saved_tags){
      if(obj["is_it_final_tag"]){
        console.log("Construct formula model here - ")
        console.log(obj);

        let array = this.constructGoJSFormattedData(obj)

      

        this.model = new go.TreeModel(array)

        break;
      }
    }
  }
}
