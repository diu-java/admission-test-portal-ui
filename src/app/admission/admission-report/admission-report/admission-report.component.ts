import {Component, OnInit} from '@angular/core';
import {ProgramService} from "../../../Service/academic/institute/program.service";
import {AdmissionIntakeService} from "../../../Service/admission/admission-setup/admissionIntake.service";
import {ToastrService} from "ngx-toastr";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {Title} from "@angular/platform-browser";
import {
  AdmissionEnrollmentTypeService
} from "../../../Service/admission/admission-setup/admissionEnrollmentType.service";
import {AdmissionReportService} from "../../../Service/admission/admissionReport.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-admission-report',
  templateUrl: './admission-report.component.html',
  styleUrls: ['./admission-report.component.css']
})
export class AdmissionReportComponent implements OnInit{
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
    const searchAdmissionReports = this.admissionReportService.getSearchAdmissionReport();
    if(searchAdmissionReports){
      const {semesterCode, programCode, intakeCode, enrollmentTypeCode} = searchAdmissionReports;
      this.semesterCode = semesterCode  || '';
      this.programCode = programCode  || '';
      this.intakeCode = intakeCode  || '';
      this.enrollmentTypeCode = enrollmentTypeCode  || '';
      this.loading = true;
      this.admissionReportService.getAdmissionReport(semesterCode, programCode,intakeCode, enrollmentTypeCode).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.admission_reports = response.data;
        }else {
          this.loading = false;
        }
      })
    }
  }

  getSemester(){
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
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
    XLSX.utils.book_append_sheet(wb, ws, 'Admission Report-Semester Wise');
    XLSX.writeFile(wb, 'Admission Report - Semester Wise '+formattedDate+'.xlsx');
  }
  getAdmissionReport() {
    this.loading = true;
    this.admission_reports = [];
    const searchAdmissionAReport = {semesterCode: this.semesterCode, programCode: this.programCode, intakeCode: this.intakeCode, enrollmentTypeCode: this.enrollmentTypeCode};
    this.admissionReportService.setSearchAdmissionReport(searchAdmissionAReport);
    if(this.semesterCode){
      this.admissionReportService.getAdmissionReport(searchAdmissionAReport.semesterCode, searchAdmissionAReport.programCode, searchAdmissionAReport.intakeCode, searchAdmissionAReport.enrollmentTypeCode).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.admission_reports = response.data;
        }else {
          this.loading = false;
        }
      })
    }else {
      this.loading = false;
      this.toastr.error('Invalid Semester')
    }
  }
}
