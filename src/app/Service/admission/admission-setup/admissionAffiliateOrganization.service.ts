import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionAffiliateOrganization} from "../../../model/admission/admission-setup/admissionAffiliateOrganization";
@Injectable({
  providedIn: 'root',
})
export class AdmissionAffiliateOrganizationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAffiliateOrganization(){
    return this.httpClient.get(environment.api_url +'/admission/affiliate/organization').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAffiliateOrganizationActive(){
    return this.httpClient.get(environment.api_url +'/admission/affiliate/organization/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAffiliateOrganization(admissionAffiliateOrganization: AdmissionAffiliateOrganization){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionAffiliateOrganization);
    return this.httpClient.post(environment.api_url +'/admission/affiliate/organization', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAffiliateOrganization(admissionAffiliateOrganization: AdmissionAffiliateOrganization, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionAffiliateOrganization);
    return this.httpClient.put<any>(environment.api_url +'/admission/affiliate/organization?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAffiliateOrganization(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/affiliate/organization',
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
