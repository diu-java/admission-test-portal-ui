import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Family} from "../../model/student/family";
@Injectable({
  providedIn: 'root',
})
export class StudentFamilyService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getFamily(personId:any){
    return this.httpClient.get(environment.api_url +'/student/family?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postFamily(family: Family){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(family);
    return this.httpClient.post(environment.api_url +'/student/family', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putFamily(family: Family, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(family);
    return this.httpClient.put<any>(environment.api_url +'/student/family?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteFamily(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/family',
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