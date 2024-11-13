import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Proficiency} from "../../model/common-setup/proficiency";
@Injectable({
  providedIn: 'root',
})
export class ProficiencyService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getProficiency(){
    return this.httpClient.get(environment.api_url +'/proficiency').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getRelationActive(){
    return this.httpClient.get(environment.api_url +'/proficiency/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postProficiency(proficiency: Proficiency){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(proficiency);
    return this.httpClient.post(environment.api_url +'/proficiency', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putProficiency(proficiency: Proficiency, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(proficiency);
    return this.httpClient.put<any>(environment.api_url +'/proficiency?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteProficiency(id:any){
    return this.httpClient.delete(
      environment.api_url +'/proficiency',
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
