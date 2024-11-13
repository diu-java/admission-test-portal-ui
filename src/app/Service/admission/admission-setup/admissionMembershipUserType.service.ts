import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";
import {AdmissionMembershipUserType} from "../../../model/admission/admission-setup/admissionMembershipUserType";
@Injectable({
  providedIn: 'root',
})
export class AdmissionMembershipUserTypeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getMembershipUserType(){
    return this.httpClient.get(environment.api_url +'/admission/membership/user/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getMembershipUserTypeActive(){
    return this.httpClient.get(environment.api_url +'/admission/membership/user/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postMembershipUserType(admissionMembershipUserType: AdmissionMembershipUserType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionMembershipUserType);
    return this.httpClient.post(environment.api_url +'/admission/membership/user/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putMembershipUserType(admissionMembershipUserType: AdmissionMembershipUserType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionMembershipUserType);
    return this.httpClient.put<any>(environment.api_url +'/admission/membership/user/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteMembershipUserType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/membership/user/type',
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
