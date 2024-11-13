import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {VisaInformation} from "../../model/student/visaInformation";
@Injectable({
  providedIn: 'root',
})
export class StudentVisaInformationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getVisaInformation(personId:any){
    return this.httpClient.get(environment.api_url +'/student/visa/information?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postVisaInformation(visaInformation: VisaInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(visaInformation);
    return this.httpClient.post(environment.api_url +'/student/visa/information', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putVisaInformation(visaInformation: VisaInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(visaInformation);
    return this.httpClient.put<any>(environment.api_url +'/student/visa/information?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteVisaInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/visa/information',
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
