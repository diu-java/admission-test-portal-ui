import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionExam} from "../../../model/admission/admission-exam/admissionExam";
@Injectable({
  providedIn: 'root',
})
export class AdmissionExamService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionExam(semesterCode:any, facultyCode:any, size:number, page:number){
    return this.httpClient.get(environment.api_url +'/admission/exam?semesterCode='+semesterCode+'&facultyCode='+facultyCode+'&size='+size+ '&page=' +page).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewAdmissionExam(id:any){
    return this.httpClient.get(environment.api_url +'/admission/exam/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message !== null ? error.error.message : error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  getAdmissionExamActive(semesterCode:any, facultyCode:any){
    return this.httpClient.get(environment.api_url +'/admission/exam/active?semesterCode='+semesterCode+'&facultyCode='+facultyCode).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionExam(admissionExam: AdmissionExam){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionExam);
    return this.httpClient.post(environment.api_url +'/admission/exam', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionExam(admissionExam: AdmissionExam, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionExam);
    return this.httpClient.put<any>(environment.api_url +'/admission/exam?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionExam(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/exam',
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
  setAdmissionExamSession(params: any) {
    sessionStorage.setItem('searchAdmissionExams', JSON.stringify(params));
  }
  getAdmissionExamSession(){
    const paramsString = sessionStorage.getItem('searchAdmissionExams');
    return paramsString ? JSON.parse(paramsString) : null;
  }
}
