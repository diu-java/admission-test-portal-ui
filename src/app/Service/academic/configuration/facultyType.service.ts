import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {FacultyType} from "../../../model/academic/configuration/facultyType";
import {environment} from "../../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class FacultyTypeTService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  // Faculty TYpe Start

  getFacultyType(){
    return this.httpClient.get(environment.api_url +'/faculty/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.error.error);
      return of();
    }));
  }
  getFacultyTypeActive(){
    return this.httpClient.get(environment.api_url +'/faculty/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.error.error);
      return of();
    }));
  }
  postFacultyType(facultyType:FacultyType){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(facultyType);
    return this.httpClient.post(environment.api_url +'/faculty/type',body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  putFacultyType(facultyType:FacultyType, id:any){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(facultyType);
    return this.httpClient.put<any>(environment.api_url +'/faculty/type?id='+id, body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }

  deleteFacultyType(id: any) {
    return this.httpClient.delete(
      environment.api_url +'/faculty/type',
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
