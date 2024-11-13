import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {AdmissionTemplateCategorySubject} from "../../../model/admission/admission-test/admissionTemplateCategorySubject";
import {
  AdmissionTemplateCategorySubjectService
} from "../../../Service/admission/admission-test/admissionTemplateCategorySubject.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import Swal from "sweetalert2";
import {AdmissionTestSubjectService} from "../../../Service/admission/admission-test/admissionTestSubject.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {AdmissionTestCommittee} from "../../../model/admission/admission-test/admissionTestCommittee";
import {AdmissionTemplateCategory} from "../../../model/admission/admission-test/admissionTemplateCategory";

@Component({
  selector: 'app-admission-template-category-subject',
  templateUrl: './admission-template-category-subject.component.html',
  styleUrls: ['./admission-template-category-subject.component.css']
})
export class AdmissionTemplateCategorySubjectComponent implements OnInit{
  @Input() admissionTemplateCategory:any=new AdmissionTemplateCategory();
  @ViewChild('form') form: NgForm | undefined;
  admissionTemplateCategorySubject:any = new AdmissionTemplateCategorySubject();
  admission_template_category_subjects:any=[]
  admission_test_subjects:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTemplateCategorySubjectView:boolean = false;
  constructor(private admissionTemplateCategorySubjectService: AdmissionTemplateCategorySubjectService,
              private admissionTestSubjectService: AdmissionTestSubjectService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTemplateCategorySubject();
    this.getAdmissionTestSubject();
  }
  getAdmissionTemplateCategorySubject() {
    this.admissionTemplateCategorySubjectService.getAdmissionTemplateCategorySubject().subscribe((response:any)=>{
      this.admission_template_category_subjects = response.data;
    })
  }
  getAdmissionTestSubject(){
    this.admissionTestSubjectService.getAdmissionTestSubjectActive().subscribe((response:any)=>{
      this.admission_test_subjects = response.data;
    })
  }
  admissionTemplateCategorySubjectView() {
    this.isTemplateCategorySubjectView = !this.isTemplateCategorySubjectView;
  }
  postAdmissionTemplateCategorySubject() {
    this.admissionTemplateCategorySubject.active = true;
    this.admissionTemplateCategorySubject.admissionTemplateCategoryId = this.admissionTemplateCategory.id;
    this.admissionTemplateCategorySubjectService.postAdmissionTemplateCategorySubject(this.admissionTemplateCategorySubject).subscribe((response:any)=>{
      if (response.status){
        this.admissionTemplateCategorySubject = new AdmissionTemplateCategorySubject();
        this.form?.resetForm(this.admissionTemplateCategorySubject);
        this.toastr.success(response.message);
        this.admission_template_category_subjects.push(response.data);
        this.admissionTemplateCategorySubject.active = false;
        this.isTemplateCategorySubjectView = false;
      }
    })
  }

  cancelAdmissionTemplateCategorySubject() {
    this.admissionTemplateCategorySubject = new AdmissionTemplateCategorySubject();
    this.form?.resetForm(this.admissionTemplateCategorySubject);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTemplateCategorySubjectView = !this.isTemplateCategorySubjectView;
  }
  editAdmissionTemplateCategorySubject(admission_template_category_subject: any) {
    this.admissionTemplateCategorySubject = admission_template_category_subject;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isTemplateCategorySubjectView = true;
    this.admissionTemplateCategorySubject.admissionTestSubjectId = admission_template_category_subject.admissionTestSubject.id;
  }
  putAdmissionTemplateCategorySubject() {
    this.admissionTemplateCategorySubject.admissionTemplateCategoryId = this.admissionTemplateCategory.id;
    this.admissionTemplateCategorySubjectService.putAdmissionTemplateCategorySubject(this.admissionTemplateCategorySubject, this.admissionTemplateCategorySubject.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_template_category_subjects.findIndex((item: AdmissionTemplateCategorySubject) => item.id === this.admissionTemplateCategorySubject.id);
        this.admission_template_category_subjects[indexToUpdate] = response.data;
        this.admissionTemplateCategorySubject = new AdmissionAffiliateType();
        this.form?.resetForm(this.admissionTemplateCategorySubject);
        this.admissionTemplateCategorySubject.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isTemplateCategorySubjectView = false;
      }
    })
  }

  deleteAdmissionTemplateCategorySubject(admission_template_category_subject: any) {
    Swal.fire({
      title: 'Admission Template Category Delete',
      text: 'Are you want to delete this Admission Template Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTemplateCategorySubjectService.deleteAdmissionTemplateCategorySubject(admission_template_category_subject.id).subscribe((response:any) => {
          if(response.status){
            this.admission_template_category_subjects = this.admission_template_category_subjects.filter((item: any)  => item !== admission_template_category_subject);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
