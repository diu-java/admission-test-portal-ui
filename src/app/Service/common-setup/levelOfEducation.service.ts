import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {LevelOfEducation} from "../../model/common-setup/levelOfEducation";
@Injectable({
  providedIn: 'root',
})
export class LevelOfEducationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getLevelOfEducation(){
    return this.httpClient.get(environment.api_url +'/level/of/education').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getRelationActive(){
    return this.httpClient.get(environment.api_url +'/level/of/education/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postLevelOfEducation(levelOfEducation: LevelOfEducation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(levelOfEducation);
    return this.httpClient.post(environment.api_url +'/level/of/education', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putLevelOfEducation(levelOfEducation: LevelOfEducation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(levelOfEducation);
    return this.httpClient.put<any>(environment.api_url +'/level/of/education?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteLevelOfEducation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/level/of/education',
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
