import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionMarkEntry} from "../../../model/admission/admission-exam/admissionMarkEntry";
import {AdmissionMarkSubmit} from "../../../model/admission/admission-exam/admissionMarkSubmit";
@Injectable({
  providedIn: 'root',
})
export class AdmissionMarkSubmitService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionMarkSubmit(admissionExamId:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/submit?admissionExamId='+admissionExamId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionMarkSubmitFind(admissionExamId:any, admissionDistributionId:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/submit/find?admissionExamId='+admissionExamId+'&admissionDistributionId='+admissionDistributionId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionMarkSubmitActive(){
    return this.httpClient.get(environment.api_url +'/admission/mark/submit/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionMarkSubmit(admissionMarkSubmit: AdmissionMarkSubmit){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionMarkSubmit);
    return this.httpClient.post(environment.api_url +'/admission/mark/submit', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionMarkSubmit(admissionMarkSubmit: AdmissionMarkSubmit, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionMarkSubmit);
    return this.httpClient.put<any>(environment.api_url +'/admission/mark/submit?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionMarkSubmit(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/mark/submit',
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
