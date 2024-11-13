import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root',
})
export class ProgramService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getProgram(){
    return this.httpClient.get(environment.api_url +'/program').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.statusText);
      }
      return of();
    }));
  }
  getProgramActive(){
    return this.httpClient.get(environment.api_url +'/program/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.statusText);
      }
      return of();
    }));
  }
  getProgramDepartment(departmentId:any){
    return this.httpClient.get(environment.api_url +'/program/search?departmentId='+
      departmentId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
        if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getProgramFaculty(facultyId:any){
    return this.httpClient.get(environment.api_url +'/program/faculty?facultyId='+
      facultyId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getViewProgram(id:any){
    return this.httpClient.get(environment.api_url +'/program/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.statusText);
      return of();
    }));
  }

  deleteProgram(id: any) {
    return this.httpClient.delete(
      environment.api_url +'/program',
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
}
