import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestApproval} from "../../../model/admission/admission-test/admissionTestApproval";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestApprovalService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestApproval(){
    return this.httpClient.get(environment.api_url +'/admission/test/approval').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestApprovalView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/approval/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestApprovalActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/approval/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestApproval(admissionTestApproval: AdmissionTestApproval){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestApproval);
    return this.httpClient.post(environment.api_url +'/admission/test/approval', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestApproval(admissionTestApproval: AdmissionTestApproval, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestApproval);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/approval?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestApproval(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/approval',
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
