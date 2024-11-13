import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {AddressType} from "../../model/common-setup/addressType";
import {SkillLearnBy} from "../../model/common-setup/skillLearnBy";
@Injectable({
  providedIn: 'root',
})
export class SkillLearnByService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getSkillLearnBy(){
    return this.httpClient.get(environment.api_url +'/skill/learned/by').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.error: error.error.message) ;
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAddressTypeActive(){
    return this.httpClient.get(environment.api_url +'/skill/learned/by/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postSkillLearnBy(skillLearnBy: SkillLearnBy){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(skillLearnBy);
    return this.httpClient.post(environment.api_url +'/skill/learned/by', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putSkillLearnBy(skillLearnBy: SkillLearnBy, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(skillLearnBy);
    return this.httpClient.put<any>(environment.api_url +'/skill/learned/by?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteSkillLearnBy(id:any){
    return this.httpClient.delete(
      environment.api_url +'/skill/learned/by',
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
