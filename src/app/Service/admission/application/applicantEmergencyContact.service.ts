import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {ApplicantEmergencyContact} from "../../../model/admission/applicantInformation/applicantEmergencyContact";
@Injectable({
  providedIn: 'root',
})
export class ApplicantEmergencyContactService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  private localGuardianUpdated = new BehaviorSubject<boolean>(false);
  localGuardianUpdated$ = this.localGuardianUpdated.asObservable();
  notifyLocalGuardianUpdate() {
    this.localGuardianUpdated.next(true);
  }
  getEmergencyContact(personId:any){
    return this.httpClient.get(environment.api_url +'/admission/emergency/contact?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postEmergencyContact(applicantEmergencyContact: ApplicantEmergencyContact){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(applicantEmergencyContact);
    return this.httpClient.post(environment.api_url +'/admission/emergency/contact', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putEmergencyContact(applicantEmergencyContact: ApplicantEmergencyContact, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(applicantEmergencyContact);
    return this.httpClient.put<any>(environment.api_url +'/admission/emergency/contact?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteEmergencyContact(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/emergency/contact',
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
