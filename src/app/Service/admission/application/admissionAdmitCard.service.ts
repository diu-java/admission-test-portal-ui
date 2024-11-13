import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionAdmitCard} from "../../../model/admission/applicantInformation/admissionAdmitCard";
@Injectable({
  providedIn: 'root',
})
export class AdmissionAdmitCardService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionAdmitCard(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/admit/card/find?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionAdmitCardPDF(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/admit/card/pdf?admissionApplicationId='+admissionApplicationId, { responseType: 'blob' }).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  sendAdmissionAdmitCard(id:any){
    return this.httpClient.get(environment.api_url +'/admission/admit/card/send?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionAdmitCard(admissionAdmitCard: AdmissionAdmitCard){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionAdmitCard);
    return this.httpClient.post(environment.api_url +'/admission/admit/card', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionAdmitCard(admissionAdmitCard: AdmissionAdmitCard, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionAdmitCard);
    return this.httpClient.put<any>(environment.api_url +'/admission/admit/card?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionAdmitCard(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/admit/card',
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
