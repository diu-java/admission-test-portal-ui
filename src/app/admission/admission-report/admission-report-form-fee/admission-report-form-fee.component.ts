import {Component, OnInit} from '@angular/core';
import {AdmissionApplicationService} from "../../../Service/admission/admission/admissionApplication.service";
import {Router} from "@angular/router";
import {ProgramService} from "../../../Service/academic/institute/program.service";
import {AdmissionIntakeService} from "../../../Service/admission/admission-setup/admissionIntake.service";
import {ToastrService} from "ngx-toastr";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {AdmissionCircularService} from "../../../Service/admission/admission-circular/admissionCircular.service";
import {AdmissionApplyTypeService} from "../../../Service/admission/admission-setup/admissionApplyType.service";
import {Title} from "@angular/platform-browser";
import {AdmissionReportService} from "../../../Service/admission/admissionReport.service";

@Component({
  selector: 'app-admission-report-form-fee',
  templateUrl: './admission-report-form-fee.component.html',
  styleUrls: ['./admission-report-form-fee.component.css']
})
export class AdmissionReportFormFeeComponent implements OnInit{
  search:any='';
  paymentStatus:any=1;
  admission_applications:any=[];
  semesters:any=[];
  programs:any=[];
  admission_intakes:any=[];
  application_types:any=[];
  admission_circulars:any=[];
  admission_reports:any=[];
  semesterCode:any='';
  programCode:any='';
  intakeCode:any='';
  startDate:any='';
  endDate:any='';
  applicationTypeCode:any='';
  admissionCircularCode:any='';
  p: number = 0;
  total: number = 0;
  size:number = 20;
  constructor(private service: AdmissionApplicationService, private router: Router, private programService: ProgramService, private admissionIntakeService: AdmissionIntakeService,
              private toastr: ToastrService, private semesterService: SemesterService, private admissionCircularService: AdmissionCircularService,
              private admissionApplyTypeService: AdmissionApplyTypeService,
              private admissionReportService: AdmissionReportService,
              private titleService: Title) {
  }
  ngOnInit() {
    this.getSemester();
    this.getDateConversion();
  }
  getDateConversion(){
    const today = new Date();
    this.startDate = today.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
  }
  getSemester(){
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
      this.semesters.unshift({name:'All',code:''})
    })
  }

  getAdmissionReport() {
    this.admission_reports = [];
    if(this.semesterCode){
      // this.admissionReportService.getAdmissionReport().subscribe((response:any)=>{
      //   this.admission_reports = response.data;
      // })
    }else {
      this.toastr.error('Invalid Semester')
    }
  }
}
