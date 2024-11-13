import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionFaq} from "../../../model/admission/admission-setup/admissionFaq";
@Injectable({
  providedIn: 'root',
})
export class AdmissionProgramSeatService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getProgramSeat(semesterId:any){
    return this.httpClient.get(environment.api_url +'/admission/program/seat?semesterId='+semesterId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getProgramSeatActive(){
    return this.httpClient.get(environment.api_url +'/admission/program/seat/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postProgramSeat(admissionFaq: AdmissionFaq){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionFaq);
    return this.httpClient.post(environment.api_url +'/admission/program/seat', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putProgramSeat(admissionFaq: AdmissionFaq, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionFaq);
    return this.httpClient.put<any>(environment.api_url +'/admission/program/seat?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteProgramSeat(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/program/seat',
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
