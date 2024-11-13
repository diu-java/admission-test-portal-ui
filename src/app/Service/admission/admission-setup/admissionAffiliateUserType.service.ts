import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionMembershipUserType} from "../../../model/admission/admission-setup/admissionMembershipUserType";
import {
  AdmissionAffiliateUserType
} from "../../../model/admission/admission-setup/admissionAffiliateUserType";
@Injectable({
  providedIn: 'root',
})
export class AdmissionAffiliateUserTypeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAffiliateUserType(){
    return this.httpClient.get(environment.api_url +'/admission/affiliate/user/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAffiliateUseTypeActive(){
    return this.httpClient.get(environment.api_url +'/admission/affiliate/user/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAffiliateUserType(admissionAffiliateUserType: AdmissionAffiliateUserType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionAffiliateUserType);
    return this.httpClient.post(environment.api_url +'/admission/affiliate/user/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAffiliateUserType(admissionAffiliateUserType: AdmissionAffiliateUserType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionAffiliateUserType);
    return this.httpClient.put<any>(environment.api_url +'/admission/affiliate/user/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAffiliateUserType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/affiliate/user/type',
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
