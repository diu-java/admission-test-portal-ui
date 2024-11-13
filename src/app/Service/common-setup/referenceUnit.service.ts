import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {AddressType} from "../../model/common-setup/addressType";
import {ReferenceUnit} from "../../model/common-setup/referenceUnit";
@Injectable({
  providedIn: 'root',
})
export class ReferenceUnitService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getReferenceUnit(referenceId:any){
    return this.httpClient.get(environment.api_url +'/commonsetup/reference/unit?referenceId='+referenceId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getReferenceUnitActive(referenceId:any){
    return this.httpClient.get(environment.api_url +'/commonsetup/reference/unit/active?referenceId='+referenceId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getReferenceUnitFind(id:any){
    return this.httpClient.get(environment.api_url +'/commonsetup/reference/unit/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postReferenceUnit(referenceUnit: ReferenceUnit){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(referenceUnit);
    return this.httpClient.post(environment.api_url +'/commonsetup/reference/unit', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putReferenceUnit(referenceUnit: ReferenceUnit, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(referenceUnit);
    return this.httpClient.put<any>(environment.api_url +'/commonsetup/reference/unit?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteReferenceUnit(id:any){
    return this.httpClient.delete(
      environment.api_url +'/commonsetup/reference/unit',
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
