import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root',
})
export class ShiftService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getShift(){
    return this.httpClient.get(environment.api_url +'/shift').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.statusText);
      }
      return of();
    }));
  }
  getShiftActive(){
    return this.httpClient.get(environment.api_url +'/shift/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.statusText);
      }
      return of();
    }));
  }

  deleteShift(id:any){
    return this.httpClient.delete(
      environment.api_url +'/shift',
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
