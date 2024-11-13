import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {
  ApplicantEducationalInformation
} from "../../../model/admission/applicantInformation/applicantEducationalInformation";
import {ApplicantCreditTransfer} from "../../../model/admission/applicantInformation/applicantCreditTransfer";
@Injectable({
  providedIn: 'root',
})
export class ApplicantCreditTransferService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getCreditTransfer(personId:any){
    return this.httpClient.get(environment.api_url +'/admission/credit/transfer/person?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postCreditTransfer(applicantCreditTransfer: ApplicantCreditTransfer){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(applicantCreditTransfer);
    return this.httpClient.post(environment.api_url +'/admission/credit/transfer', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putCreditTransfer(applicantCreditTransfer: ApplicantCreditTransfer, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(applicantCreditTransfer);
    return this.httpClient.put<any>(environment.api_url +'/admission/credit/transfer?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteCreditTransfer(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/credit/transfer',
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
