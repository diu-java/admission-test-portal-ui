import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {AddressInformation} from "../../model/student/addressInformation";
@Injectable({
  providedIn: 'root',
})
export class StudentAddressInformationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAddressInformation(personId:any){
    return this.httpClient.get(environment.api_url +'/student/address/information?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAddressInformation(addressInformation: AddressInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(addressInformation);
    return this.httpClient.post(environment.api_url +'/student/address/information', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAddressInformation(addressInformation: AddressInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(addressInformation);
    return this.httpClient.put<any>(environment.api_url +'/student/address/information?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAddressInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/address/information',
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
