import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root',
})
export class CampusService{
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  getCampus(){
    return this.httpClient.get(environment.api_url +'/campus');
  }
  getCampusActive(){
    return this.httpClient.get(environment.api_url +'/campus/active');
  }


  deleteCampus(id: any) {
    return this.httpClient.delete(
      environment.api_url +'/campus',
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
        this.toastr.error(error.error.error);
      }
      return of();
    }));
  }
}
