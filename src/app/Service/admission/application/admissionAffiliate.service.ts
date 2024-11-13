import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {ApplicantCreditTransfer} from "../../../model/admission/applicantInformation/applicantCreditTransfer";
import {AdmissionAffiliate} from "../../../model/admission/applicantInformation/admissionAffiliate";
@Injectable({
  providedIn: 'root',
})
export class AdmissionAffiliateService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionAffiliate(personId:any){
    return this.httpClient.get(environment.api_url +'/admission/affiliate/person?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionAffiliate(admissionAffiliate: AdmissionAffiliate){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionAffiliate);
    return this.httpClient.post(environment.api_url +'/admission/affiliate', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionAffiliate(admissionAffiliate: AdmissionAffiliate, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionAffiliate);
    return this.httpClient.put<any>(environment.api_url +'/admission/affiliate?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionAffiliate(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/affiliate',
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
