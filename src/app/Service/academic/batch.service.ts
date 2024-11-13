import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {Batch} from "../../model/admission/admission-setup/batch";
@Injectable({
  providedIn: 'root',
})
export class BatchService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }
  getBatchPagination(programCode: any, semesterCode:any, size:number, page:number){
    return this.httpClient.get(environment.api_url +'/batch/pagination?programCode='+programCode+'&semesterCode='+semesterCode+'&size='+size+ '&page=' +page).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getBatch(programId: any){
    return this.httpClient.get(environment.api_url +'/batch?programId='+programId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
  getBatchSearch(semesterId:any, programId: any){
    return this.httpClient.get(environment.api_url +'/batch/search?semesterId='+semesterId+'&programId='+programId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getViewBatch(id:any){
    return this.httpClient.get(environment.api_url +'/batch/find?id='+
      id).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }));
  }
  postBatch(batch:Batch){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(batch);
    return this.httpClient.post(environment.api_url +'/batch',body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      // this.toastr.error(error.error.error);
      // return of(true);
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else if(error.status === 403){
        this.toastr.error("You are not authorized");
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  putBatch(batch:Batch, id:any){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(batch);
    return this.httpClient.put<any>(environment.api_url +'/batch?id='+id, body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      // this.toastr.error(error.error.error);
      // return of(true);
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else if(error.status === 403){
        this.toastr.error("You are not authorized");
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteBatch(id:any){
    return this.httpClient.delete(
      environment.api_url +'/batch',
      {
        params: {
          id: id,
        },
      }
    ).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else if(error.status === 403){
        this.toastr.error("You are not authorized");
      }else{
        this.toastr.error(error.statusText);
      }
      return of();
    }));
  }
  setSearchBatches(params: any) {
    sessionStorage.setItem('searchBatches', JSON.stringify(params));
  }
  getSearchBatches(): any {
    const paramsString = sessionStorage.getItem('searchBatches');
    return paramsString ? JSON.parse(paramsString) : null;
  }

}
