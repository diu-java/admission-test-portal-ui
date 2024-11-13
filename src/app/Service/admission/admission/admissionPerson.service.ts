import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {catchError, Observable, of} from "rxjs";
import {
  ApplicantEducationalInformation
} from "../../../model/admission/applicantInformation/applicantEducationalInformation";
import {AdmissionPerson} from "../../../model/admission/admission/admissionPerson";

@Injectable({
  providedIn: 'root',
})
export class AdmissionPersonService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getAdmissionPerson(admissionApplicationId:any){
    return this.httpClient.get(environment.api_url +'/admission/person/application?admissionApplicationId='+
      admissionApplicationId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message !== null ? error.error.message : error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }
  postAdmissionPersonInformation(admissionPerson: AdmissionPerson){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(admissionPerson);
    return this.httpClient.post(environment.api_url +'/admission/person', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true)
    }))
  }
  putAdmissionPersonInformation(admissionPerson: AdmissionPerson, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(admissionPerson);
    return this.httpClient.put<any>(environment.api_url +'/admission/person?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(true);
    }))
  }
}
