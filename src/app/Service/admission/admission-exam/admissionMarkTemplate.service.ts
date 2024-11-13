import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {
  AdmissionMarkTemplate
} from "../../../model/admission/admission-exam/admissionMarkTemplate";
@Injectable({
  providedIn: 'root',
})
export class AdmissionMarkTemplateService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionMarkTemplate(){
    return this.httpClient.get(environment.api_url +'/admission/mark/template').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionMarkTemplateView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/template/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionMarkTemplateActive(){
    return this.httpClient.get(environment.api_url +'/admission/mark/template/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionMarkTemplate(admissionMarkTemplate: AdmissionMarkTemplate){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionMarkTemplate);
    return this.httpClient.post(environment.api_url +'/admission/mark/template', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionMarkTemplate(admissionMarkTemplate: AdmissionMarkTemplate, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionMarkTemplate);
    return this.httpClient.put<any>(environment.api_url +'/admission/mark/template?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionMarkTemplate(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/mark/template',
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
