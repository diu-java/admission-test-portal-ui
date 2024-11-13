import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {SemesterType} from "../../../model/academic/configuration/semesterType";
import {environment} from "../../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class SemesterTypeService{
  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  getSemesterType(){
    return this.httpClient.get(environment.api_url +'/semester/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getSemesterTypeActive(){
    return this.httpClient.get(environment.api_url +'/semester/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  postSemesterType(semesterType:SemesterType){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(semesterType);
    return this.httpClient.post(environment.api_url +'/semester/type',body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  putSemesterType(semesterType:SemesterType, id:any){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(semesterType);
    return this.httpClient.put<any>(environment.api_url +'/semester/type?id='+id, body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  deleteSemesterType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/semester/type',
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
      return of(error.error);
    }));
  }
}
