import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {catchError, Observable, of} from "rxjs";
import {AdmissionCircularIntake} from "../../../model/admission/admission-circular/admissionCircularIntake";

@Injectable({
  providedIn: 'root',
})
export class AdmissionCircularIntakeService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getAdmissionCircularIntake(admissionCircularId:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/intake?admissionCircularId='+admissionCircularId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionCircularIntakeActive(admissionCircularId:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/intake/active?admissionCircularId='+admissionCircularId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewAdmissionCircularIntake(id:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/intake/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }
  getAdmissionCircularIntakeCircular(admissionCircularId:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/intake?admissionCircularId='+
      admissionCircularId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  postAdmissionCircularIntake(admissionCircularIntake: AdmissionCircularIntake){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionCircularIntake);
    return this.httpClient.post(environment.api_url +'/admission/circular/intake', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionCircularIntake(admissionCircularIntake: AdmissionCircularIntake, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionCircularIntake);
    return this.httpClient.put<any>(environment.api_url +'/admission/circular/intake?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionCircularIntake(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/circular/intake',
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
