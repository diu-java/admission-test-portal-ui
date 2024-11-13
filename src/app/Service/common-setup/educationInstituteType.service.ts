import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {EducationInstituteType} from "../../model/common-setup/educationInstituteType";
@Injectable({
  providedIn: 'root',
})
export class EducationInstituteTypeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService)  {}
  getEducationInstituteType(){
    return this.httpClient.get(environment.api_url +'/admission/education/institute/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getEducationInstituteTypeActive(){
    return this.httpClient.get(environment.api_url +'/admission/education/institute/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getEducationInstituteTypeFind(id:any){
    return this.httpClient.get(environment.api_url +'/admission/education/institute/type/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  postEducationInstituteType(educationInstituteType: EducationInstituteType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(educationInstituteType);
    return this.httpClient.post(environment.api_url +'/admission/education/institute/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putEducationInstituteType(educationInstituteType: EducationInstituteType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(educationInstituteType);
    return this.httpClient.put<any>(environment.api_url +'/admission/education/institute/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteEducationInstituteType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/education/institute/type',
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
