import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestSubject} from "../../../model/admission/admission-test/admissionTestSubject";
import {AdmissionTestSubjectService} from "../../../Service/admission/admission-test/admissionTestSubject.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {AdmissionTestCategoryService} from "../../../Service/admission/admission-test/admissionTestCategory.service";
import {LevelOfEducationService} from "../../../Service/common-setup/levelOfEducation.service";

@Component({
  selector: 'app-admission-test-subject',
  templateUrl: './admission-test-subject.component.html',
  styleUrls: ['./admission-test-subject.component.css']
})
export class AdmissionTestSubjectComponent implements OnInit{
  @ViewChild('form') form: NgForm | undefined;
  admissionTestSubject:any = new AdmissionTestSubject();
  admission_test_subjects:any=[]
  admission_test_categories:any=[]
  level_of_educations:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTestSubjectView:boolean = false;
  constructor(private admissionTestSubjectService: AdmissionTestSubjectService,
              private admissionTestCategoryService: AdmissionTestCategoryService,
              private levelOfEducationService: LevelOfEducationService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Subject')
  }
  ngOnInit() {
    this.getAdmissionTestSubject();
    this.getAdmissionTestCategory();
    this.getLevelOfEducation();
  }
  getAdmissionTestSubject() {
    this.admissionTestSubjectService.getAdmissionTestSubject().subscribe((response:any)=>{
      this.admission_test_subjects = response.data;
    })
  }
  getAdmissionTestCategory() {
    this.admissionTestCategoryService.getAdmissionTestCategoryActive().subscribe((response:any)=>{
      this.admission_test_categories = response.data;
    })
  }
  getLevelOfEducation(){
    this.levelOfEducationService.getLevelOfEducation().subscribe((response:any)=>{
      this.level_of_educations = response.data;
    })
  }
  admissionTestSubjectView() {
    this.isTestSubjectView = !this.isTestSubjectView;
  }
  postAdmissionTestSubject() {
    this.admissionTestSubject.active = true;
    this.admissionTestSubjectService.postAdmissionTestSubject(this.admissionTestSubject).subscribe((response:any)=>{
      if (response.status){
        this.admissionTestSubject = new AdmissionTestSubject();
        this.form?.resetForm(this.admissionTestSubject);
        this.toastr.success(response.message);
        this.admission_test_subjects.push(response.data);
        this.admissionTestSubject.active = false;
        this.isTestSubjectView = false;
      }
    })
  }

  cancelAdmissionTestSubject() {
    this.admissionTestSubject = new AdmissionTestSubject();
    this.form?.resetForm(this.admissionTestSubject);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTestSubjectView = !this.isTestSubjectView;
  }
  editAdmissionTestSubject(admission_test_subject: any) {
    this.admissionTestSubject = admission_test_subject;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isTestSubjectView = true;
    this.admissionTestSubject.admissionTestCategoryId = admission_test_subject.admissionTestCategory.id;
    this.admissionTestSubject.levelOfEducationId = admission_test_subject?.levelOfEducation?.id;
  }
  putAdmissionTestSubject() {
    this.admissionTestSubjectService.putAdmissionTestSubject(this.admissionTestSubject, this.admissionTestSubject.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_test_subjects.findIndex((item: AdmissionTestSubject) => item.id === this.admissionTestSubject.id);
        this.admission_test_subjects[indexToUpdate] = response.data;
        this.admissionTestSubject = new AdmissionTestSubject();
        this.form?.resetForm(this.admissionTestSubject);
        this.admissionTestSubject.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isTestSubjectView = false;
      }
    })
  }

  deleteAdmissionTestSubject(admission_test_subject: any) {
    Swal.fire({
      title: 'Admission Test Category Delete',
      text: 'Are you want to delete this Admission Test Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTestSubjectService.deleteAdmissionTestSubject(admission_test_subject.id).subscribe((response:any) => {
          if(response.status){
            this.admission_test_subjects = this.admission_test_subjects.filter((item: any)  => item !== admission_test_subject);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
