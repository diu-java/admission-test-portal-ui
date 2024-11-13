import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {
  AdmissionTestTeacher
} from "../../../model/admission/admission-test/admissionTestTeacher";
import {
  AdmissionTestTeacherService
} from "../../../Service/admission/admission-test/admissionTestTeacher.service";
import {AdmissionTestSubjectService} from "../../../Service/admission/admission-test/admissionTestSubject.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import Swal from "sweetalert2";
import {
  AdmissionTemplateCategoryService
} from "../../../Service/admission/admission-test/admissionTemplateCategory.service";
import {
  AdmissionTemplateCategorySubjectService
} from "../../../Service/admission/admission-test/admissionTemplateCategorySubject.service";
import {AdmissionTestCommittee} from "../../../model/admission/admission-test/admissionTestCommittee";
import {AdmissionTest} from "../../../model/admission/admission-test/admissionTest";
import {EmployeeInformationService} from "../../../Service/employee/employeeInformation.service";

@Component({
  selector: 'app-admission-test-teacher',
  templateUrl: './admission-test-teacher.component.html',
  styleUrls: ['./admission-test-teacher.component.css']
})
export class AdmissionTestTeacherComponent implements OnInit{
  @Input() admissionTest:any=new AdmissionTest();
  @ViewChild('form') form: NgForm | undefined;
  admissionTestTeacher:any = new AdmissionTestTeacher();
  admission_test_teachers:any=[]
  admission_test_subjects:any=[]
  admission_template_categories:any=[]
  employees:any=[]
  admission_template_category_subjects:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTestTeacherView:boolean = false;
  constructor(private admissionTestTeacherService: AdmissionTestTeacherService,
              private admissionTestSubjectService: AdmissionTestSubjectService,
              private admissionTemplateCategoryService: AdmissionTemplateCategoryService,
              private admissionTemplateCategorySubjectService: AdmissionTemplateCategorySubjectService,
              private employeeInformationService: EmployeeInformationService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTestTeacher();
    this.getAdmissionTestSubject();
    this.getAdmissionTemplateCategory();
    this.getEmployee();
  }
  getAdmissionTestTeacher() {
    this.admission_test_teachers = this.admissionTest.teachers;
  }
  getEmployee(){
    this.employeeInformationService.getEmployeeInformationActive().subscribe((respose:any)=>{
      this.employees = respose.data;
    })
  }
  getAdmissionTestSubject(){
    this.admissionTestSubjectService.getAdmissionTestSubjectActive().subscribe((response:any)=>{
      this.admission_test_subjects = response.data;
    })
    // this.admission_test_subjects = this.admissionTest.subjects.filter((item:any)=> )
  }
  getAdmissionTemplateCategory() {
    this.admissionTemplateCategoryService.getAdmissionTemplateCategory().subscribe((response:any)=>{
      this.admission_template_categories = response.data;
    })
  }
  getAdmissionTemplateCategorySubject(admissionTemplateCategoryId:any) {
    this.admission_template_category_subjects = this.admission_template_categories.find((item:any)=>item.id === admissionTemplateCategoryId).subjects;
  }

  admissionTestTeacherView() {
    this.isTestTeacherView = !this.isTestTeacherView;
  }
  postAdmissionTestTeacher() {
    this.admissionTestTeacher.status = 2;
    this.admissionTestTeacher.active = true;
    this.admissionTestTeacher.admissionTestId = this.admissionTest.id;
    this.admissionTestTeacherService.postAdmissionTestTeacher(this.admissionTestTeacher).subscribe((response:any)=>{
      if (response.status){
        this.admissionTestTeacher = new AdmissionTestTeacher();
        this.form?.resetForm(this.admissionTestTeacher);
        this.toastr.success(response.message);
        this.admission_test_teachers.push(response.data);
        this.admissionTestTeacher.active = false;
        this.isTestTeacherView = false;
      }
    })
  }

  cancelAdmissionTestTeacher() {
    this.admissionTestTeacher = new AdmissionTestTeacher();
    this.form?.resetForm(this.admissionTestTeacher);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTestTeacherView = !this.isTestTeacherView;
  }
  editAdmissionTestTeacher(admission_test_teacher: any) {
    this.admissionTestTeacher = admission_test_teacher;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isTestTeacherView = true;
    this.admissionTestTeacher.employeeInfoId = admission_test_teacher.employeeInfo.id;
    this.admissionTestTeacher.admissionTemplateCategoryId = admission_test_teacher.admissionTemplateCategory.id;
    this.getAdmissionTemplateCategorySubject(admission_test_teacher.admissionTemplateCategory.id)
    this.admissionTestTeacher.admissionTemplateCategorySubjectId = admission_test_teacher?.admissionTemplateCategorySubject?.id;

  }
  putAdmissionTestTeacher() {
    this.admissionTestTeacher.admissionTestId = this.admissionTest.id;
    this.admissionTestTeacherService.putAdmissionTestTeacher(this.admissionTestTeacher, this.admissionTestTeacher.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_test_teachers.findIndex((item: AdmissionTestTeacher) => item.id === this.admissionTestTeacher.id);
        this.admission_test_teachers[indexToUpdate] = response.data;
        this.admissionTestTeacher = new AdmissionAffiliateType();
        this.form?.resetForm(this.admissionTestTeacher);
        this.admissionTestTeacher.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isTestTeacherView = false;
      }
    })
  }

  deleteAdmissionTestTeacher(admission_test_teacher: any) {
    Swal.fire({
      title: 'Admission Test Teacher Delete',
      text: 'Are you want to delete this Admission Test Teacher.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTestTeacherService.deleteAdmissionTestTeacher(admission_test_teacher.id).subscribe((response:any) => {
          if(response.status){
            this.admission_test_teachers = this.admission_test_teachers.filter((item: any)  => item !== admission_test_teacher);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
