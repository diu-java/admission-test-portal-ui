import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionStudyCampus} from "../../../model/admission/admission-setup/admissionStudyCampus";
@Injectable({
  providedIn: 'root',
})
export class AdmissionStudyCampusService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getStudyCampus(){
    return this.httpClient.get(environment.api_url +'/study/campus').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getStudyCampusActive(){
    return this.httpClient.get(environment.api_url +'/study/campus/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postStudyCampus(admissionStudyCampus: AdmissionStudyCampus){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionStudyCampus);
    return this.httpClient.post(environment.api_url +'/study/campus', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putStudyCampus(admissionStudyCampus: AdmissionStudyCampus, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionStudyCampus);
    return this.httpClient.put<any>(environment.api_url +'/study/campus?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteStudyCampus(id:any){
    return this.httpClient.delete(
      environment.api_url +'/study/campus',
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
