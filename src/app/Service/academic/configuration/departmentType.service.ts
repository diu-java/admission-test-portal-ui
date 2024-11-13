import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {DepartmentType} from "../../../model/academic/configuration/departmentType";
import {environment} from "../../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class DepartmentTypeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getDepartmentType(){
    return this.httpClient.get(environment.api_url +'/department/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getDepartmentTypeActive(){
    return this.httpClient.get(environment.api_url +'/department/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  postDepartmentType(departmentType:DepartmentType){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(departmentType);
    return this.httpClient.post(environment.api_url +'/department/type',body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  putDepartmentType(departmentType:DepartmentType, id:any){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(departmentType);
    return this.httpClient.put<any>(environment.api_url +'/department/type?id='+id, body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  deleteDepartmentType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/department/type',
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
