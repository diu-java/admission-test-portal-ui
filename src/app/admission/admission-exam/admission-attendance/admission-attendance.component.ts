import {Component, OnInit} from '@angular/core';
import {AdmissionMarkApplicant} from "../../../model/admission/admission-exam/admissionMarkApplicant";
import {AdmissionExam} from "../../../model/admission/admission-exam/admissionExam";
import {AdmissionExamService} from "../../../Service/admission/admission-exam/admissionExam.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {FacultyService} from "../../../Service/academic/institute/faculty.service";
import {AdmissionMarkApplicantService} from "../../../Service/admission/admission-exam/admissionMarkApplicant.service";
import {
  AdmissionMarkDistributionService
} from "../../../Service/admission/admission-exam/admissionMarkDistribution.service";
import {BatchService} from "../../../Service/academic/batch.service";
import {ProgramService} from "../../../Service/academic/institute/program.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admission-attendance',
  templateUrl: './admission-attendance.component.html',
  styleUrls: ['./admission-attendance.component.css']
})
export class AdmissionAttendanceComponent implements OnInit{
  admission_exams:any=[]
  admission_applicants:any=[]
  applicantEntryList:any=[]
  applicantList:any=[]
  semesters:any=[]
  faculties:any=[];
  programs:any=[];
  batches:any=[];
  admission_mark_distributions:any=[];
  semesterCode:any;
  facultyCode:any;
  admissionExamId:any;
  size:number=10;
  p:number=0;
  isMasterSel:boolean | undefined;
  isOpenSave:boolean = false;
  admissionMarkApplicant:any = new AdmissionMarkApplicant();
  admissionExam:any = new AdmissionExam();
  constructor(private admissionExamService: AdmissionExamService, private semesterService: SemesterService,
              private facultyService: FacultyService,
              private admissionApplicantService: AdmissionMarkApplicantService,
              private admissionMarkDistributionService: AdmissionMarkDistributionService,
              private batchService: BatchService,
              private programService: ProgramService,
              private toastr: ToastrService, private router: Router) {
  }
  ngOnInit() {
    this.getSemester();
    this.getFaculty();
    const searchAdmissionAttendances = this.admissionApplicantService.getAdmissionApplicantAttendanceSession();
    if(searchAdmissionAttendances){
      const {semesterCode, facultyCode, admissionExamId} = searchAdmissionAttendances;
      this.semesterCode = semesterCode;
      this.facultyCode = facultyCode;
      this.admissionExamId = admissionExamId;
      this.getAdmissionExam()
      this.getAdmissionExamFind(this.admissionExamId)
      this.admissionApplicantService.getAdmissionMarkApplicantPosition(admissionExamId).subscribe((response:any)=>{
        this.admission_applicants = response.data;
        this.checkedAttendance();
      })
    }
  }
  getSemester(){
    this.semesters=[];
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
    })
  }
  checkedAttendance(){
    this.admission_applicants.forEach((applicant:any) => {
      applicant.isSelected = applicant.attendance === 1;
    });
  }

  getFaculty(){
    this.faculties=[];
    this.admissionExamId = undefined;
    this.facultyService.getFacultyActive().subscribe((response:any)=>{
      this.faculties = response.data;
    })
  }
  getProgram(facultyId:any){
    this.programs = [];
    if(facultyId){
      this.programService.getProgramFaculty(facultyId).subscribe((response:any)=>{
        this.programs = response.data;
      })
    }else {
      this.toastr.warning('Invalid Faculty')
    }
  }
  getBatchSearch(programId:any){
    this.batchService.getBatch(programId).subscribe((response:any)=>{
      this.batches = response.data;
    })
  }
  getAdmissionExam(){
    if(this.semesterCode && this.facultyCode){
      this.admissionExamService.getAdmissionExamActive(this.semesterCode, this.facultyCode).subscribe((response:any)=>{
        this.admission_exams = response.data;
        this.getAdmissionMarkDistribution(this.admission_exams[0]?.admissionMarkTemplate.id)
      })
    }else {
      this.toastr.error('Invalid Semester or Faculty');
    }
  }
  getAdmissionExamFind(id:any){
    this.admissionExamService.getViewAdmissionExam(id).subscribe((response:any)=>{
      this.admissionExam = response.data;
    })
  }

  getAdmissionApplicant() {
    this.admission_applicants=[];
    const searchAdmissionAttendance = {semesterCode:this.semesterCode, facultyCode:this.facultyCode, admissionExamId: this.admissionExamId};
    this.admissionApplicantService.setAdmissionApplicantAttendanceSession(searchAdmissionAttendance)
    if(this.admissionExamId){
      this.getAdmissionExamFind(this.admissionExamId)
      this.admissionApplicantService.getAdmissionMarkApplicantPosition(searchAdmissionAttendance.admissionExamId).subscribe((response:any)=>{
        this.admission_applicants = response.data;
        this.checkedAttendance();
      })
    }else {
      this.toastr.error('Invalid Exam');
    }
  }
  getAdmissionMarkDistribution(admissionMarkTemplateId:any){
    this.admissionMarkDistributionService.getAdmissionMarkDistributionActive(admissionMarkTemplateId).subscribe((response:any)=>{
      this.admission_mark_distributions = response.data;
    })
  }

  checkUncheckAll() {
    for (var i = 0; i < this.admission_applicants.length; i++) {
      this.admission_applicants[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected(applicationId:any) {
    // this.isMasterSel = this.admission_applicants.every(function (item: any) {
    //    item.isSelected == true;
    // });
    this.isMasterSel = this.admission_applicants.every((item:any) => item.isSelected === true);
    this.admission_applicants.forEach((applicant:any) => {
      applicant.attendance = applicant.isSelected ? 1 : 0;
    });
    this.getCheckedItemList();
  }
  getCheckedItemList() {
    this.applicantEntryList = [];
    this.applicantList = [];
    for (var i = 0; i < this.admission_applicants.length; i++) {
      if (this.admission_applicants[i].isSelected)
        this.applicantEntryList.push(this.admission_applicants[i]);
    }
    for (var i = 0; i < this.applicantEntryList.length; i++) {
      this.applicantList.push(this.applicantEntryList[i]);
    }
    this.applicantEntryList = JSON.stringify(this.applicantEntryList);
    console.log(this.applicantList);
    if(this.applicantList.length > 0){
      this.isOpenSave = true;
    }else{
      this.isOpenSave = false;
      this.admissionMarkApplicant = new AdmissionMarkApplicant();
    }
  }

  onApplicantClick(applicantId: any) {
    const clickedApplicant = this.admission_applicants.find((item:any) => item.admissionApplication.admissionPersons[0]?.id === applicantId);
    if (clickedApplicant) {
      clickedApplicant.isSelected = !clickedApplicant.isSelected;
    }
    this.isMasterSel = this.admission_applicants.every((item:any) => item.isSelected);
    this.getCheckedItemList();
  }

  putAdmissionAttendance() {
    this.admissionMarkApplicant.admissionApplicationId = this.applicantList[0].admissionApplication.id;
    this.admissionMarkApplicant.admissionExamId = this.applicantList[0].admissionExam.id;
    // this.admissionMarkApplicant.attendance = 1;
    this.admissionMarkApplicant.status = 2;

    this.admissionApplicantService.putAdmissionMarkApplicant(this.admissionMarkApplicant, this.applicantList[0].id).subscribe((response:any)=>{
      if(response.status){
        this.toastr.success(response.message)
        this.admissionMarkApplicant = new AdmissionMarkApplicant();
        this.isOpenSave = false;
        this.getAdmissionApplicant();
      }
    })
  }
}
