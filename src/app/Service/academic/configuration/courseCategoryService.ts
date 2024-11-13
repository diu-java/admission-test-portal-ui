import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CourseCategory} from "../../../model/academic/configuration/CourseCategory";
import {environment} from "../../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class CourseCategoryService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getCourseCategory(){
    return this.httpClient.get(environment.api_url +'/course/category').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getCourseCategoryActive(){
    return this.httpClient.get(environment.api_url +'/course/category/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  postCourseCategory(courseCategory: CourseCategory){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(courseCategory);
    return this.httpClient.post(environment.api_url +'/course/category', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  putCourseType(courseCategory: CourseCategory,id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(courseCategory);
    return this.httpClient.put<any>(environment.api_url +'/course/category?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
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
      environment.api_url +'/course/category',
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
