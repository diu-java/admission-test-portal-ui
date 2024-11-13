import {Component, OnInit} from '@angular/core';
import {StudentInformation} from "../../model/student/studentInformation";
import {ToastrService} from "ngx-toastr";
import {StudentInformationService} from "../../Service/student/studentInformation.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit{
  studentId:any;
  studentInformation:any = new StudentInformation();
  enableStudentInformation = false;
  loading = false;
  activeTab: number = 1;
  constructor(private toastr: ToastrService,
              private studentInformationService: StudentInformationService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Student Look Up')
  }
  ngOnInit() {
  }
  getStudentInformation() {
    this.loading = true;
    if(!this.studentId){
      this.loading = false;
      this.studentInformation = new StudentInformation();
      this.toastr.error('Student ID First');
    }else {
      this.studentInformation = new StudentInformation();
      this.studentInformationService.getStudentInformationSearch(this.studentId).subscribe((response:any)=>{
          this.loading = false;
          if(response.status){
            this.studentInformation = response.data;
            this.enableStudentInformation = true;
          }else if(response!==true){
            this.toastr.warning(response.message);
          }
        }
      )
    }
  }
  onKeydownStudentInformation(event: any) {
    if (event.key === "Enter") {
      this.getStudentInformation();
    }
  }
  activateTab(tabName: number) {
    this.getStudentInformation();
    this.activeTab = tabName;
    sessionStorage.setItem('activeTab', tabName.toString());
  }

  getProgressPercentage() {

  }
}
