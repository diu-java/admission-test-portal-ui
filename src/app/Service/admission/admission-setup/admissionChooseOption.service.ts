import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionChooseOption} from "../../../model/admission/admission-setup/admissionChooseOption";
@Injectable({
  providedIn: 'root',
})
export class AdmissionChooseOptionService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getChooseOption(){
    return this.httpClient.get(environment.api_url +'/admission/choose/option').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getChooseOptionActive(){
    return this.httpClient.get(environment.api_url +'/admission/choose/option/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postChooseOption(admissionChooseOption: AdmissionChooseOption){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionChooseOption);
    return this.httpClient.post(environment.api_url +'/admission/choose/option', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putChooseOption(admissionChooseOption: AdmissionChooseOption, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionChooseOption);
    return this.httpClient.put<any>(environment.api_url +'/admission/choose/option?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteChooseOption(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/choose/option',
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
