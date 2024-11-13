import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Degree} from "../../model/common-setup/degree";
@Injectable({
  providedIn: 'root',
})
export class DegreeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getDegree(levelOfEducationId:any){
    return this.httpClient.get(environment.api_url +'/degree?levelOfEducationId='+levelOfEducationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getDegreeActive(levelOfEducationId:any){
    return this.httpClient.get(environment.api_url +'/degree/active?levelOfEducationId='+levelOfEducationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postDegree(degree: Degree){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(degree);
    return this.httpClient.post(environment.api_url +'/degree', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{

      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putDegree(degree: Degree, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(degree);
    return this.httpClient.put<any>(environment.api_url +'/degree?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteDegree(id:any){
    return this.httpClient.delete(
      environment.api_url +'/degree',
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
