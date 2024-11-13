import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../../environment/environment";
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {FacultyJobPosition} from "../../../model/academic/configuration/facultyJobPosition";
import {DepartmentJobPosition} from "../../../model/academic/configuration/departmentJobPosition";
@Injectable({
  providedIn: 'root',
})
export class DepartmentJobPositionService {
  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  getDepartmentJobPosition(){
    return this.httpClient.get(environment.api_url +'/department/job/position').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getDepartmentJobPositionActive(){
    return this.httpClient.get(environment.api_url +'/department/job/position/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  postDepartmentJobPosition(departmentJobPosition:DepartmentJobPosition){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(departmentJobPosition);
    return this.httpClient.post(environment.api_url +'/department/job/position', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  puttDepartmentJobPosition(departmentJobPosition:DepartmentJobPosition, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(departmentJobPosition);
    return this.httpClient.put<any>(environment.api_url +'/department/job/position?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteDepartmentJobPosition(id:any){
    return this.httpClient.delete(
      environment.api_url +'/department/job/position',
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
