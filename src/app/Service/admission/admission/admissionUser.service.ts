import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionChooseOption} from "../../../model/admission/admission-setup/admissionChooseOption";
@Injectable({
  providedIn: 'root',
})
export class AdmissionUserService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionUser(){
    return this.httpClient.get(environment.api_url +'/admission/user').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
}
