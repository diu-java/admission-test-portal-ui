import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionEnrollmentType} from "../../../model/admission/admission-setup/admissionEnrollmentType";
@Injectable({
  providedIn: 'root',
})
export class AdmissionEnrollmentTypeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionEnrollmentType(){
    return this.httpClient.get(environment.api_url +'/admission/enrollment/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewAdmissionEnrollmentType(id:any){
    return this.httpClient.get(environment.api_url +'/admission/enrollment/type/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  getAdmissionEnrollmentTypeActive(){
    return this.httpClient.get(environment.api_url +'/admission/enrollment/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionEnrollmentType(admissionEnrollmentType: AdmissionEnrollmentType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionEnrollmentType);
    return this.httpClient.post(environment.api_url +'/admission/enrollment/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionEnrollmentType(admissionEnrollmentType: AdmissionEnrollmentType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionEnrollmentType);
    return this.httpClient.put<any>(environment.api_url +'/admission/enrollment/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionEnrollmentType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/enrollment/type',
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
