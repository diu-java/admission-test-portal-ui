import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionMembershipUserType} from "../../../model/admission/admission-setup/admissionMembershipUserType";
import {
  AdmissionAffiliateUserType
} from "../../../model/admission/admission-setup/admissionAffiliateUserType";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
@Injectable({
  providedIn: 'root',
})
export class AdmissionAffiliateTypeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAffiliateType(){
    return this.httpClient.get(environment.api_url +'/admission/affiliate/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAffiliateTypeActive(){
    return this.httpClient.get(environment.api_url +'/admission/affiliate/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAffiliateType(admissionAffiliateType: AdmissionAffiliateType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionAffiliateType);
    return this.httpClient.post(environment.api_url +'/admission/affiliate/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAffiliateType(admissionAffiliateType: AdmissionAffiliateType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionAffiliateType);
    return this.httpClient.put<any>(environment.api_url +'/admission/affiliate/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAffiliateType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/affiliate/type',
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
