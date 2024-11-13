import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {BankInformation} from "../../model/student/bankInformation";
@Injectable({
  providedIn: 'root',
})
export class StudentBankInformationService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getBankInformation(personId:any){
    return this.httpClient.get(environment.api_url +'/student/bank/information?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postBankInformation(bankInformation: BankInformation){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(bankInformation);
    return this.httpClient.post(environment.api_url +'/student/bank/information', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putBankInformation(bankInformation: BankInformation, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(bankInformation);
    return this.httpClient.put<any>(environment.api_url +'/student/bank/information?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteBankInformation(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/bank/information',
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
