import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {PersonInformation} from "../../model/student/personInformation";
@Injectable({
  providedIn: 'root',
})
export class PersonInformationService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getPersonInformation(){

    return this.httpClient.get(environment.api_url +'/student/person').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getPersonInformationPagination(name:any, size:number, page:number){
    return this.httpClient.get(environment.api_url +'/student/person/pagination?name='+name+'&size='+size+ '&page=' +page).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getViewPersonInformation(id: any){
    return this.httpClient.get(environment.api_url +'/student/person/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postPersonInformation(personInformation: PersonInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(personInformation);
    return this.httpClient.post(environment.api_url +'/student/person', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putPersonInformation(employeeInformation: PersonInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(employeeInformation);
    return this.httpClient.put<any>(environment.api_url +'/student/person?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deletePersonInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/person',
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
