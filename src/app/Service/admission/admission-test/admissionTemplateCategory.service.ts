import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTemplateCategory} from "../../../model/admission/admission-test/admissionTemplateCategory";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTemplateCategoryService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTemplateCategory(){
    return this.httpClient.get(environment.api_url +'/admission/test/template/category').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTemplateCategoryView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/template/category/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTemplateCategoryActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/template/category/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTemplateCategory(admissionTemplateCategory: AdmissionTemplateCategory){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTemplateCategory);
    return this.httpClient.post(environment.api_url +'/admission/test/template/category', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTemplateCategory(admissionTemplateCategory: AdmissionTemplateCategory, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTemplateCategory);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/template/category?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTemplateCategory(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/template/category',
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
