import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionCircularService} from "../../../Service/admission/admission-circular/admissionCircular.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {AdmissionMarkTemplateService} from "../../../Service/admission/admission-exam/admissionMarkTemplate.service";
import {FacultyService} from "../../../Service/academic/institute/faculty.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AdmissionTest} from "../../../model/admission/admission-test/admissionTest";
import {AdmissionTestService} from "../../../Service/admission/admission-test/admissionTest.service";
import {AdmissionTestTemplateService} from "../../../Service/admission/admission-test/admissionTestTemplate.service";
import {AdmissionTestCommitteeService} from "../../../Service/admission/admission-test/admissionTestCommittee.service";
import {AdmissionIntakeService} from "../../../Service/admission/admission-setup/admissionIntake.service";

@Component({
  selector: 'app-admission-test',
  templateUrl: './admission-test.component.html',
  styleUrls: ['./admission-test.component.css']
})
export class AdmissionTestComponent implements OnInit{
  @ViewChild('form') form: NgForm | undefined;
  admissionTest:any = new AdmissionTest();
  admission_tests:any=[]
  admission_circulars:any=[]
  semesters:any=[]
  faculties:any=[];
  semesterCode:any;
  facultyCode:any;
  admission_test_templates:any=[]
  admission_test_committees:any=[]
  admission_intakes:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAdmissionTestView:boolean = false;

  p: number = 0;
  total: number = 0;
  size:number = 10;
  constructor(private admissionTestService: AdmissionTestService,
              private admissionCircularService: AdmissionCircularService, private semesterService: SemesterService,
              private facultyService: FacultyService,
              private admissionTestTemplateService: AdmissionTestTemplateService,
              private admissionTestCommitteeService: AdmissionTestCommitteeService,
              private admissionIntakeService: AdmissionIntakeService,
              private toastr: ToastrService, private router: Router) {
  }
  ngOnInit() {
    this.getAdmissionCircular();
    this.getSemester();
    this.getFaculty();
    this.getAdmissionTestTemplate();
    this.getAdmissionIntake();
    this.getAdmissionTestCommittee();
    this.getAdmissionTest();
    // const searchAdmissionTests = this.admissionTestService.getAdmissionTestSession();
    // if(searchAdmissionTests){
    //   const {semesterCode, facultyCode, size, p} = searchAdmissionTests;
    //   this.semesterCode = semesterCode;
    //   this.facultyCode = facultyCode;
    //   this.p = p;
    //   this.admissionTestService.getAdmissionTest(semesterCode,facultyCode, size,p).subscribe((response:any)=>{
    //     this.admission_tests = response.data.content;
    //   })
    // }
  }
  getAdmissionTest() {
    this.admissionTestService.getAdmissionTest().subscribe((response:any)=>{
      this.admission_tests = response.data;
    })
  }
  getAdmissionCircular() {
    this.admissionCircularService.getAdmissionCircular().subscribe((response:any)=>{
      this.admission_circulars = response.data;
    })
  }
  getAdmissionIntake(){
    this.admissionIntakeService.getAdmissionIntakeActive().subscribe((response:any)=>{
      this.admission_intakes = response.data;
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
  getAdmissionTestTemplate() {
    this.admissionTestTemplateService.getAdmissionTestTemplateActive().subscribe((response:any)=>{
      this.admission_test_templates = response.data;
    })
  }
  getAdmissionTestCommittee() {
    this.admissionTestCommitteeService.getAdmissionTestCommitteeActive().subscribe((response:any)=>{
      this.admission_test_committees = response.data;
    })
  }

  postAdmissionTest() {
    this.admissionTest.active = true;
    this.admissionTest.status = 0;
    this.admissionTestService.postAdmissionTest(this.admissionTest).subscribe((response:any)=>{
      if (response.status){
        this.admissionTest = new AdmissionTest();
        this.form?.resetForm(this.admissionTest);
        this.toastr.success(response.message);
        this.admission_tests.push(response.data);
        this.isAdmissionTestView = false;
      }
    })
  }

  cancelAdmissionTest() {
    this.admissionTest = new AdmissionTest();
    this.form?.resetForm(this.admissionTest);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionTestView = !this.isAdmissionTestView;
  }


  admissionTestView() {
    this.isAdmissionTestView = !this.isAdmissionTestView;
  }

  admissionMarkDistributionTemplateFind(admission_test: any) {
    this.router.navigate(['/admission-test', admission_test.id]);
  }
  pageChangeEvent(event: any) {
    this.p = event-1;
    this.getAdmissionTest();
  }

  editAdmissionTest(admission_test: any) {
    this.isAdmissionTestView = true;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.admissionTest = admission_test;
    this.admissionTest.semesterId = admission_test.semester.id;
    this.admissionTest.admissionCircularId = admission_test?.admissionCircular?.id;
    this.admissionTest.admissionIntakeId = admission_test?.admissionIntake?.id;
    this.admissionTest.admissionTestTemplateId = admission_test?.admissionTestTemplate?.id;
    this.admissionTest.admissionTestCommitteeId = admission_test?.admissionTestCommittee?.id;
  }

  putAdmissionTest() {
    this.admissionTest.status = 0;
    this.admissionTestService.putAdmissionTest(this.admissionTest, this.admissionTest.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_tests.findIndex((item: AdmissionTest) => item.id === this.admissionTest.id);
        this.admission_tests[indexToUpdate] = response.data;
        this.admissionTest = new AdmissionTest();
        this.form?.resetForm(this.admissionTest);
        this.isAdmissionTestView = false;
        // this.isUpdateButton = false;
        // this.isSaveButton = true;
      }
    })
  }
}
