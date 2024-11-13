import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {ApplicantFamily} from "../../../model/admission/applicantInformation/applicantFamily";
import {ApplicantGroupInsurance} from "../../../model/admission/applicantInformation/applicantGroupInsurance";
@Injectable({
  providedIn: 'root',
})
export class ApplicantGroupInsuranceService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getGroupInsurance(personId:any){
    return this.httpClient.get(environment.api_url +'/admission/group/insurance?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postGroupInsurance(applicantGroupInsurance: ApplicantGroupInsurance){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(applicantGroupInsurance);
    return this.httpClient.post(environment.api_url +'/admission/group/insurance', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putGroupInsurance(applicantGroupInsurance: ApplicantGroupInsurance, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(applicantGroupInsurance);
    return this.httpClient.put<any>(environment.api_url +'/admission/group/insurance?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteGroupInsurance(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/group/insurance',
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
