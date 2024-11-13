import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionApplicationPayment} from "../../../model/admission/applicantInformation/admissionApplicationPayment";
@Injectable({
  providedIn: 'root',
})
export class AdmissionApplicationPaymentService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionApplicationPayment(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/payment/find?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionApplicationPayment(admissionApplicationPayment: AdmissionApplicationPayment){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionApplicationPayment);
    return this.httpClient.post(environment.api_url +'/admission/payment', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }

}
