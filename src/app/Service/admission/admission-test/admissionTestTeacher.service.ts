import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestTeacher} from "../../../model/admission/admission-test/admissionTestTeacher";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestTeacherService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestTeacher(){
    return this.httpClient.get(environment.api_url +'/admission/test/teacher').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestTeacherView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/teacher/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestTeacherActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/teacher/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestTeacher(admissionTestTeacher: AdmissionTestTeacher){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestTeacher);
    return this.httpClient.post(environment.api_url +'/admission/test/teacher', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestTeacher(admissionTestTeacher: AdmissionTestTeacher, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestTeacher);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/teacher?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestTeacher(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/teacher',
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
