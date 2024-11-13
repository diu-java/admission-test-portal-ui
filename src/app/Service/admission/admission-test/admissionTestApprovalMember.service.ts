import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestApprovalMember} from "../../../model/admission/admission-test/admissionTestApprovalMember";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestApprovalMemberService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestApprovalMember(){
    return this.httpClient.get(environment.api_url +'/admission/test/approval/member').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestApprovalMemberView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/approval/member/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestApprovalMemberActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/approval/member/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestApprovalMember(admissionTestApprovalMember: AdmissionTestApprovalMember){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestApprovalMember);
    return this.httpClient.post(environment.api_url +'/admission/test/approval/member', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestApprovalMember(admissionTestApprovalMember: AdmissionTestApprovalMember, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestApprovalMember);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/approval/member?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestApprovalMember(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/approval/member',
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
