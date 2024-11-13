import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";

import {AdmissionMembership} from "../../../model/admission/admission-setup/admissionMembership";
@Injectable({
  providedIn: 'root',
})
export class AdmissionMembershipService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getMembership(){
    return this.httpClient.get(environment.api_url +'/admission/membership').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getMembershipActive(){
    return this.httpClient.get(environment.api_url +'/admission/membership/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){

        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postMembership(admissionMembership: AdmissionMembership){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionMembership);
    return this.httpClient.post(environment.api_url +'/admission/membership', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putMembership(admissionMembership: AdmissionMembership, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionMembership);
    return this.httpClient.put<any>(environment.api_url +'/admission/membership?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteMembership(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/membership',
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
