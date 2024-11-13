import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {EducationBoard} from "../../model/common-setup/educationBoard";
import {EducationMajor} from "../../model/common-setup/educationMajor";
@Injectable({
  providedIn: 'root',
})
export class EducationMajorService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getEducationMajor(degreeId:any){
    return this.httpClient.get(environment.api_url +'/admission/education/major?degreeId='+degreeId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getEducationMajorActive(degreeId:any){
    return this.httpClient.get(environment.api_url +'/admission/education/major/active?degreeId='+degreeId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        console.log(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postEducationMajor(educationMajor: EducationMajor){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(educationMajor);
    return this.httpClient.post(environment.api_url +'/admission/education/major', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putEducationMajor(educationMajor: EducationMajor, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(educationMajor);
    return this.httpClient.put<any>(environment.api_url +'/admission/education/major?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteEducationMajor(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/education/major',
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
