import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {
  AdmissionTemplateCategorySubject
} from "../../../model/admission/admission-test/admissionTemplateCategorySubject";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTemplateCategorySubjectService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTemplateCategorySubject(){
    return this.httpClient.get(environment.api_url +'/admission/test/template/category/subject').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTemplateCategorySubjectView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/template/category/subject/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTemplateCategorySubjectActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/template/category/subject/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTemplateCategorySubject(admissionTemplateCategorySubject: AdmissionTemplateCategorySubject){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTemplateCategorySubject);
    return this.httpClient.post(environment.api_url +'/admission/test/template/category/subject', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTemplateCategorySubject(admissionTemplateCategorySubject: AdmissionTemplateCategorySubject, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTemplateCategorySubject);
    return this.httpClient.put<any>(environment.api_url +'/admission/test/template/category/subject?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTemplateCategorySubject(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test/template/category/subject',
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
