import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {EducationInstitute} from "../../model/common-setup/educationInstitute";
@Injectable({
  providedIn: 'root',
})
export class EducationInstituteService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService)  {}
  getEducationInstitute(levelOfEducationId:any){
    return this.httpClient.get(environment.api_url +'/admission/education/institute?levelOfEducationId='+levelOfEducationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        // this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
        console.log(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }
  getEducationInstitutePagination(search:any, size:any, page:any){
    return this.httpClient.get(environment.api_url +'/admission/education/institute/search?search='+search+'&size='+size+'&page='+page).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getEducationInstituteActive(){
    return this.httpClient.get(environment.api_url +'/admission/education/institute/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getEducationInstituteFind(id:any){
    return this.httpClient.get(environment.api_url +'/admission/education/institute/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  postEducationInstitute(educationInstitute: EducationInstitute){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(educationInstitute);
    return this.httpClient.post(environment.api_url +'/admission/education/institute', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putEducationInstitute(educationInstitute: EducationInstitute, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(educationInstitute);
    return this.httpClient.put<any>(environment.api_url +'/admission/education/institute?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteEducationInstitute(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/education/institute',
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
