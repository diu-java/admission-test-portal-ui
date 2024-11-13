import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionPersonWaiver} from "../../../model/admission/applicantInformation/admissionPersonWaiver";
@Injectable({
  providedIn: 'root',
})
export class AdmissionPersonWaiverService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  postAdmissionPersonWaiver(admissionPersonWaiver: AdmissionPersonWaiver){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionPersonWaiver);
    return this.httpClient.post(environment.api_url +'/admission/person/waiver', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionPersonWaiver(admissionPersonWaiver: AdmissionPersonWaiver, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionPersonWaiver);
    return this.httpClient.put<any>(environment.api_url +'/admission/person/waiver?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionPersonWaiver(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/person/waiver',
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
