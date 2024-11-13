import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {AddressType} from "../../model/common-setup/addressType";
@Injectable({
  providedIn: 'root',
})
export class AddressTypeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAddressType(){
    return this.httpClient.get(environment.api_url +'/address/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAddressTypeActive(){
    return this.httpClient.get(environment.api_url +'/address/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAddressType(addressType: AddressType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(addressType);
    return this.httpClient.post(environment.api_url +'/address/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAddressType(addressType: AddressType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(addressType);
    return this.httpClient.put<any>(environment.api_url +'/address/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAddressType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/address/type',
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
