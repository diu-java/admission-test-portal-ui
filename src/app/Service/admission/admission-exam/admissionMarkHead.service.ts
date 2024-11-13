import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionMarkHead} from "../../../model/admission/admission-exam/admissionMarkHead";
@Injectable({
  providedIn: 'root',
})
export class AdmissionMarkHeadService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionMarkHead(){
    return this.httpClient.get(environment.api_url +'/admission/mark/head').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionMarkHeadActive(){
    return this.httpClient.get(environment.api_url +'/admission/mark/head/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionMarkHead(admissionMarkHead: AdmissionMarkHead){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionMarkHead);
    return this.httpClient.post(environment.api_url +'/admission/mark/head', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionMarkHead(admissionMarkHead: AdmissionMarkHead, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionMarkHead);
    return this.httpClient.put<any>(environment.api_url +'/admission/mark/head?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionMarkHead(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/mark/head',
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
