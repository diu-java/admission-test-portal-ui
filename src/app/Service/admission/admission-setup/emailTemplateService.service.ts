import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionFaq} from "../../../model/admission/admission-setup/admissionFaq";
@Injectable({
  providedIn: 'root',
})
export class EmailTemplateServiceService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getEmailTemplate(){
    return this.httpClient.get(environment.api_url +'/email/template').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getEmailTemplateActive(){
    return this.httpClient.get(environment.api_url +'/email/template/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postEmailTemplate(admissionFaq: AdmissionFaq){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionFaq);
    return this.httpClient.post(environment.api_url +'/email/template', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putEmailTemplate(admissionFaq: AdmissionFaq, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionFaq);
    return this.httpClient.put<any>(environment.api_url +'/email/template?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteEmailTemplate(id:any){
    return this.httpClient.delete(
      environment.api_url +'/email/template',
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
