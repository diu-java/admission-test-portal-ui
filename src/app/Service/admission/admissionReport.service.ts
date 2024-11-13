import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class AdmissionReportService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionReport(semesterCode:any,programCode:any, intakeCode:any, enrollmentTypeCode:any){
    return this.httpClient.get(environment.api_url +'/admission/application/report?semesterCode='+semesterCode+'&programCode='+programCode+'&intakeCode='+intakeCode+'&enrollmentTypeCode='+enrollmentTypeCode).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }
  setSearchAdmissionReport(params: any) {
    sessionStorage.setItem('searchAdmissionReports', JSON.stringify(params));
  }
  getSearchAdmissionReport(): any {
    const paramsString = sessionStorage.getItem('searchAdmissionReports');
    return paramsString ? JSON.parse(paramsString) : null;
  }
  getAdmissionReportAdmitCard(semesterCode:any,programCode:any, intakeCode:any){
    return this.httpClient.get(environment.api_url +'/admission/application/report/admit/card?semesterCode='+semesterCode+'&programCode='+programCode+'&intakeCode='+intakeCode).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }
  setSearchAdmissionReportAdmitCard(params: any) {
    sessionStorage.setItem('searchAdmissionAdmitCardReports', JSON.stringify(params));
  }
  getSearchAdmissionReportAdmitCard(): any {
    const paramsString = sessionStorage.getItem('searchAdmissionAdmitCardReports');
    return paramsString ? JSON.parse(paramsString) : null;
  }
  getAdmissionReportDateWise(startDate:any, endDate:any, semesterCode:any,programCode:any, intakeCode:any, enrollmentTypeCode:any){
    return this.httpClient.get(environment.api_url +'/admission/application/report/date?startDate='+startDate+'&endDate='+endDate+'&semesterCode='+semesterCode+'&programCode='+programCode+'&intakeCode='+intakeCode+'&enrollmentTypeCode='+enrollmentTypeCode).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }
  setSearchAdmissionReportDateWise(params: any) {
    sessionStorage.setItem('searchDateWiseAdmissionReports', JSON.stringify(params));
  }
  getSearchAdmissionReportDateWise(): any {
    const paramsString = sessionStorage.getItem('searchDateWiseAdmissionReports');
    return paramsString ? JSON.parse(paramsString) : null;
  }
  getAdmissionDashboardAdmission(){
    return this.httpClient.get(environment.api_url +'/admission/dashboard/admission').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionDashboardAdmissionToday(){
    return this.httpClient.get(environment.api_url +'/admission/dashboard/admission/today').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionDashboardAdmissionForm(){
    return this.httpClient.get(environment.api_url +'/admission/dashboard/admission/form').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getAdmissionDashboardAdmissionFormToday(){
    return this.httpClient.get(environment.api_url +'/admission/dashboard/admission/form/today').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
}
