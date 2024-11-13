import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CourseType} from "../../../model/academic/configuration/courseType";
import {environment} from "../../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class CourseTypeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getCourseType(){
    return this.httpClient.get(environment.api_url +'/course/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getCourseTypeActive(){
    return this.httpClient.get(environment.api_url +'/course/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postCourseType(courseType: CourseType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(courseType);
    return this.httpClient.post(environment.api_url +'/course/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error)
    }))
  }
  putCourseType(courseType: CourseType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(courseType);
    return this.httpClient.put<any>(environment.api_url +'/course/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  deleteCourseType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/course/type',
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
