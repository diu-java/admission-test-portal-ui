import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import {
  AdmissionApplicationDocumentVerifyType
} from "../../../model/admission/admission-setup/admissionApplicationDocumentVerifyType";
@Injectable({
  providedIn: 'root',
})
export class AdmissionApplicationDocumentVerifyTypeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionApplicationDocumentVerifyType(){
    return this.httpClient.get(environment.api_url +'/admission/application/document/verify/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAffiliateTypeActive(){
    return this.httpClient.get(environment.api_url +'/admission/application/document/verify/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionApplicationDocumentVerifyType(admissionApplicationDocumentVerifyType: AdmissionApplicationDocumentVerifyType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionApplicationDocumentVerifyType);
    return this.httpClient.post(environment.api_url +'/admission/application/document/verify/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionApplicationDocumentVerifyType(admissionApplicationDocumentVerifyType: AdmissionApplicationDocumentVerifyType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionApplicationDocumentVerifyType);
    return this.httpClient.put<any>(environment.api_url +'/admission/application/document/verify/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionApplicationDocumentVerifyType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/application/document/verify/type',
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
