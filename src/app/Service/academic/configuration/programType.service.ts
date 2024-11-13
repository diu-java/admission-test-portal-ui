import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ProgramType} from "../../../model/academic/configuration/programType";
import {environment} from "../../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class ProgramTypeService {
  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  getProgramType(){
    return this.httpClient.get(environment.api_url +'/program/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.error.error);
      return of();
    }));
  }
  getProgramTypeActive(){
    return this.httpClient.get(environment.api_url +'/program/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  postProgramType(programType: ProgramType){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(programType);
    return this.httpClient.post(environment.api_url +'/program/type',body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  putProgramType(programType: ProgramType, id:any){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(programType);
    return this.httpClient.put<any>(environment.api_url +'/program/type?id='+id, body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  deleteProgramType(id: any) {
    return this.httpClient.delete(
      environment.api_url +'/program/type',
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
      return of(error.error);
    }));
  }

}
