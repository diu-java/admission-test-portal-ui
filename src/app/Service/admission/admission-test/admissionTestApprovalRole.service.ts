import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestApprovalRole} from "../../../model/admission/admission-test/admissionTestApprovalRole";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestApprovalRoleService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestApprovalRole(){
    return this.httpClient.get(environment.api_url +'/admission/test/approval/role').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestApprovalRoleView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/approval/role/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestApprovalRoleActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/approval/role/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestApprovalRole(admissionTestApprovalRole: AdmissionTestApprovalRole){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestApprovalRole);
    return this.httpClient.post(environment.api_url +'/admission/test/approval/role', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestApprovalRole(admissionTestApprovalRole: AdmissionTestApprovalRole, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestApprovalRole);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/approval/role?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestApprovalRole(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/approval/role',
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
