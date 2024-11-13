import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Institute} from "../../../model/academic/institute/institute";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root',
})
export class InstituteService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getInstitute(){
    return this.httpClient.get(environment.api_url +'/institute').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getInstituteActive(){
    return this.httpClient.get(environment.api_url +'/institute/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else if(error.status === 403){
        this.toastr.error("You are not authorized");
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postInstitute(institute:Institute){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(institute);
    return this.httpClient.post(environment.api_url +'/institute',body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else if(error.status === 403){
        this.toastr.error("You are not authorized");
      }else{
        this.toastr.error(error.error.error);
      }

      return of();
    }))
  }
  deleteInstitute(id: any) {
    return this.httpClient.delete(
      environment.api_url +'/institute',
      {
        params: {
          id: id,
        },
      }
    ).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else if(error.status === 403){
        this.toastr.error("You are not authorized");
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewInstitute(id: any){
    return this.httpClient.get(environment.api_url +'/institute/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.error.error);
      return of();
    }));
  }
  putInstitute(institute:Institute, id:any){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(institute);
    return this.httpClient.put<any>(environment.api_url +'/institute?id='+id, body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else if(error.status === 403){
        this.toastr.error("You are not authorized");
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }

}
