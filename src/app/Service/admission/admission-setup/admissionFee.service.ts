import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionMembershipUserType} from "../../../model/admission/admission-setup/admissionMembershipUserType";
import {
  AdmissionAffiliateUserType
} from "../../../model/admission/admission-setup/admissionAffiliateUserType";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import {AdmissionFee} from "../../../model/admission/admission-setup/admissionFee";
@Injectable({
  providedIn: 'root',
})
export class AdmissionFeeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionFee(){
    return this.httpClient.get(environment.api_url +'/admission/fee').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionFeeAmount(semesterId:any, semesterTypeId:any, programId:any){
    return this.httpClient.get(environment.api_url +'/admission/fee/amount?semesterId='+
      semesterId+ '&semesterTypeId='+semesterTypeId+ '&programId='+programId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }
  getViewAdmissionFee(id:any){
    return this.httpClient.get(environment.api_url +'/admission/fee/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  getAdmissionFeeActive(){
    return this.httpClient.get(environment.api_url +'/admission/fee/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionFee(admissionFee: AdmissionFee){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionFee);
    return this.httpClient.post(environment.api_url +'/admission/fee', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionFee(admissionFee: AdmissionFee, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionFee);
    return this.httpClient.put<any>(environment.api_url +'/admission/fee?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionFee(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/fee',
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
