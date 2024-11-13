import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
@Injectable({
  providedIn: 'root',
})
export class ApplicantDocumentService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  postDocument(file:File, personId:any, name:any,moduleName:any){
    const body=JSON.stringify(document);
    const formData=new FormData();
    formData.append('file',file,file.name);
    return this.httpClient.post(environment.api_url +'/admission/document?personId='+personId+'&name='+name+'&moduleName='+moduleName, formData).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }
  postDocumentUpload(file:File, personId:any, refName:any,recordName:any, recordId:any, name:any,moduleName:any){
    const body=JSON.stringify(document);
    const formData=new FormData();
    formData.append('file',file,file.name);
    return this.httpClient.post(environment.api_url +'/admission/document/upload?personId='+personId+'&refName='+refName+'&recordName='+recordName+'&recordId='+recordId+'&name='+name+'&moduleName='+moduleName, formData).pipe(catchError((error:any, caught:Observable<any>):Observable<any> =>{
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }))
  }

  getDocument(code: any){
    return this.httpClient.get(environment.api_url +'/admission/document/find?code='+code, { responseType: 'blob' }).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 404){
        this.toastr.warning(error.error.message !== null ? error.error.message: error.error.error);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(null);
    }));
  }
  getDocumentPhoto(code: any){
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream'
    });
    return this.httpClient.get(environment.api_url + '/admission/document/find?code=' + code, { headers, responseType: 'arraybuffer' })
      .pipe(
        catchError((error: any, caught: Observable<any>): Observable<any> => {
          if (error.status === 404) {
            this.toastr.warning(error.error.message !== null ? error.error.message : error.error.error);
          } else {
            this.toastr.error(error.error.error);
          }
          return of(null);
        }),
        map((response: ArrayBuffer) => {
          const binary = new Uint8Array(response).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
          return btoa(binary);
        })
      );
  }

  getScanner(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set to application/x-www-form-urlencoded
      'Accept': '*/*', // Optional but can be set
    });

    const body = {"id":"654489992","method":"IfAllowLocalCache","module":"dwt","version":"dwt_18500312","parameter":[true]};
    return this.httpClient.post('http://127.0.0.1:18622/f/IfAllowLocalCache',JSON.stringify(body), {headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of()
    }));
  }

  private isOpenFormViewSource = new BehaviorSubject<boolean>(false);
  isOpenFormView$ = this.isOpenFormViewSource.asObservable();
  setOpenFormView(status: boolean) {
    this.isOpenFormViewSource.next(status);
  }


}
