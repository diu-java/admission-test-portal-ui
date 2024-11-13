import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTestCategory} from "../../../model/admission/admission-test/admissionTestCategory";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestCategoryService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTestCategory(){
    return this.httpClient.get(environment.api_url +'/admission/test/category').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestCategoryView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/category/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestCategoryActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/category/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTestCategory(admissionTestCategory: AdmissionTestCategory){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTestCategory);
    return this.httpClient.post(environment.api_url +'/admission/test/category', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTestCategory(admissionTestCategory: AdmissionTestCategory, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTestCategory);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/category?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTestCategory(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/category',
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
