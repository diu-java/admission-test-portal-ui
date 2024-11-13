import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {EmployeeInformation} from "../../model/employee/employeeInformation";
@Injectable({
  providedIn: 'root',
})
export class EmployeeInformationService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getEmployeeInformation(){
    return this.httpClient.get(environment.api_url +'/admission/employee/information').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getEmployeeInformationPagination(name:any, size:number, page:number){
    return this.httpClient.get(environment.api_url +'/admission/employee/information/pagination?name='+name+'&size='+size+ '&page=' +page).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getEmployeeInformationActive(){
    return this.httpClient.get(environment.api_url +'/employee/information/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewEmployeeInformation(id: any){
    return this.httpClient.get(environment.api_url +'/admission/employee/information/find?id='+id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postEmployeeInformation(employeeInformation: EmployeeInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(employeeInformation);
    return this.httpClient.post(environment.api_url +'/admission/employee/information', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putEmployeeInformation(employeeInformation: EmployeeInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(employeeInformation);
    return this.httpClient.put<any>(environment.api_url +'/admission/employee/information?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteEmployeeInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/employee/information',
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
