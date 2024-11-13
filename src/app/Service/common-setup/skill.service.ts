import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Skill} from "../../model/common-setup/skill";
@Injectable({
  providedIn: 'root',
})
export class SkillService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getSkill(skillCategoryId:any){
    return this.httpClient.get(environment.api_url +'/skill?skillCategoryId='+skillCategoryId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getBankActive(){
    return this.httpClient.get(environment.api_url +'/skill/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postSkill(skill: Skill){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(skill);
    return this.httpClient.post(environment.api_url +'/skill', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putSkill(skill: Skill, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(skill);
    return this.httpClient.put<any>(environment.api_url +'/skill?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteSkill(id:any){
    return this.httpClient.delete(
      environment.api_url +'/skill',
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
