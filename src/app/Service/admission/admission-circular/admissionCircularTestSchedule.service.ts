import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {catchError, Observable, of} from "rxjs";
import {AdmissionAffiliateOrganization} from "../../../model/admission/admission-setup/admissionAffiliateOrganization";
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";
import {AdmissionCircularTestSchedule} from "../../../model/admission/admission-circular/admissionCircularTestSchedule";

@Injectable({
  providedIn: 'root',
})
export class AdmissionCircularTestScheduleService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getAdmissionCircularTestSchedule(admissionCircularId:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/test/schedule?admissionCircularId='+admissionCircularId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionCircularTestScheduleActive(){
    return this.httpClient.get(environment.api_url +'/admission/circular/test/schedule/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewAdmissionCircularTestSchedule(id:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/test/schedule/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  postAdmissionCircularTestSchedule(admissionCircular: AdmissionCircular){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionCircular);
    return this.httpClient.post(environment.api_url +'/admission/circular/test/schedule', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionCircularTestSchedule(admissionCircularTestSchedule: AdmissionCircularTestSchedule, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionCircularTestSchedule);
    return this.httpClient.put<any>(environment.api_url +'/admission/circular/test/schedule?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionCircularTestSchedule(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/circular/test/schedule',
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
