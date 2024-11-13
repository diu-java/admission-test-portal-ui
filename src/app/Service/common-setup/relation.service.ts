import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Relation} from "../../model/common-setup/relation";
@Injectable({
  providedIn: 'root',
})
export class RelationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getRelation(){
    return this.httpClient.get(environment.api_url +'/relation').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getRelationActive(){
    return this.httpClient.get(environment.api_url +'/relation/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postRelation(relation: Relation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(relation);
    return this.httpClient.post(environment.api_url +'/relation', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putRelation(relation: Relation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(relation);
    return this.httpClient.put<any>(environment.api_url +'/relation?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteRelation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/relation',
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
