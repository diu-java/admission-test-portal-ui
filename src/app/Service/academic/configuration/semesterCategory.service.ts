import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environment/environment";
import {catchError, Observable, of} from "rxjs";
import {SemesterCategory} from "../../../model/academic/configuration/semesterCategory";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export class SemesterCategoryService{
  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) {}

  getSemesterCategory(){
    return this.httpClient.get(environment.api_url +'/semester/category').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.error.error);
      return of();
    }));
  }
  getSemesterCategoryActive(){
    return this.httpClient.get(environment.api_url +'/semester/category/active').pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.toastr.error(error.error.error);
      return of();
    }));
  }
  postSemesterCategory(semesterCategory:SemesterCategory){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(semesterCategory);
    return this.httpClient.post(environment.api_url +'/semester/category',body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {

      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  putSemesterCategory(semesterCategory:SemesterCategory, id:any){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(semesterCategory);
    return this.httpClient.put<any>(environment.api_url +'/semester/category?id='+id, body, {'headers':headers}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      if(error.status === 406){
        this.toastr.warning(error.error.message);
      }else{
        this.toastr.error(error.error.error);
      }
      return of(error.error);
    }))
  }
  deleteSemesterCategory(id:any){
    return this.httpClient.delete(
      environment.api_url +'/semester/category',
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
      return of(error.error);
    }));
  }
}
