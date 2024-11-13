import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {
  ApplicantEducationalInformation
} from "../../../model/admission/applicantInformation/applicantEducationalInformation";
@Injectable({
  providedIn: 'root',
})
export class ApplicantMembershipInformationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getMembershipInformationPerson(personId:any){
    return this.httpClient.get(environment.api_url +'/admission/membership?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getMembershipInformation(personId:any){
    return this.httpClient.get(environment.api_url +'/admission/membership/person?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postMembershipInformation(applicantEducationalInformation: ApplicantEducationalInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(applicantEducationalInformation);
    return this.httpClient.post(environment.api_url +'/admission/membership', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putMembershipInformation(applicantEducationalInformation: ApplicantEducationalInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(applicantEducationalInformation);
    return this.httpClient.put<any>(environment.api_url +'/admission/membership?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteMembershipInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/membership',
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
