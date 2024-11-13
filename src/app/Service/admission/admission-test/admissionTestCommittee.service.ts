import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestCommittee} from "../../../model/admission/admission-test/admissionTestCommittee";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestCommitteeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestCommittee(){
    return this.httpClient.get(environment.api_url +'/admission/test/committee').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestCommitteeView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/committee/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestCommitteeActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/committee/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestCommittee(admissionTestCommittee: AdmissionTestCommittee){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestCommittee);
    return this.httpClient.post(environment.api_url +'/admission/test/committee', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestCommittee(admissionTestCommittee: AdmissionTestCommittee, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestCommittee);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/committee?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestCommittee(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/committee',
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
