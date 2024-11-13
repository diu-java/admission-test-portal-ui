import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {ReferenceUnit} from "../../model/common-setup/referenceUnit";
@Injectable({
  providedIn: 'root',
})
export class ReferenceSubUnitService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getReferenceSubUnit(referenceUnitId:any){
    return this.httpClient.get(environment.api_url +'/commonsetup/reference/sub/unit?referenceUnitId='+referenceUnitId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getReferenceSubUnitActive(referenceUnitId:any){
    return this.httpClient.get(environment.api_url +'/commonsetup/reference/sub/unit/active?referenceUnitId='+referenceUnitId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postReferenceSubUnit(referenceUnit: ReferenceUnit){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(referenceUnit);
    return this.httpClient.post(environment.api_url +'/commonsetup/reference/sub/unit', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putReferenceSubUnit(referenceUnit: ReferenceUnit, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(referenceUnit);
    return this.httpClient.put<any>(environment.api_url +'/commonsetup/reference/sub/unit?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteReferenceSubUnit(id:any){
    return this.httpClient.delete(
      environment.api_url +'/commonsetup/reference/sub/unit',
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
