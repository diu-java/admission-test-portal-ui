import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionFeePayment} from "../../../model/admission/applicantInformation/admissionFeePayment";
@Injectable({
  providedIn: 'root',
})
export class AdmissionFeePaymentService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionFeePayment(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/fee/payment/find?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionFeePayment(admissionFeePayment: AdmissionFeePayment){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionFeePayment);
    return this.httpClient.post(environment.api_url +'/admission/fee/payment', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }

}
