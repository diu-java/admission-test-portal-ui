import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {
  AdmissionApplicationDocumentVerify
} from "../../../model/admission/applicantInformation/admissionApplicationDocumentVerify";
@Injectable({
  providedIn: 'root',
})
export class AdmissionApplicationDocumentVerifyService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionApplicationDocumentVerify(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/application/document/verify?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionApplicationDocumentVerifyActive(){
    return this.httpClient.get(environment.api_url +'/admission/application/document/verify/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionApplicationDocumentVerify(admissionApplicationDocumentVerify: AdmissionApplicationDocumentVerify){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionApplicationDocumentVerify);
    return this.httpClient.post(environment.api_url +'/admission/application/document/verify', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionApplicationDocumentVerify(admissionApplicationDocumentVerify: AdmissionApplicationDocumentVerify, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionApplicationDocumentVerify);
    return this.httpClient.put<any>(environment.api_url +'/admission/application/document/verify?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionApplicationDocumentVerify(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/application/document/verify',
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
