import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class SyllabusTemplateService{
  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  getSyllabusTemplate(programId:any){
    return this.httpClient.get(environment.api_url +'/student/syllabus/template?programId='+
      programId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getSyllabusTemplateActive(programId:any){
    return this.httpClient.get(environment.api_url +'/student/syllabus/template/active?programId='+
      programId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getSyllabusTemplateOverview(id:any){
    return this.httpClient.get(environment.api_url +'/student/syllabus/template/overview?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

        if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }




  deleteSyllabusTemplate(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/syllabus/template',
      {
        params: {
          id: id,
        },
      }
    ).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else if(error.status === 403){
        this.toastr.error("You are not authorized");
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewSyllabusTemplate(id:any){
    return this.httpClient.get(environment.api_url +'/student/syllabus/template/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else if(error.status === 403){
        this.toastr.error("You are not authorized");
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  // Approval Log
  getSyllabusTemplateApprovalLog(syllabusTemplateId:any){
    return this.httpClient.get(environment.api_url +'/student/syllabus/approval/log?syllabusTemplateId='+
      syllabusTemplateId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getSyllabusTemplateApprovalLogActive(syllabusTemplateId:any){
    return this.httpClient.get(environment.api_url +'/student/syllabus/approval/log/active?syllabusTemplateId='+
      syllabusTemplateId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }


}
