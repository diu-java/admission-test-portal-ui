import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {SkillCategory} from "../../model/common-setup/skillCategory";
@Injectable({
  providedIn: 'root',
})
export class SkillCategoryService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getSkillCategory(){
    return this.httpClient.get(environment.api_url +'/skill/category').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getSkillCategoryActive(){
    return this.httpClient.get(environment.api_url +'/skill/category/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postSkillCategory(skillCategory: SkillCategory){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(skillCategory);
    return this.httpClient.post(environment.api_url +'/skill/category', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putSkillCategory(skillCategory: SkillCategory, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(skillCategory);
    return this.httpClient.put<any>(environment.api_url +'/skill/category?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteSkillCategory(id:any){
    return this.httpClient.delete(
      environment.api_url +'/skill/category',
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
