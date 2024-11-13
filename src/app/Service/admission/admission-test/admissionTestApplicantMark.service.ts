import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestApplicantMark} from "../../../model/admission/admission-test/admissionTestApplicantMark";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestApplicantMarkService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestApplicantMark(){
    return this.httpClient.get(environment.api_url +'/admission/test/applicant/mark').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestApplicantMarkView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/applicant/mark/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestApplicantMarkActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/applicant/mark/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestApplicantMark(admissionTestApplicantMark: AdmissionTestApplicantMark){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestApplicantMark);
    return this.httpClient.post(environment.api_url +'/admission/test/applicant/mark', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestApplicantMark(admissionTestApplicantMark: AdmissionTestApplicantMark, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestApplicantMark);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/applicant/mark?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestApplicantMark(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/applicant/mark',
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
