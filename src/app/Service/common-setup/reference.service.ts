import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {AddressType} from "../../model/common-setup/addressType";
import {Reference} from "../../model/common-setup/reference";
@Injectable({
  providedIn: 'root',
})
export class ReferenceService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getReference(){
    return this.httpClient.get(environment.api_url +'/commonsetup/reference').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getReferenceFind(id:any){
    return this.httpClient.get(environment.api_url +'/commonsetup/reference/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getReferenceActive(){
    return this.httpClient.get(environment.api_url +'/commonsetup/reference/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postReference(reference: Reference){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(reference);
    return this.httpClient.post(environment.api_url +'/commonsetup/reference', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putReference(reference: Reference, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(reference);
    return this.httpClient.put<any>(environment.api_url +'/commonsetup/reference?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteReference(id:any){
    return this.httpClient.delete(
      environment.api_url +'/commonsetup/reference',
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
