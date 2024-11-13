import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {catchError, Observable, of} from "rxjs";
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";
import {AdmissionCircularProgram} from "../../../model/admission/admission-circular/admissionCircularProgram";

@Injectable({
  providedIn: 'root',
})
export class AdmissionCircularProgramService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getAdmissionCircularProgram(admissionCircularId:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/program?admissionCircularId='+admissionCircularId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getAdmissionCircularProgramActive(){
    return this.httpClient.get(environment.api_url +'/admission/circular/program/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getViewAdmissionCircularProgram(id:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/program/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }
  getAdmissionCircularProgramCircular(admissionCircularId:any){
    return this.httpClient.get(environment.api_url +'/admission/circular/program?admissionCircularId='+
      admissionCircularId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }

  postAdmissionCircularProgram(admissionCircularProgram: AdmissionCircularProgram){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionCircularProgram);
    return this.httpClient.post(environment.api_url +'/admission/circular/program', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionCircularProgram(admissionCircularProgram: AdmissionCircularProgram, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionCircularProgram);
    return this.httpClient.put<any>(environment.api_url +'/admission/circular/program?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{

      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
  deleteAdmissionCircularProgram(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/circular/program',
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
