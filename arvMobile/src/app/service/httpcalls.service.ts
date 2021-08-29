import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HTTPCallsService {

  constructor(private http: HttpClient) {

    
   }

   getData(url:string,data:any): Observable<any> {
    return  this.http.get(url,data).pipe(map(response=>response));
    
  }

  PostData(url:string,data:any): Observable<any> {
    return  this.http.post(url,data).pipe(map(response=>response));;
    
  }
  PostData1(url:string,data:any): Observable<any> {
    return this.http.post("", {}, {})

   }


}
