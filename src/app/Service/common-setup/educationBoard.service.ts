import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {EducationBoard} from "../../model/common-setup/educationBoard";
@Injectable({
  providedIn: 'root',
})
export class EducationBoardService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getEducationBoard(degreeId:any){
    return this.httpClient.get(environment.api_url +'/admission/education/board?degreeId='+degreeId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  getEducationBoardActive(degreeId:any){
    return this.httpClient.get(environment.api_url +'/admission/education/board/active?degreeId='+degreeId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 404){
        console.log(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postEducationBoard(educationBoard: EducationBoard){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(educationBoard);
    return this.httpClient.post(environment.api_url +'/admission/education/board', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putEducationBoard(educationBoard: EducationBoard, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(educationBoard);
    return this.httpClient.put<any>(environment.api_url +'/admission/education/board?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteEducationBoard(id:any){
    return this.httpClient.delete(
      environment.api_url +'/admission/education/board',
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
