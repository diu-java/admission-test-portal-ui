import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestSubject} from "../../../model/admission/admission-test/admissionTestSubject";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestSubjectService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestSubject(){
    return this.httpClient.get(environment.api_url +'/admission/test/subject').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestSubjectView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/subject/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestSubjectActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/subject/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestSubject(admissionTestSubject: AdmissionTestSubject){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestSubject);
    return this.httpClient.post(environment.api_url +'/admission/test/subject', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestSubject(admissionTestSubject: AdmissionTestSubject, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestSubject);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/subject?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestSubject(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/subject',
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
