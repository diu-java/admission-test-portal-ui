import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {ApplicantPassportInformation} from "../../../model/admission/applicantInformation/applicantPassportInformation";
@Injectable({
  providedIn: 'root',
})
export class ApplicantPassportInformationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getPassportInformation(personId:any){
    return this.httpClient.get(environment.api_url +'/admission/passport/information?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postPassportInformation(applicantPassportInformation: ApplicantPassportInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(applicantPassportInformation);
    return this.httpClient.post(environment.api_url +'/admission/passport/information', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putPassportInformation(applicantPassportInformation: ApplicantPassportInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(applicantPassportInformation);
    return this.httpClient.put<any>(environment.api_url +'/admission/passport/information?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deletePassportInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/passport/information',
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
