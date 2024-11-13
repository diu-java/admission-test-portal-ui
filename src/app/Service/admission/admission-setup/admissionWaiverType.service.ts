import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";

import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import {AdmissionWaiverType} from "../../../model/admission/admission-setup/admissionWaiverType";
@Injectable({
  providedIn: 'root',
})
export class AdmissionWaiverTypeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getWaiverType(){
    return this.httpClient.get(environment.api_url +'/admission/waiver/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getWaiverTypeActive(){
    return this.httpClient.get(environment.api_url +'/admission/waiver/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postWaiverType(admissionWaiverType: AdmissionWaiverType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionWaiverType);
    return this.httpClient.post(environment.api_url +'/admission/waiver/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putWaiverType(admissionWaiverType: AdmissionWaiverType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionWaiverType);
    return this.httpClient.put<any>(environment.api_url +'/admission/waiver/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteWaiverType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/waiver/type',
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
