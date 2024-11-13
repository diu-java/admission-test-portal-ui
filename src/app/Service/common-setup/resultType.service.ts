import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {ResultType} from "../../model/common-setup/resultType";
@Injectable({
  providedIn: 'root',
})
export class ResultTypeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getResultType(){
    return this.httpClient.get(environment.api_url +'/result/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getResultTypeActive(){
    return this.httpClient.get(environment.api_url +'/result/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postResultType(resultType: ResultType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(resultType);
    return this.httpClient.post(environment.api_url +'/result/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putResultType(resultType: ResultType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(resultType);
    return this.httpClient.put<any>(environment.api_url +'/result/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteResultType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/result/type',
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
