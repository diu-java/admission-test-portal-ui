import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionWaiver} from "../../../model/admission/applicantInformation/admissionWaiver";
@Injectable({
  providedIn: 'root',
})
export class AdmissionWaiverService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionWaiver(personId:any){
    return this.httpClient.get(environment.api_url +'/admission/waiver/person?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionWaiver(admissionWaiver: AdmissionWaiver){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionWaiver);
    return this.httpClient.post(environment.api_url +'/admission/waiver', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionWaiver(admissionWaiver: AdmissionWaiver, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionWaiver);
    return this.httpClient.put<any>(environment.api_url +'/admission/waiver?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionWaiver(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/waiver',
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
      return of(true);
    }));
  }
}
