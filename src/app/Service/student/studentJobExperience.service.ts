import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {JobExperience} from "../../model/student/jobExperience";
@Injectable({
  providedIn: 'root',
})
export class StudentJobExperienceService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getJobExperience(personId:any){
    return this.httpClient.get(environment.api_url +'/student/job/experience?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postJobExperience(jobExperience: JobExperience){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(jobExperience);
    return this.httpClient.post(environment.api_url +'/student/job/experience', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putJobExperience(jobExperience: JobExperience, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(jobExperience);
    return this.httpClient.put<any>(environment.api_url +'/student/job/experience?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteJobExperience(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/job/experience',
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
