import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {EmergencyContact} from "../../model/student/emergencyContact";
@Injectable({
  providedIn: 'root',
})
export class StudentEmergencyContactService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getEmergencyContact(personId:any){
    return this.httpClient.get(environment.api_url +'/student/emergency/contact?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postEmergencyContact(emergencyContact: EmergencyContact){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(emergencyContact);
    return this.httpClient.post(environment.api_url +'/student/emergency/contact', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putEmergencyContact(emergencyContact: EmergencyContact, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(emergencyContact);
    return this.httpClient.put<any>(environment.api_url +'/student/emergency/contact?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteEmergencyContact(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/emergency/contact',
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
