import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionMessageLog} from "../../../model/admission/applicantInformation/admissionMessageLog";
@Injectable({
  providedIn: 'root',
})
export class AdmissionMessageLogService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getAdmissionMessageLog(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/message?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  sendAdmissionMessageLog(id:any){
    return this.httpClient.get(environment.api_url +'/admission/message/send?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }


  postAdmissionMessageLog(admissionMessageLog: AdmissionMessageLog){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionMessageLog);
    return this.httpClient.post(environment.api_url +'/admission/message', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionMessageLog(admissionMessageLog: AdmissionMessageLog, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionMessageLog);
    return this.httpClient.put<any>(environment.api_url +'/admission/message?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionMessageLog(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/message',
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
