import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
import {StudentSkill} from "../../model/student/studentSkill";
@Injectable({
  providedIn: 'root',
})
export class StudentSkillService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getStudentSkill(personId:any){
    return this.httpClient.get(environment.api_url +'/student/skill?personId='+personId).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }

  postStudentSkill(studentSkill: StudentSkill){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(studentSkill);
    return this.httpClient.post(environment.api_url +'/student/skill', body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  putStudentSkill(studentSkill: StudentSkill, id:any){
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(studentSkill);
    return this.httpClient.put<any>(environment.api_url +'/student/skill?id='+id,body,{'headers':headers}).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }))
  }
  deleteStudentSkill(id:any){
    return this.httpClient.delete(
      environment.api_url +'/student/skill',
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
