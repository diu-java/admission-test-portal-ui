import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../../environment/environment";
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {FacultyJobPosition} from "../../../model/academic/configuration/facultyJobPosition";
@Injectable({
  providedIn: 'root',
})
export class FacultyJobPositionService {
  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  getFacultyJobPosition(){
    return this.httpClient.get(environment.api_url +'/faculty/job/position').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getFacultyJobPositionActive(){
    return this.httpClient.get(environment.api_url +'/faculty/job/position/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  postFacultyJobPosition(facultyJobPosition:FacultyJobPosition){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(facultyJobPosition);
    return this.httpClient.post(environment.api_url +'/faculty/job/position', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{

      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  puttFacultyJobPosition(facultyJobPosition:FacultyJobPosition, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(facultyJobPosition);
    return this.httpClient.put<any>(environment.api_url +'/faculty/job/position?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteFacultyJobPosition(id:any){
    return this.httpClient.delete(
      environment.api_url +'/faculty/job/position',
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
