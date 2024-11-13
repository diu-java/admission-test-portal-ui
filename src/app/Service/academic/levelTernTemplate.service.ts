import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
@Injectable({
  providedIn: 'root',
})

export class LevelTernTemplateService{
  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  getLevelTermTemplate(programId:any){
    return this.httpClient.get(environment.api_url +'/levelterm/template?programId='+programId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }));
  }
  getLevelTermTemplateActive(programId:any){
    return this.httpClient.get(environment.api_url +'/levelterm/template/active?programId='+programId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.statusText);
      }
      return of();
    }));
  }
  getLevelTermTemplatePagination(programId: any, page:number, size:number){
    return this.httpClient.get(environment.api_url +'/levelterm/template/pagination?programId='+programId+'&page='+page+ '&size=' +size).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.statusText);
      }
      return of();
    }));
  }

  getViewLevelTermTemplate(id:any){
    return this.httpClient.get(environment.api_url +'/levelterm/template/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.statusText);
      return of();
    }));
  }
  deleteLevelTermTemplate(id:any){
    return this.httpClient.delete(
      environment.api_url +'/levelterm/template',
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
}
