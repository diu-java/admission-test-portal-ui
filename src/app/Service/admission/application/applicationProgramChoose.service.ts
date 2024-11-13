import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {ApplicationProgramChoose} from "../../../model/admission/applicantInformation/applicationProgramChoose";
@Injectable({
  providedIn: 'root',
})
export class ApplicationProgramChooseService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getApplicationProgramChoose(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/application/program/choose/active?admissionApplicationId='+admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postApplicationProgramChoose(applicationProgramChoose: ApplicationProgramChoose){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(applicationProgramChoose);
    return this.httpClient.post(environment.api_url +'/admission/application/program/choose/save', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }


}
