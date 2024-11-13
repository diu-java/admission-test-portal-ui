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
import {
  AdmissionEnrollmentTypeService
} from "../../../Service/admission/admission-setup/admissionEnrollmentType.service";
import {AdmissionReportService} from "../../../Service/admission/admissionReport.service";
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-admission-report-date-wise',
  templateUrl: './admission-report-date-wise.component.html',
  styleUrls: ['./admission-report-date-wise.component.css']
})
export class AdmissionReportDateWiseComponent implements OnInit{
  search:any='';
  paymentStatus:any=1;
  admission_applications:any=[];
  semesters:any=[];
  programs:any=[];
  admission_intakes:any=[];
  enrollment_types:any=[];
  admission_circulars:any=[];
  admission_reports:any=[];
  semesterCode:any='';
  programCode:any='';
  intakeCode:any='';
  startDate:any='';
  endDate:any='';
  enrollmentTypeCode:any='';
  admissionCircularCode:any='';
  p: number = 0;
  total: number = 0;
  size:number = 20;
  loading:boolean = false;
  constructor(private programService: ProgramService, private admissionIntakeService: AdmissionIntakeService,
              private toastr: ToastrService, private semesterService: SemesterService,
              private admissionEnrollmentTypeService: AdmissionEnrollmentTypeService,
              private admissionReportService: AdmissionReportService,
              private titleService: Title) {
  }
  ngOnInit() {
    this.getSemester();
    this.getProgram();
    this.getAdmissionIntake();
    this.getEnrollmentType();
    this.getDateConversion();
    const searchAdmissionReports = this.admissionReportService.getSearchAdmissionReportDateWise();
    if(searchAdmissionReports){
      const {startDate,endDate, semesterCode, programCode, intakeCode, enrollmentTypeCode} = searchAdmissionReports;
      this.startDate = startDate  || '';
      this.endDate = endDate  || '';
      this.semesterCode = semesterCode  || '';
      this.programCode = programCode  || '';
      this.intakeCode = intakeCode  || '';
      this.enrollmentTypeCode = enrollmentTypeCode  || '';
      this.loading = true;
      this.admissionReportService.getAdmissionReportDateWise(startDate + 'T00:00:00', endDate + 'T23:59:59', semesterCode, programCode,intakeCode, enrollmentTypeCode).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.admission_reports = response.data;
        }else {
          this.loading = false;
        }
      })
    }
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
  getEnrollmentType(){
    this.admissionEnrollmentTypeService.getAdmissionEnrollmentTypeActive().subscribe((response:any)=>{
      this.enrollment_types = response.data;
      this.enrollment_types.unshift({name:'All',code:''})
    })
  }
  exportToExcel(): void {
    const element: HTMLElement = document.getElementById('excel-table') as HTMLElement;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const today = new Date();
    const formattedDate = today.getFullYear() + '-' +
      ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + today.getDate()).slice(-2);
    const range = XLSX.utils.decode_range(ws['!ref']!);
    const colWidths:any= [];

    for (let C = range.s.c; C <= range.e.c; ++C) {
      let maxWidth = 5;
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = ws[cellRef];
        if (cell && cell.v) {
          const cellValue = cell.v.toString();
          const cellLength = cellValue.length;
          maxWidth = Math.max(maxWidth, cellLength);
        }
      }
      colWidths.push({ wch: maxWidth + 2 });
    }

    ws['!cols'] = colWidths;

    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C })
        const cell = ws[cellRef];
        if (cell) {
          if (cell.t === 'n') {
            const date = new Date((cell.v - 25569) * 86400 * 1000);
            if (cell.z === 'm/d/yy') {
              cell.t = 's';
              cell.v = date.toLocaleDateString();
            } else if(cell.v.toString().length > 6){
              cell.t = 's';
              cell.v = "0" + cell.v.toString();
            }else{
              cell.t = 's';
              cell.v = cell.v.toString();
            }
          }
        }
      }
    }

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Admission Report - Date Wise');
    XLSX.writeFile(wb, 'Admission Report - Date Wise '+formattedDate+'.xlsx');
  }
  getAdmissionReport() {
    this.loading = true;
    this.admission_reports = [];
    const searchAdmissionAReport = {startDate: this.startDate, endDate: this.endDate,semesterCode: this.semesterCode, programCode: this.programCode, intakeCode: this.intakeCode, enrollmentTypeCode: this.enrollmentTypeCode};
    this.admissionReportService.setSearchAdmissionReportDateWise(searchAdmissionAReport)
    if(this.startDate && this.endDate){
      this.admissionReportService.getAdmissionReportDateWise(searchAdmissionAReport.startDate + 'T00:00:00', searchAdmissionAReport.endDate + 'T23:59:59', searchAdmissionAReport.semesterCode, searchAdmissionAReport.programCode, searchAdmissionAReport.intakeCode, searchAdmissionAReport.enrollmentTypeCode).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.admission_reports = response.data;
        }else {
          this.loading = false;
        }
      });
    }else {
      this.loading = false;
      this.toastr.error('Invalid Start Date or End Date')
    }
  }
}
