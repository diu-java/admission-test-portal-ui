import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {catchError, Observable, of} from "rxjs";
import {AdmissionAffiliateOrganization} from "../../../model/admission/admission-setup/admissionAffiliateOrganization";
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";

@Injectable({
  providedIn: 'root',
})
export class AdmissionCircularService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getAdmissionCircular(){
    return this.httpClient.get(environment.api_url +'/admission/circular').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionCircularActive(){
    return this.httpClient.get(environment.api_url +'/admission/circular/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewAdmissionCircular(id:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  postAdmissionCircular(admissionCircular: AdmissionCircular){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionCircular);
    return this.httpClient.post(environment.api_url +'/admission/circular', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionCircular(admissionCircular: AdmissionCircular, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionCircular);
    return this.httpClient.put<any>(environment.api_url +'/admission/circular?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionCircular(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/circular',
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
