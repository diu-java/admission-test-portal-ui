import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestCommitteeMember} from "../../../model/admission/admission-test/admissionTestCommitteeMember";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestCommitteeMemberService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestCommitteeMember(){
    return this.httpClient.get(environment.api_url +'/admission/test/committee/member').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestCommitteeMemberView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/committee/member/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestCommitteeMemberActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/committee/member/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestCommitteeMember(admissionTestCommitteeMember: AdmissionTestCommitteeMember){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestCommitteeMember);
    return this.httpClient.post(environment.api_url +'/admission/test/committee/member', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestCommitteeMember(admissionTestCommitteeMember: AdmissionTestCommitteeMember, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestCommitteeMember);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/committee/member?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestCommitteeMember(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/committee/member',
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
