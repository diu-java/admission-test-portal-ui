import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {SyllabusType} from "../../../model/academic/configuration/syllabusType";
import {environment} from "../../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class SyllabusTypeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getSyllabusType(){
    return this.httpClient.get(environment.api_url +'/syllabus/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getSyllabusTypeActive(){
    return this.httpClient.get(environment.api_url +'/syllabus/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postSyllabusType(syllabusType: SyllabusType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(syllabusType);
    return this.httpClient.post(environment.api_url +'/syllabus/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  putSyllabusType(syllabusType: SyllabusType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(syllabusType);
    return this.httpClient.put<any>(environment.api_url +'/syllabus/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  deleteSyllabusType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/syllabus/type',
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
