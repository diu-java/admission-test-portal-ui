import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class PaymentSchemeTemplateService{
  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  getPaymentSchemeTemplate(programId:any, levelTermTemplateId:any){
    return this.httpClient.get(environment.api_url +'/payment/scheme/template?programId='+
      programId+'&levelTermTemplateId='+levelTermTemplateId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.statusText);
      }
      return of();
    }));
  }
  getPaymentSchemeTemplateActive(programId:any){
    return this.httpClient.get(environment.api_url +'/payment/scheme/template/active?programId='+
      programId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getPaymentSchemeTemplatePagination(programId:any, levelTermTemplateId:any, page:any, size:any){
    return this.httpClient.get(environment.api_url +'/payment/scheme/template/pagination?programId='+
      programId+'&levelTermTemplateId='+levelTermTemplateId+'&page=' +page+'&size='+size).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
        if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  deletePaymentSchemeTemplate(id:any){
    return this.httpClient.delete(
      environment.api_url +'/payment/scheme/template',
      {
        params: {
          id: id,
        },
      }
    ).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.statusText);
      }
      return of(error.error);
    }));
  }
  getViewPaymentSchemeTemplate(id:any){
    return this.httpClient.get(environment.api_url +'/payment/scheme/template/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.statusText);
      return of();
    }));
  }

}
