import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";
@Injectable({
  providedIn: 'root',
})
export class AdmissionApplyTypeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getApplyType(){
    return this.httpClient.get(environment.api_url +'/admission/apply/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getApplyTypeActive(){
    return this.httpClient.get(environment.api_url +'/admission/apply/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postApplyType(admissionApplicationType: AdmissionApplicationType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionApplicationType);
    return this.httpClient.post(environment.api_url +'/admission/apply/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putApplyType(admissionApplicationType: AdmissionApplicationType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionApplicationType);
    return this.httpClient.put<any>(environment.api_url +'/admission/apply/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteApplyType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/apply/type',
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