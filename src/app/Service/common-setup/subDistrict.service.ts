import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {SubDistrict} from "../../model/common-setup/subDistrict";
@Injectable({
  providedIn: 'root',
})
export class SubDistrictService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getSubDistrict(cityId:any){
    return this.httpClient.get(environment.api_url +'/sub/district?cityId='+cityId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getSubDistrictActive(cityId:any){
    return this.httpClient.get(environment.api_url +'/sub/district/active?cityId='+cityId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postSubDistrict(subDistrict: SubDistrict){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(subDistrict);
    return this.httpClient.post(environment.api_url +'/sub/district', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putSubDistrict(subDistrict: SubDistrict, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(subDistrict);
    return this.httpClient.put<any>(environment.api_url +'/sub/district?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteSubDistrict(id:any){
    return this.httpClient.delete(
      environment.api_url +'/sub/district',
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
