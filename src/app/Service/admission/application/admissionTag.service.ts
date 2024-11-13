import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionOffer} from "../../../model/admission/applicantInformation/admissionOffer";
import {AdmissionTag} from "../../../model/admission/applicantInformation/admissionTag";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTagService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  // getAdmissionTag(admissionApplicationId:any){
  //   return this.httpClient.get(environment.api_url +'/admission/tag?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
  //
  //     if(error.status === 404){
  //       this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
  //     }else{
  //       this.toastr.error(error.error.error);
  //     }
  //     return of();
  //   }));
  // }
  getAdmissionTag(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/tag?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  sendAdmissionTag(id:any){
    return this.httpClient.get(environment.api_url +'/admission/tag/send?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }


  postAdmissionTag(admissionTag: AdmissionTag){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTag);
    return this.httpClient.post(environment.api_url +'/admission/tag', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionTag(admissionTag: AdmissionTag, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTag);
    return this.httpClient.put<any>(environment.api_url +'/admission/tag?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionTag(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/tag',
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
