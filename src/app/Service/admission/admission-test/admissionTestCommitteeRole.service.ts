import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestCommitteeRole} from "../../../model/admission/admission-test/admissionTestCommitteeRole";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestCommitteeRoleService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestCommitteeRole(){
    return this.httpClient.get(environment.api_url +'/admission/test/committee/role').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestCommitteeRoleView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/committee/role/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestCommitteeRoleActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/committee/role/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestCommitteeRole(admissionTestCommitteeRole: AdmissionTestCommitteeRole){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestCommitteeRole);
    return this.httpClient.post(environment.api_url +'/admission/test/committee/role', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestCommitteeRole(admissionTestCommitteeRole: AdmissionTestCommitteeRole, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestCommitteeRole);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/committee/role?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestCommitteeRole(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/committee/role',
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
