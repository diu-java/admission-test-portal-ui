import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestTemplate} from "../../../model/admission/admission-test/admissionTestTemplate";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestTemplateService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestTemplate(){
    return this.httpClient.get(environment.api_url +'/admission/test/template').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestTemplateView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/template/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestTemplateActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/template/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestTemplate(admissionTestTemplate: AdmissionTestTemplate){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestTemplate);
    return this.httpClient.post(environment.api_url +'/admission/test/template', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestTemplate(admissionTestTemplate: AdmissionTestTemplate, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestTemplate);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/template?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestTemplate(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/template',
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