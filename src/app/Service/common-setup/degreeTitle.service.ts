import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {DegreeTitle} from "../../model/common-setup/degreeTitle";
@Injectable({
  providedIn: 'root',
})
export class DegreeTitleService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getDegreeTitle(){
    return this.httpClient.get(environment.api_url +'/degree/title').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getRelationActive(){
    return this.httpClient.get(environment.api_url +'/degree/title/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postDegreeTitle(degreeTitle: DegreeTitle){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(DegreeTitle);
    return this.httpClient.post(environment.api_url +'/degree/title', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putDegreeTitle(degreeTitle: DegreeTitle, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(DegreeTitle);
    return this.httpClient.put<any>(environment.api_url +'/degree/title?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteDegreeTitle(id:any){
    return this.httpClient.delete(
      environment.api_url +'/degree/title',
      {
        params: {
          id: id,
        },
      }
    ).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
}
