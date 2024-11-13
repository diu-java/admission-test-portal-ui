import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {MaritalStatus} from "../../model/common-setup/maritalStatus";
@Injectable({
  providedIn: 'root',
})
export class MaritalStatusService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getMaritalStatus(){
    return this.httpClient.get(environment.api_url +'/marital/status').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getMaritalStatusActive(){
    return this.httpClient.get(environment.api_url +'/marital/status/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postMaritalStatus(maritalStatus: MaritalStatus){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(maritalStatus);
    return this.httpClient.post(environment.api_url +'/marital/status', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putMaritalStatus(maritalStatus: MaritalStatus, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(maritalStatus);
    return this.httpClient.put<any>(environment.api_url +'/marital/status?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteMaritalStatus(id:any){
    return this.httpClient.delete(
      environment.api_url +'/marital/status',
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
