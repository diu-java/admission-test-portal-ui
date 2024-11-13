import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestSubmit} from "../../../model/admission/admission-test/admissionTestSubmit";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestSubmitService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestSubmit(){
    return this.httpClient.get(environment.api_url +'/admission/test/submit').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestSubmitView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/submit/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestSubmitActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/submit/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestSubmit(admissionTestSubmit: AdmissionTestSubmit){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestSubmit);
    return this.httpClient.post(environment.api_url +'/admission/test/submit', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestSubmit(admissionTestSubmit: AdmissionTestSubmit, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestSubmit);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/submit?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestSubmit(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/submit',
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
