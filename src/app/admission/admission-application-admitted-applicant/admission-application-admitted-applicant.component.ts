import {Component, OnInit} from '@angular/core';
import {AdmissionApplicationService} from "../../Service/admission/admission/admissionApplication.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {SemesterService} from "../../Service/academic/institute/semester.service";
import {AdmissionCircularService} from "../../Service/admission/admission-circular/admissionCircular.service";

@Component({
  selector: 'app-admission-application-admitted-applicant',
  templateUrl: './admission-application-admitted-applicant.component.html',
  styleUrls: ['./admission-application-admitted-applicant.component.css']
})
export class AdmissionApplicationAdmittedApplicantComponent implements OnInit{
  code:any='';
  search:any='';
  status:any='';
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

  getAdmissionApplication() {
    this.service.getAdmissionApplication().subscribe((response:any)=>{
      this.admission_applications = response.data;
    })
  }
  getSemester(){
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
    })
  }

  getAdmissionCircular() {
    this.admissionCircularService.getAdmissionCircularActive().subscribe((response:any)=>{
      this.admission_circulars = response.data;
    })
  }

  viewApplication(admission_application: any) {
    this.router.navigate(['/admission-application-form', admission_application.id]);
  }

  getAdmissionApplicationPagination() {
    // this.service.getAdmissionApplicationPagination(this.semesterCode, this.admissionCircularCode, this.code, this.search, this.status, this.size, this.p).subscribe((response) => {
    //   this.admission_applications = response.data.content;
    //   this.total = response.data.totalElements;
    //   if (!response.data.content.length) {
    //     this.toastr.warning('No Data Found')
    //   }
    // })
  }

  pageChangeEvent(event: any) {
    this.p = event-1;
    this.getAdmissionApplicationPagination();
  }
}
