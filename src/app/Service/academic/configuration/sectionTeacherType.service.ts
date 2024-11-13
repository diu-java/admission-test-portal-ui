import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {SectionTeacherType} from "../../../model/academic/configuration/sectionTeacherType";
@Injectable({
  providedIn: 'root',
})
export class SectionTeacherTypeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getSectionTeacherType(){
    return this.httpClient.get(environment.api_url +'/section/teacher/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getSectionTeacherTypeActive(){
    return this.httpClient.get(environment.api_url +'/section/teacher/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postSectionTeacherType(sectionTeacherType: SectionTeacherType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(sectionTeacherType);
    return this.httpClient.post(environment.api_url +'/section/teacher/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error)
    }))
  }
  putSectionTeacherType(sectionTeacherType: SectionTeacherType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(sectionTeacherType);
    return this.httpClient.put<any>(environment.api_url +'/section/teacher/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  deleteSectionTeacherType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/section/teacher/type',
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
