import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionTest} from "../../../model/admission/admission-test/admissionTest";
@Injectable({
  providedIn: 'root',
})
export class AdmissionTestService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionTest(){
    return this.httpClient.get(environment.api_url +'/admission/test').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionTestView(id:any){
    return this.httpClient.get(environment.api_url +'/admission/test/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionTestActive(){
    return this.httpClient.get(environment.api_url +'/admission/test/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionTest(admissionTest: AdmissionTest){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionTest);
    return this.httpClient.post(environment.api_url +'/admission/test', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionTest(admissionTest: AdmissionTest, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionTest);
    return this.httpClient.put<any>(environment.api_url +'/admission/test?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionTest(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/test',
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
  getAdmissionTestSession(){
    const paramsString = sessionStorage.getItem('searchAdmissionTests');
    return paramsString ? JSON.parse(paramsString) : null;
  }
}
