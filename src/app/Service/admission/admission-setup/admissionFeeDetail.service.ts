import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";

import {AdmissionFee} from "../../../model/admission/admission-setup/admissionFee";
@Injectable({
  providedIn: 'root',
})
export class AdmissionFeeDetailService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionFeeDetail(admissionFeeId:any){
    return this.httpClient.get(environment.api_url +'/admission/fee/detail?admissionFeeId='+admissionFeeId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewAdmissionFeeDetail(id:any){
    return this.httpClient.get(environment.api_url +'/admission/fee/detail/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  getAdmissionFeeDetailActive(){
    return this.httpClient.get(environment.api_url +'/admission/fee/detail/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionFeeDetail(admissionFee: AdmissionFee){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionFee);
    return this.httpClient.post(environment.api_url +'/admission/fee/detail', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionFeeDetail(admissionFee: AdmissionFee, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionFee);
    return this.httpClient.put<any>(environment.api_url +'/admission/fee/detail?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionFeeDetail(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/fee/detail',
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
