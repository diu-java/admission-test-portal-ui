import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {AdmissionMarkDistribution} from "../../../model/admission/admission-exam/admissionMarkDistribution";

@Injectable({
  providedIn: 'root',
})
export class AdmissionMarkDistributionService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionMarkDistribution(admissionMarkTemplateId:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/distribution?admissionMarkTemplateId='+admissionMarkTemplateId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionMarkDistributionActive(admissionMarkTemplateId:any){
    return this.httpClient.get(environment.api_url +'/admission/mark/distribution/active?admissionMarkTemplateId='+admissionMarkTemplateId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postAdmissionMarkDistribution(admissionMarkDistribution: AdmissionMarkDistribution){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionMarkDistribution);
    return this.httpClient.post(environment.api_url +'/admission/mark/distribution', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putAdmissionMarkDistribution(admissionMarkDistribution: AdmissionMarkDistribution, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionMarkDistribution);
    return this.httpClient.put<any>(environment.api_url +'/admission/mark/distribution?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteAdmissionMarkDistribution(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/mark/distribution',
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
