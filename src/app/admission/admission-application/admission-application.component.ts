import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AdmissionApplicationService} from "../../Service/admission/admission/admissionApplication.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SemesterService} from "../../Service/academic/institute/semester.service";
import {AdmissionCircularService} from "../../Service/admission/admission-circular/admissionCircular.service";
import {ProgramService} from "../../Service/academic/institute/program.service";
import {AdmissionIntakeService} from "../../Service/admission/admission-setup/admissionIntake.service";

@Component({
  selector: 'app-admission-application',
  templateUrl: './admission-application.component.html',
  styleUrls: ['./admission-application.component.css']
})
export class AdmissionApplicationComponent implements OnInit{
  applicationCode:any='';
  search:any='';
  status:any=1;
  admission_applications:any=[];
  semesters:any=[];
  programs:any=[];
  admission_intakes:any=[];
  admission_circulars:any=[];
  semesterCode:any='';
  programCode:any='';
  intakeCode:any='';
  admissionCircularCode:any='';
  p: number = 0;
  total: number = 0;
  size:number = 20;
  loading:boolean = false;
  constructor( private service: AdmissionApplicationService, private router: Router, private programService: ProgramService, private admissionIntakeService: AdmissionIntakeService,
               private toastr: ToastrService, private semesterService: SemesterService, private admissionCircularService: AdmissionCircularService,
               private titleService: Title) {
    this.titleService.setTitle('Admission Application')
  }
  ngOnInit() {

    this.getSemester();
    this.getProgram();
    this.getAdmissionIntake();
    this.getAdmissionCircular();
    sessionStorage.removeItem('modelData');
    const searchAdmissionApplications = this.service.getAdmissionApplicationSearch();
    if(searchAdmissionApplications){
      const {semesterCode, programCode, intakeCode, status, applicationCode, search, size, p} = searchAdmissionApplications;
      this.semesterCode = semesterCode  || '';
      this.programCode = programCode  || '';
      this.intakeCode = intakeCode  || '';
      this.status = status  || '';
      this.applicationCode = applicationCode  || '';
      this.search = search  || '';
      this.size = size  || 20;
      this.p = p  || 0;
      // this.service.getAdmissionApplicationPagination(semesterCode, programCode,intakeCode, status, applicationCode, search, size, p).subscribe((response:any)=>{
      //   this.admission_applications = response?.data?.content;
      //   this.total = response?.data?.totalElements;
      // })
    }
    this.getAdmissionApplicationPagination();
  }

  getSemester(){
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
      this.semesters.unshift({name:'All',code:''})
    })
  }
  getProgram(){
    this.programService.getProgramActive().subscribe((response:any)=>{
      this.programs = response.data;
      this.programs.unshift({name:'All',code:''})
    })
  }
  getAdmissionIntake(){
    this.admissionIntakeService.getAdmissionIntakeActive().subscribe((response:any)=>{
      this.admission_intakes = response.data;
      this.admission_intakes.unshift({name:'All',code:''})
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

    if(this.semesterCode === null || this.semesterCode === undefined){
      this.semesterCode = '';
    }
    if(this.programCode === null || this.programCode === undefined){
      this.programCode = '';
    }
    if(this.intakeCode === null || this.intakeCode === undefined){
      this.intakeCode = '';
    }
    if(this.status === null || this.status === undefined){
      this.status = 1;
    }
    // this.p = page;
      const searchAdmissionApplication = {semesterCode: this.semesterCode, programCode: this.programCode, intakeCode: this.intakeCode, status: this.status, applicationCode: this.applicationCode, search: this.search, size: this.size, p: this.p};
      this.service.seatAdmissionApplicationSearch(searchAdmissionApplication)
      this.loading = true;
      this.service.getAdmissionApplicationPagination(searchAdmissionApplication.semesterCode, searchAdmissionApplication.programCode,searchAdmissionApplication.intakeCode, searchAdmissionApplication.status, searchAdmissionApplication.applicationCode, searchAdmissionApplication.search, searchAdmissionApplication.size, searchAdmissionApplication.p).subscribe((response) => {
        this.loading = false;
        if (response.status === true) {
          this.admission_applications = response?.data?.content;
          this.total = response?.data?.totalElements;
        }else {
          this.loading = false;
          this.admission_applications = [];
          this.total = 0;
        }
      })
  }

  // getAdmissionApplicationPagination(page:any) {
  //   if(this.semesterCode === null || this.semesterCode === undefined){
  //     this.semesterCode = '';
  //   }
  //   if(this.programCode === null || this.programCode === undefined){
  //     this.programCode = '';
  //   }
  //   if(this.intakeCode === null || this.intakeCode === undefined){
  //     this.intakeCode = '';
  //   }
  //   if(this.status === null || this.status === undefined){
  //     this.status = 1;
  //   }
  //   this.p = page;
  //   const searchAdmissionApplication = {semesterCode: this.semesterCode, programCode: this.programCode, intakeCode: this.intakeCode, status: this.status, applicationCode: this.applicationCode, search: this.search, size: this.size, p: this.p};
  //   this.service.seatAdmissionApplicationSearch(searchAdmissionApplication)
  //   this.service.getAdmissionApplicationPagination(searchAdmissionApplication.semesterCode, searchAdmissionApplication.programCode,searchAdmissionApplication.intakeCode, searchAdmissionApplication.status, searchAdmissionApplication.applicationCode, searchAdmissionApplication.search, searchAdmissionApplication.size, searchAdmissionApplication.p).subscribe((response) => {
  //     if (response.status === true) {
  //       this.admission_applications = response?.data?.content;
  //       this.total = response?.data?.totalElements;
  //     }else {
  //       this.admission_applications = [];
  //       this.total = 0;
  //     }
  //   })
  // }
  getAdmissionApplicationPaginationSearch(){
    this.p = 0;
    this.getAdmissionApplicationPagination();
  }
  pageChangeEvent(event: any) {
    this.p = event-1;
    this.getAdmissionApplicationPagination();
  }

  onKeydownAdmissionApplicationPaginationSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getAdmissionApplicationPaginationSearch();
    }
  }
}
