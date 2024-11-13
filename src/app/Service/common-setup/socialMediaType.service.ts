import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {SocialMediaType} from "../../model/common-setup/socialMediaType";
@Injectable({
  providedIn: 'root',
})
export class SocialMediaTypeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getSocialMediaType(){
    return this.httpClient.get(environment.api_url +'/social/media/type').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getSocialMediaTypeActive(){
    return this.httpClient.get(environment.api_url +'/social/media/type/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postSocialMediaType(socialMediaType: SocialMediaType){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(socialMediaType);
    return this.httpClient.post(environment.api_url +'/social/media/type', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error)
    }))
  }
  putSocialMediaType(socialMediaType: SocialMediaType, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(socialMediaType);
    return this.httpClient.put<any>(environment.api_url +'/social/media/type?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  deleteSocialMediaType(id:any){
    return this.httpClient.delete(
      environment.api_url +'/social/media/type',
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
