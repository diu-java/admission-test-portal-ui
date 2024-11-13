import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionEnrollment} from "../../../model/admission/applicantInformation/admissionEnrollment";
import {AdmissionOffer} from "../../../model/admission/applicantInformation/admissionOffer";
@Injectable({
  providedIn: 'root',
})
export class AdmissionOfferService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  // getAdmissionOffer(admissionApplicationId:any){
  //   return this.httpClient.get(environment.api_url +'/admission/offer?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
  //
  //     if(error.status === 404){
  //       this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
  //     }else{
  //       this.toastr.error(error.error.error);
  //     }
  //     return of();
  //   }));
  // }
  getAdmissionOffer(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/offer?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  sendAdmissionOffer(id:any){
    return this.httpClient.get(environment.api_url +'/admission/offer/send?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }


  postAdmissionOffer(admissionOffer: AdmissionOffer){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionOffer);
    return this.httpClient.post(environment.api_url +'/admission/offer', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionOffer(admissionOffer: AdmissionOffer, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionOffer);
    return this.httpClient.put<any>(environment.api_url +'/admission/offer?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionOffer(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/offer',
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
