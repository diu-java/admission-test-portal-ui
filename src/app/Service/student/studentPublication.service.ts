import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Publication} from "../../model/student/publication";
@Injectable({
  providedIn: 'root',
})
export class StudentPublicationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getPublication(personId:any){
    return this.httpClient.get(environment.api_url +'/student/publication?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postPublication(publication: Publication){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(publication);
    return this.httpClient.post(environment.api_url +'/student/publication', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putPublication(publication: Publication, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(publication);
    return this.httpClient.put<any>(environment.api_url +'/student/publication?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deletePublication(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/publication',
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
