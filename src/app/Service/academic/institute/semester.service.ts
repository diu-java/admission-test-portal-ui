import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root',
})
export class SemesterService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getSemester(){
    return this.httpClient.get(environment.api_url +'/semester').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getSemesterActive(){
    return this.httpClient.get(environment.api_url +'/semester/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getViewSemester(id:any){
    return this.httpClient.get(environment.api_url +'/semester/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.statusText);
      return of();
    }));
  }
  deleteSemester(id:any){
    return this.httpClient.delete(
      environment.api_url +'/semester',
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
