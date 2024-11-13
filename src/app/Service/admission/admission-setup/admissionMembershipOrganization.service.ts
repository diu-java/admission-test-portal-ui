import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";
import {
  AdmissionMembershipOrganization
} from "../../../model/admission/admission-setup/admissionMembershipOrganization";
@Injectable({
  providedIn: 'root',
})
export class AdmissionMembershipOrganizationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getMembershipOrganization(){
    return this.httpClient.get(environment.api_url +'/admission/membership/organization').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getMembershipOrganizationActive(){
    return this.httpClient.get(environment.api_url +'/admission/membership/organization/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postMembershipOrganization(admissionMembershipOrganization: AdmissionMembershipOrganization){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionMembershipOrganization);
    return this.httpClient.post(environment.api_url +'/admission/membership/organization', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putMembershipOrganization(admissionMembershipOrganization: AdmissionMembershipOrganization, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionMembershipOrganization);
    return this.httpClient.put<any>(environment.api_url +'/admission/membership/organization?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteMembershipOrganization(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/membership/organization',
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
