import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {EducationalInformation} from "../../model/student/educationalInformation";
@Injectable({
  providedIn: 'root',
})
export class StudentEducationalInformationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getEducationalInformation(personId:any){
    return this.httpClient.get(environment.api_url +'/student/educational/information?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postEducationalInformation(educationalInformation: EducationalInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(educationalInformation);
    return this.httpClient.post(environment.api_url +'/student/educational/information', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putEducationalInformation(educationalInformation: EducationalInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(educationalInformation);
    return this.httpClient.put<any>(environment.api_url +'/student/educational/information?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteEducationalInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/educational/information',
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
