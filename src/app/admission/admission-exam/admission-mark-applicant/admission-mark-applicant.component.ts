import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionExamService} from "../../../Service/admission/admission-exam/admissionExam.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {FacultyService} from "../../../Service/academic/institute/faculty.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AdmissionMarkApplicantService} from "../../../Service/admission/admission-exam/admissionMarkApplicant.service";
import {
  AdmissionMarkDistributionService
} from "../../../Service/admission/admission-exam/admissionMarkDistribution.service";
import {AdmissionMarkApplicant} from "../../../model/admission/admission-exam/admissionMarkApplicant";
import {ProgramService} from "../../../Service/academic/institute/program.service";
import {BatchService} from "../../../Service/academic/batch.service";
import {NgForm} from "@angular/forms";
import {AdmissionExam} from "../../../model/admission/admission-exam/admissionExam";
import {AdmissionMarkSubmitService} from "../../../Service/admission/admission-exam/admissionMarkSubmit.service";

@Component({
  selector: 'app-admission-mark-applicant',
  templateUrl: './admission-mark-applicant.component.html',
  styleUrls: ['./admission-mark-applicant.component.css']
})
export class AdmissionMarkApplicantComponent implements OnInit{
  @ViewChild('admissionMarkApplicantFrom') form: NgForm | undefined;
  admission_exams:any=[]
  admission_applicants:any=[]
  applicantEntryList:any=[]
  applicantList:any=[]
  semesters:any=[]
  faculties:any=[];
  programs:any=[];
  batches:any=[];
  admission_mark_distributions:any=[];
  admission_submissions:any=[];
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
              private admissionMarkSubmitService: AdmissionMarkSubmitService,
              private toastr: ToastrService, private router: Router) {
  }
  ngOnInit() {
    this.getSemester();
    this.getFaculty();
    const searchAdmissionApplicants = this.admissionApplicantService.getAdmissionApplicantMarkSession();
    if(searchAdmissionApplicants){
      const {semesterCode, facultyCode, admissionExamId} = searchAdmissionApplicants;
      this.semesterCode = semesterCode;
      this.facultyCode = facultyCode;
      this.admissionExamId = admissionExamId;
      this.getAdmissionExam()
      this.getAdmissionExamFind(this.admissionExamId)
      this.admissionApplicantService.getAdmissionMarkApplicantPosition(admissionExamId).subscribe((response:any)=>{
        this.admission_applicants = response.data;
      })
    }
  }
  getSemester(){
    this.semesters=[];
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
    })
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
  // getBatchSearch(programId:any){
  //   this.batchService.getBatch(programId).subscribe((response:any)=>{
  //     this.batches = response.data;
  //   })
  // }
  getBatchSearch(semesterId:any, programId:any){
    this.batchService.getBatchSearch(semesterId, programId).subscribe((response:any)=>{
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
      this.getAdmissionMarkSubmit(this.admissionExam.id);
    })
  }
  getAdmissionMarkSubmit(admissionExamId:any){
    this.admissionMarkSubmitService.getAdmissionMarkSubmit(admissionExamId).subscribe((response:any)=>{
      this.admission_submissions = response.data;
    });
  }

  getAdmissionApplicant() {
    this.admission_applicants=[];
    const searchAdmissionApplicant = {semesterCode:this.semesterCode, facultyCode:this.facultyCode, admissionExamId: this.admissionExamId};
    this.admissionApplicantService.setAdmissionApplicantMarkSession(searchAdmissionApplicant)
    if(this.admissionExamId){
      this.getAdmissionExamFind(this.admissionExamId)
      this.admissionApplicantService.getAdmissionMarkApplicantPosition(searchAdmissionApplicant.admissionExamId).subscribe((response:any)=>{
        this.admission_applicants = response.data;

      })
    }else {
      this.toastr.error('Invalid Exam');
    }
  }
  getAdmissionMarkDistribution(admissionMarkTemplateId:any){
    this.admissionMarkDistributionService.getAdmissionMarkDistributionActive(admissionMarkTemplateId).subscribe((response:any)=>{
      this.admission_mark_distributions = response.data;
      console.log(this.admission_mark_distributions);
    })
  }

  isAllSelected(applicationId:any) {
    this.isMasterSel = this.admission_applicants.every(function (item: any) {
      return item.isSelected == true;
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
    if(this.applicantList.length > 0){
      this.isOpenSave = true;
      this.admissionMarkApplicant.facultyId = this.applicantList[0]?.admissionExam.admissionCircular.faculty.id;
      this.getProgram(this.applicantList[0]?.admissionExam.admissionCircular.faculty.id)
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

  putAdmissionMarkApplicant() {
    console.log(this.applicantList);
    this.admissionMarkApplicant.admissionApplicationId = this.applicantList[0].admissionApplication.id;
    this.admissionMarkApplicant.admissionExamId = this.applicantList[0].admissionExam.id;
    this.admissionMarkApplicant.attendance = 1;
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
