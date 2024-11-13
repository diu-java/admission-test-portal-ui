import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionEnrollment} from "../../../model/admission/applicantInformation/admissionEnrollment";
@Injectable({
  providedIn: 'root',
})
export class AdmissionEnrollmentService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionEnrollmentCheck(id:any){
    return this.httpClient.get(environment.api_url +'/admission/enrollment/check?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      console.log(error)
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }
      return of(true);
    }));
  }
  getAdmissionEnrollment(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/enrollment?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  sendAdmissionEnrollment(id:any){
    return this.httpClient.get(environment.api_url +'/admission/enrollment/send?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }


  postAdmissionEnrollment(admissionEnrollment: AdmissionEnrollment){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionEnrollment);
    return this.httpClient.post(environment.api_url +'/admission/enrollment', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionEnrollment(admissionEnrollment: AdmissionEnrollment, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionEnrollment);
    return this.httpClient.put<any>(environment.api_url +'/admission/enrollment?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionEnrollment(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/enrollment',
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
