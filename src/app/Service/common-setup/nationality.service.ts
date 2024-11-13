import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Nationality} from "../../model/common-setup/nationality";
@Injectable({
  providedIn: 'root',
})
export class NationalityService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService)  {}
  getNationality(){
    return this.httpClient.get(environment.api_url +'/admission/nationality').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getNationalityActive(){
    return this.httpClient.get(environment.api_url +'/admission/nationality/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postNationality(nationality: Nationality){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(nationality);
    return this.httpClient.post(environment.api_url +'/admission/nationality', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putNationality(nationality: Nationality, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(nationality);
    return this.httpClient.put<any>(environment.api_url +'/admission/nationality?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteNationality(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/nationality',
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
