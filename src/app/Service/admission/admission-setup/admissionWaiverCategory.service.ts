import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";

import {AdmissionWaiverCategory} from "../../../model/admission/admission-setup/admissionWaiverCategory";
@Injectable({
  providedIn: 'root',
})
export class AdmissionWaiverCategoryService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getWaiverCategory(){
    return this.httpClient.get(environment.api_url +'/commonsetup/waiver/category').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getWaiverCategoryActive(){
    return this.httpClient.get(environment.api_url +'/commonsetup/waiver/category/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postWaiverCategory(admissionWaiverCategory: AdmissionWaiverCategory){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionWaiverCategory);
    return this.httpClient.post(environment.api_url +'/commonsetup/waiver/category', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putWaiverCategory(admissionWaiverCategory: AdmissionWaiverCategory, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionWaiverCategory);
    return this.httpClient.put<any>(environment.api_url +'/commonsetup/waiver/category?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteWaiverCategory(id:any){
    return this.httpClient.delete(
      environment.api_url +'/commonsetup/waiver/category',
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
