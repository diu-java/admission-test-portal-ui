import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {City} from "../../model/common-setup/city";
@Injectable({
  providedIn: 'root',
})
export class CityService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getCity(stateId:any){
    return this.httpClient.get(environment.api_url +'/city?stateId='+stateId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getCityActive(stateId:any){
    return this.httpClient.get(environment.api_url +'/city/active?stateId='+stateId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postCity(city: City){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(city);
    return this.httpClient.post(environment.api_url +'/city', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putCity(city: City, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(city);
    return this.httpClient.put<any>(environment.api_url +'/city?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteCity(id:any){
    return this.httpClient.delete(
      environment.api_url +'/city',
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
