import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Designation} from "../../model/common-setup/designation";
@Injectable({
  providedIn: 'root',
})
export class DesignationService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getDesignation(){
    return this.httpClient.get(environment.api_url +'/designation').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getDesignationActive(){
    return this.httpClient.get(environment.api_url +'/designation/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postDesignation(designation: Designation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(designation);
    return this.httpClient.post(environment.api_url +'/designation', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putDesignation(designation: Designation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(designation);
    return this.httpClient.put<any>(environment.api_url +'/designation?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteDesignation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/designation',
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