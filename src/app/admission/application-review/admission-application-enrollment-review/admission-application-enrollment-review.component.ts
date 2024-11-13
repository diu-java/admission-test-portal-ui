import {Component, OnInit} from '@angular/core';
import {AdmissionApplicationService} from "../../../Service/admission/admission/admissionApplication.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {AdmissionCircularService} from "../../../Service/admission/admission-circular/admissionCircular.service";

@Component({
  selector: 'app-admission-application-selected-admission',
  templateUrl: './admission-application-enrollment-review.component.html',
  styleUrls: ['./admission-application-enrollment-review.component.css']
})
export class AdmissionApplicationEnrollmentReviewComponent implements OnInit{
  code:any='';
  search:any='';
  status:any=3;
  admission_applications:any=[];
  semesters:any=[];
  admission_circulars:any=[];
  semesterCode:any='';
  admissionCircularCode:any='';
  p: number = 0;
  total: number = 0;
  size:number = 10;
  constructor( private service: AdmissionApplicationService, private router: Router,
               private toastr: ToastrService, private semesterService: SemesterService, private admissionCircularService: AdmissionCircularService,
               private titleService: Title) {
    this.titleService.setTitle('Admission Application')
  }
  ngOnInit() {
    this.getAdmissionApplicationPagination();
    this.getSemester();
    this.getAdmissionCircular();
  }
  getSemester(){
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
      this.semesters.unshift({name:'All',code:''})
    })
  }

  getAdmissionCircular() {
    this.admissionCircularService.getAdmissionCircularActive().subscribe((response:any)=>{
      this.admission_circulars = response.data;
      this.admission_circulars.unshift({name:'All',code:''})
    })
  }

  viewApplication(admission_application: any) {
    this.router.navigate(['/admission-application-form', admission_application.id]);
  }

  getAdmissionApplicationPagination() {
    this.service.getAdmissionApplicationQueue(this.semesterCode, this.admissionCircularCode, this.code, this.search, this.status, this.size, this.p).subscribe((response) => {
      this.admission_applications = response.data.content;
      this.total = response.data.totalElements;
      if (!response.data.content.length) {
        this.toastr.warning('No Data Found')
      }
    })
  }

  pageChangeEvent(event: any) {
    this.p = event-1;
    this.getAdmissionApplicationPagination();
  }
}
