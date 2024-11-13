import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestApplicantEnroll} from "../../../model/admission/admission-test/admissionTestApplicantEnroll";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestApplicantEnrollService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestApplicantEnroll(){
    return this.httpClient.get(environment.api_url +'/admission/test/applicant/enroll').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestApplicantEnrollView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/applicant/enroll/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestApplicantEnrollActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/applicant/enroll/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestApplicantEnroll(admissionTestApplicantEnroll: AdmissionTestApplicantEnroll){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestApplicantEnroll);
    return this.httpClient.post(environment.api_url +'/admission/test/applicant/enroll', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestApplicantEnroll(admissionTestApplicantEnroll: AdmissionTestApplicantEnroll, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestApplicantEnroll);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/applicant/enroll?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestApplicantEnroll(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/applicant/enroll',
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
