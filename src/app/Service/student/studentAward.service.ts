import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Award} from "../../model/student/award";
@Injectable({
  providedIn: 'root',
})
export class StudentAwardService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAward(personId:any){
    return this.httpClient.get(environment.api_url +'/student/award?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAward(award: Award){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(award);
    return this.httpClient.post(environment.api_url +'/student/award', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAward(award: Award, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(award);
    return this.httpClient.put<any>(environment.api_url +'/student/award?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAward(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/award',
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
