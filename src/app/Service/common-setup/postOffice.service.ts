import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {AddressType} from "../../model/common-setup/addressType";
import {PostOffice} from "../../model/common-setup/postOffice";
@Injectable({
  providedIn: 'root',
})
export class PostOfficeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getPostOffice(subDistrictId:any){
    return this.httpClient.get(environment.api_url +'/admission/post/office?subDistrictId='+subDistrictId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getPostOfficeActive(subDistrictId:any){
    return this.httpClient.get(environment.api_url +'/admission/post/office/active?subDistrictId='+subDistrictId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postPostOffice(postOffice: PostOffice){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(postOffice);
    return this.httpClient.post(environment.api_url +'/admission/post/office', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putPostOffice(postOffice: PostOffice, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(postOffice);
    return this.httpClient.put<any>(environment.api_url +'/admission/post/office?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deletePostOffice(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/post/office',
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
