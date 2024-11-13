import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {StudentInformation} from "../../model/student/studentInformation";
@Injectable({
  providedIn: 'root',
})
export class StudentInformationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getStudentInformation(personId:any){
    return this.httpClient.get(environment.api_url +'/student/information/serach/person?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  postStudentInformation(studentInformation: StudentInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(studentInformation);
    return this.httpClient.post(environment.api_url +'/student/information', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putStudentInformation(studentInformation: StudentInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(studentInformation);
    return this.httpClient.put<any>(environment.api_url +'/student/information?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  getStudentInformationSearch(studentId: any){
    return this.httpClient.get(environment.api_url +'/student/information/search?studentId='+studentId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else if(error.status === 406){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }
  getViewStudentInformation(id: any){
    return this.httpClient.get(environment.api_url +'/student/information/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  deleteStudentInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/information',
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
