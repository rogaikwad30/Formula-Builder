import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-basic-new-ui',
  templateUrl: './basic-new-ui.component.html',
  styleUrls: ['./basic-new-ui.component.css']
})
export class BasicNewUiComponent implements OnInit {

  formula_name = ""
  result_collection = "" 
  interval = null
  start_from_ep = null
  start_from_obj = ""

  constructor(private route: ActivatedRoute,private http : HttpClient) { 

  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        let key = params["_id"]
        if(key != "new"){
          console.log("Call Api to fetch formula details : ",key);
          let url = 'http://localhost:5000/formulas/' + key
          this.http.get(url).subscribe( (Response) => {  
            if(Response['resp'] == "success"){
              this.formula_name = Response["data"]["formula_name"]
              this.result_collection = Response["data"]["result_collection"]
              console.log("Resp : ",Response)
              
              // set up interval configurartion for ui
              this.start_from_obj = Response["start_from"] || ""
              this.interval = Response["interval"] || ""
              
            } 
            else{
              window.location.href = "/"
            }
          });
        }
      });
  }

  onChangeName = (name) => {
    this.formula_name = name.value
  }

  onChangeResultColl = (resultColl) => {
    this.result_collection = resultColl.value
  }

  onSave = () => {
    let url = "http://localhost:5000/save-formula"
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const request_body = {
      "formula_name" : this.formula_name,
      "result_collection" : this.result_collection,
      "interval" : this.interval,
      "start_from" :  this.start_from_ep,
      "start_from_obj" : this.start_from_obj
    }

    console.log("Posting : " ,request_body)
    this.http.post(url,request_body,httpOptions).subscribe( (Response) => {  
      console.log("Post Response is : " ,Response)
      if(Response["resp"]=="success"){
       window.location.href = "/final-new-ui?_id=" + Response["_id"] 
      }
    });

  }
 
  onChangeInterval = (event) => { 
    this.interval = parseFloat(event.target.value)
  }


  onChangeDateTime = (event) => {
    let datetime = event.target.value
    console.log("Hi : ",datetime );
    let epoch = new Date(event.target.value).valueOf() 
    console.log("Epoch : ", epoch)
    this.start_from_ep = epoch / 1000
    this.start_from_obj = event.target.value
  }


}
