import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {catchError, Observable, of} from "rxjs";
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";
import {
  AdmissionCircularEducationLevel
} from "../../../model/admission/admission-circular/admissionCircularEducationLevel";

@Injectable({
  providedIn: 'root',
})
export class AdmissionCircularEducationLevelService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  getAdmissionCircularEducationLevel(admissionCircularId:any) {
    return this.httpClient.get(environment.api_url + '/admission/circular/education/level?admissionCircularId='+admissionCircularId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if (error.status === 404) {
        this.toastr.warning(error.error.message !== null ? error.error.message : error.error.error);
      } else {
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionCircularEducationLevelActive() {
    return this.httpClient.get(environment.api_url + '/admission/circular/education/level/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if (error.status === 404) {
        this.toastr.warning(error.error.message !== null ? error.error.message : error.error.error);
      } else {
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewAdmissionCircularEducationLevel(id:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/education/level/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message !== null ? error.error.message : error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }
  postAdmissionCircularEducationLevel(admissionCircularEducationLevel: AdmissionCircularEducationLevel){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionCircularEducationLevel);
    return this.httpClient.post(environment.api_url +'/admission/circular/education/level', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionCircularEducationLevel(admissionCircularEducationLevel: AdmissionCircularEducationLevel, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionCircularEducationLevel);
    return this.httpClient.put<any>(environment.api_url +'/admission/circular/education/level?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionCircularEducationLevel(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/circular/education/level',
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
