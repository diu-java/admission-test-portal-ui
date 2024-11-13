import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {State} from "../../model/common-setup/state";
@Injectable({
  providedIn: 'root',
})
export class StateService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getState(countryId:any){
    return this.httpClient.get(environment.api_url +'/state?countryId='+countryId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getStateActive(countryId:any){
    return this.httpClient.get(environment.api_url +'/state/active?countryId='+countryId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postState(state: State){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(state);
    return this.httpClient.post(environment.api_url +'/state', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putState(state: State, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(state);
    return this.httpClient.put<any>(environment.api_url +'/state?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteState(id:any){
    return this.httpClient.delete(
      environment.api_url +'/state',
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
