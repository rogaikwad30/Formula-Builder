import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  formula_name = ""
  result_collection = ""
  start_from_date = null
  start_from_time = null
  interval = null
  start_from = Date.now()
  
  constructor(private route: ActivatedRoute,private http : HttpClient) { }

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

              let ep = 1661847900000
              let d = new Date(ep)
              console.log(d); 
              console.log("here : ", d.getDate(), d.getMonth(), d.getFullYear())
              this.start_from_date = d
              console.log(this.start_from_date)

              this.interval = 300 
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

    this.start_from = this.construct_start_from(this.start_from_date,this.start_from_time)
    const request_body = {
      "formula_name" : this.formula_name,
      "result_collection" : this.result_collection,
      "interval" : this.interval,
      "start_from" : this.start_from
    }

    console.log("Posting : " ,request_body)
    this.http.post(url,request_body,httpOptions).subscribe( (Response) => {  
      console.log("Post Response is : " ,Response)
      if(Response["resp"]=="success"){
       window.location.href = "/final?_id=" + Response["_id"] 
      }
    });

  }

  construct_start_from = (date,time) => {
    console.log("Inp : ",date, time)
    let arr = date.split("-")
    let year = parseInt(arr[0])
    let month = parseFloat(arr[1])-1
    let day = parseFloat(arr[2])

    arr = time.split(":")
    let hr = parseInt(arr[0])
    let min = parseFloat(arr[1])


    console.log(year,month,day,hr,min)


    let ep = new Date(year,month,day,hr,min,0,0).getTime()
    return ep
  }

  onChangeStartFromDate = (event) => { 
    this.start_from_date = event.target.value
  }

  onChangeStartFromTime = (event) => { 
    this.start_from_time = event.target.value
  } 

  onChangeInterval = (event) => { 
    this.interval = parseFloat(event.target.value)
  }
}