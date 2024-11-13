import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionIntake} from "../../../model/admission/admission-setup/admissionIntake";
@Injectable({
  providedIn: 'root',
})
export class AdmissionIntakeService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionIntake(){
    return this.httpClient.get(environment.api_url +'/admission/intake').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionIntakeActive(){
    return this.httpClient.get(environment.api_url +'/admission/intake/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionIntake(admissionIntake: AdmissionIntake){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionIntake);
    return this.httpClient.post(environment.api_url +'/admission/intake', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionIntake(admissionIntake: AdmissionIntake, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionIntake);
    return this.httpClient.put<any>(environment.api_url +'/admission/intake?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionIntake(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/intake',
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
