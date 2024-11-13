import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AdmissionExam} from "../../../model/admission/admission-exam/admissionExam";
import {AdmissionExamService} from "../../../Service/admission/admission-exam/admissionExam.service";
import {AdmissionCircularService} from "../../../Service/admission/admission-circular/admissionCircular.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {
  AdmissionMarkTemplateService
} from "../../../Service/admission/admission-exam/admissionMarkTemplate.service";
import {FacultyService} from "../../../Service/academic/institute/faculty.service";

@Component({
  selector: 'app-admission-exam',
  templateUrl: './admission-exam.component.html',
  styleUrls: ['./admission-exam.component.css']
})
export class AdmissionExamComponent implements OnInit{
  @ViewChild('admissionExamForm') form: NgForm | undefined;
  admissionExam:any = new AdmissionExam();
  admission_exams:any=[]
  admission_circulars:any=[]
  semesters:any=[]
  faculties:any=[];
  semesterCode:any;
  facultyCode:any;
  mark_distribution_templates:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAdmissionExamView:boolean = false;

  p: number = 0;
  total: number = 0;
  size:number = 10;
  constructor(private admissionExamService: AdmissionExamService,
              private admissionCircularService: AdmissionCircularService, private semesterService: SemesterService,
              private admissionMarkTemplateService: AdmissionMarkTemplateService, private facultyService: FacultyService,
              private toastr: ToastrService, private router: Router) {
  }
  ngOnInit() {
    this.getAdmissionCircular();
    this.getSemester();
    this.getFaculty();
    this.getAdmissionMarkDistributionTemplate();
    const searchAdmissionExams = this.admissionExamService.getAdmissionExamSession();
    if(searchAdmissionExams){
      const {semesterCode, facultyCode, size, p} = searchAdmissionExams;
      this.semesterCode = semesterCode;
      this.facultyCode = facultyCode;
      this.p = p;
      this.admissionExamService.getAdmissionExam(semesterCode,facultyCode, size,p).subscribe((response:any)=>{
        this.admission_exams = response.data.content;
      })
    }
  }
  getAdmissionExam() {
    this.admission_exams=[];
    const searchAdmissionExam = {semesterCode:this.semesterCode, facultyCode:this.facultyCode, size: this.size, p:this.p};
    this.admissionExamService.setAdmissionExamSession(searchAdmissionExam)
    if(this.semesterCode && this.facultyCode){
      this.admissionExamService.getAdmissionExam(this.semesterCode, this.facultyCode,this.size, this.p).subscribe((response:any)=>{
        this.admission_exams = response.data.content;
      })
    }else {
      this.toastr.error('Invalid Semester or Faculty');
    }

  }
  getAdmissionCircular() {
    this.admissionCircularService.getAdmissionCircular().subscribe((response:any)=>{
      this.admission_circulars = response.data;
    })
  }
  getSemester(){
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
    })
  }
  getFaculty(){
    this.facultyService.getFacultyActive().subscribe((response:any)=>{
      this.faculties = response.data;
    })
  }
  getAdmissionMarkDistributionTemplate() {
    this.admissionMarkTemplateService.getAdmissionMarkTemplateActive().subscribe((response:any)=>{
      this.mark_distribution_templates = response.data;
    })
  }

    postAdmissionExam() {
    this.admissionExam.active = true;
    this.admissionExamService.postAdmissionExam(this.admissionExam).subscribe((response:any)=>{
      if (response.status){
        this.admissionExam = new AdmissionExam();
        this.form?.resetForm(this.admissionExam);
        this.toastr.success(response.message);
        this.admission_exams.push(response.data);
        this.isAdmissionExamView = false;
      }
    })
  }

  cancelAdmissionExam() {
    this.admissionExam = new AdmissionExam();
    this.form?.resetForm(this.admissionExam);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionExamView = !this.isAdmissionExamView;
  }


  admissionMarkDistributionTemplateView() {
    this.isAdmissionExamView = !this.isAdmissionExamView;
  }

  admissionMarkDistributionTemplateFind(admission_exam: any) {
    this.router.navigate(['/admission-exam', admission_exam.id]);
  }
  pageChangeEvent(event: any) {
    this.p = event-1;
    this.getAdmissionExam();
  }

  editAdmissionExam(admission_exam: any) {
    this.isAdmissionExamView = true;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.admissionExam = admission_exam;
    this.admissionExam.semesterId = admission_exam.semester.id;
    this.admissionExam.admissionCircularId = admission_exam.admissionCircular.id;
    if(admission_exam.admissionMarkTemplate){
      this.admissionExam.admissionMarkTemplateId = admission_exam.admissionMarkTemplate.id;
    }

  }

  putAdmissionExam() {
    this.admissionExam.status = 0;
    this.admissionExamService.putAdmissionExam(this.admissionExam, this.admissionExam.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_exams.findIndex((item: AdmissionExam) => item.id === this.admissionExam.id);
        this.admission_exams[indexToUpdate] = response.data;
        this.admissionExam = new AdmissionExam();
        this.form?.resetForm(this.admissionExam);
        this.isAdmissionExamView = false;
        // this.isUpdateButton = false;
        // this.isSaveButton = true;
      }
    })
  }

  getBack() {

  }
}
