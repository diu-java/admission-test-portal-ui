import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionMarkTeacher} from "../../../model/admission/admission-exam/admissionMarkTeacher";
@Injectable({
  providedIn: 'root',
})
export class AdmissionMarkTeacherService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionMarkTeacher(admissionExamId:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/teacher?admissionExamId='+admissionExamId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionMarkTeacherActive(admissionExamId:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/teacher/active?admissionExamId='+admissionExamId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionMarkTeacherView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/teacher/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionMarkTeacherSelf(){
    return this.httpClient.get(environment.api_url +'/admission/mark/teacher/self').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionMarkTeacher(admissionTeacherAssign: AdmissionMarkTeacher){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTeacherAssign);
    return this.httpClient.post(environment.api_url +'/admission/mark/teacher', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionMarkTeacher(admissionTeacherAssign: AdmissionMarkTeacher, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTeacherAssign);
    return this.httpClient.put<any>(environment.api_url +'/admission/mark/teacher?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionMarkTeacher(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/mark/teacher',
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
