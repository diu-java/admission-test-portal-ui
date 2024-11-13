import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionReference} from "../../../model/admission/applicantInformation/admissionReference";
@Injectable({
  providedIn: 'root',
})
export class AdmissionReferenceService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionReference(admissionPersonId:any){
    return this.httpClient.get(environment.api_url +'/admission/reference/person?admissionPersonId='+admissionPersonId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionReference(admissionReference: AdmissionReference){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionReference);
    return this.httpClient.post(environment.api_url +'/admission/reference', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionReference(admissionReference: AdmissionReference, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionReference);
    return this.httpClient.put<any>(environment.api_url +'/admission/reference?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionReference(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/reference',
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
