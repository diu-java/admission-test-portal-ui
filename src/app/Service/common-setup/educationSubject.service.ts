import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {AddressType} from "../../model/common-setup/addressType";
import {PostOffice} from "../../model/common-setup/postOffice";
import {EducationSubject} from "../../model/common-setup/educationSubject";
@Injectable({
  providedIn: 'root',
})
export class EducationSubjectService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getEducationSubject(degreeId:any){
    return this.httpClient.get(environment.api_url +'/admission/education/subject?degreeId='+degreeId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getEducationSubjectActive(degreeId:any){
    return this.httpClient.get(environment.api_url +'/admission/education/subject/active?degreeId='+degreeId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        console.log(error.error.message);
        // this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }

  postEducationSubject(educationSubject: EducationSubject){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(educationSubject);
    return this.httpClient.post(environment.api_url +'/admission/education/subject', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putEducationSubject(educationSubject: EducationSubject, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(educationSubject);
    return this.httpClient.put<any>(environment.api_url +'/admission/education/subject?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteEducationSubject(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/education/subject',
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
