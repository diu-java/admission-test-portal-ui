import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {PassportInformation} from "../../model/student/passportInformation";
@Injectable({
  providedIn: 'root',
})
export class StudentPassportInformationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getPassportInformation(personId:any){
    return this.httpClient.get(environment.api_url +'/student/passport/information?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postPassportInformation(passportInformation: PassportInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(passportInformation);
    return this.httpClient.post(environment.api_url +'/student/passport/information', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putPassportInformation(passportInformation: PassportInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(passportInformation);
    return this.httpClient.put<any>(environment.api_url +'/student/passport/information?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deletePassportInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/passport/information',
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
