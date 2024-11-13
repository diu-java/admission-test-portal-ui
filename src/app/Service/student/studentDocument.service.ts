import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class StudentDocumentService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}


  postDocument(file:File, personId:any, name:any,moduleName:any){
    const body=JSON.stringify(document);
    const formData=new FormData();
    formData.append('file',file,file.name);
    return this.httpClient.post(environment.api_url +'/student/document?personId='+personId+'&name='+name+'&moduleName='+moduleName, formData).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  getDocument(code: any){
    return this.httpClient.get(environment.api_url +'/student/document/find?code='+code, { responseType: 'blob' }).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }


}
