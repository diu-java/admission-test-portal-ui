import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionMarkApplicant} from "../../../model/admission/admission-exam/admissionMarkApplicant";
@Injectable({
  providedIn: 'root',
})
export class AdmissionMarkApplicantService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionMarkApplicant(admissionExamId:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/applicant?admissionExamId='+admissionExamId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionMarkApplicantPosition(admissionExamId:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/applicant/position?admissionExamId='+admissionExamId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionMarkApplicantActive(){
    return this.httpClient.get(environment.api_url +'/admission/mark/applicant/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionMarkApplicant(admissionMarkApplicant: AdmissionMarkApplicant){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionMarkApplicant);
    return this.httpClient.post(environment.api_url +'/admission/mark/applicant', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionMarkApplicant(admissionMarkApplicant: AdmissionMarkApplicant, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionMarkApplicant);
    return this.httpClient.put<any>(environment.api_url +'/admission/mark/applicant?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionMarkApplicant(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/mark/applicant',
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
  setAdmissionApplicantMarkSession(params: any) {
    sessionStorage.setItem('searchAdmissionApplicants', JSON.stringify(params));
  }
  getAdmissionApplicantMarkSession(){
    const paramsString = sessionStorage.getItem('searchAdmissionApplicants');
    return paramsString ? JSON.parse(paramsString) : null;
  }

  setAdmissionApplicantAttendanceSession(params: any) {
    sessionStorage.setItem('searchAdmissionAttendances', JSON.stringify(params));
  }
  getAdmissionApplicantAttendanceSession(){
    const paramsString = sessionStorage.getItem('searchAdmissionAttendances');
    return paramsString ? JSON.parse(paramsString) : null;
  }
}
