import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {BloodGroup} from "../../model/common-setup/bloodGroup";
@Injectable({
  providedIn: 'root',
})
export class BloodGroupService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getBloodGroup(){
    return this.httpClient.get(environment.api_url +'/blood/group').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getBloodGroupActive(){
    return this.httpClient.get(environment.api_url +'/blood/group/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postBloodGroup(bloodGroup: BloodGroup){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(bloodGroup);
    return this.httpClient.post(environment.api_url +'/blood/group', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putBloodGroup(bloodGroup: BloodGroup, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(bloodGroup);
    return this.httpClient.put<any>(environment.api_url +'/blood/group?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteBloodGroup(id:any){
    return this.httpClient.delete(
      environment.api_url +'/blood/group',
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
