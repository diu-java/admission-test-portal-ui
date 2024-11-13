import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AdmissionUserService} from "../../Service/admission/admission/admissionUser.service";

@Component({
  selector: 'app-admission-user',
  templateUrl: './admission-user.component.html',
  styleUrls: ['./admission-user.component.css']
})
export class AdmissionUserComponent implements OnInit{
  searchCode:any='';
  admission_users:any=[];
  constructor( private service: AdmissionUserService, private titleService: Title) {
    this.titleService.setTitle('Admission User')
  }
  ngOnInit() {
    this.getPersonPagination();
  }

  getPersonPagination() {
    this.service.getAdmissionUser().subscribe((response:any)=>{
      this.admission_users = response.data;
    })
  }
}
