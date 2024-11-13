import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionChooseOption} from "../../../model/admission/admission-setup/admissionChooseOption";
import {AdmissionApplication} from "../../../model/admission/admission/admissionApplication";
@Injectable({
  providedIn: 'root',
})
export class AdmissionApplicationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionApplication(){
    return this.httpClient.get(environment.api_url +'/admission/application').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionFullForm(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/application/full/pdf?admissionApplicationId='+admissionApplicationId, { responseType: 'blob' }).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionShortForm(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/application/short/pdf?admissionApplicationId='+admissionApplicationId, { responseType: 'blob' }).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  submitAdmissionApplication(admissionApplication: AdmissionApplication){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionApplication);
    return this.httpClient.post(environment.api_url +'/admission/application/submit', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  cancelAdmissionApplication(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/application/cancel?admissionApplicationId='+admissionApplicationId, { responseType: 'blob' }).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionApplicationPagination(semesterCode:any,programCode:any, intakeCode:any, status:any, applicationCode:any, search:any, size:number, page:number){
    return this.httpClient.get(environment.api_url +'/admission/application?semesterCode='+semesterCode+'&programCode='+programCode+'&intakeCode='+intakeCode+'&applicationCode='+applicationCode+'&search='+search+'&status='+status+'&size='+size+ '&page=' +page).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }

  getAdmissionApplicationQueue(semesterCode:any, circularCode:any, code:any, search:any, status:any, size:number, page:number){
    return this.httpClient.get(environment.api_url +'/admission/application/queue?semesterCode='+semesterCode+'&circularCode='+circularCode+'&code='+code+'&search='+search+'&status='+status+'&size='+size+ '&page=' +page).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionApplicationUser(){
    return this.httpClient.get(environment.api_url +'/admission/application/user').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewAdmissionApplication(id:any){
    return this.httpClient.get(environment.api_url +'/admission/application/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message !== null ? error.error.message : error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }
  postAdmissionApplication(admissionApplication: AdmissionApplication){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionApplication);
    return this.httpClient.post(environment.api_url +'/admission/application', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionApplication(admissionApplication: AdmissionApplication, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionApplication);
    return this.httpClient.put<any>(environment.api_url +'/admission/application?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }

  // Session Storage
  seatAdmissionApplicationSearch(params:any){
    sessionStorage.setItem('admissionApplicationSession', JSON.stringify(params));
  }
  getAdmissionApplicationSearch(){
    const paramsString = sessionStorage.getItem('admissionApplicationSession');
    return paramsString ? JSON.parse(paramsString) : null;
  }
}
