import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTemplateCategory} from "../../../model/admission/admission-test/admissionTemplateCategory";
import {AdmissionTemplateCategoryService} from "../../../Service/admission/admission-test/admissionTemplateCategory.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import Swal from "sweetalert2";
import {AdmissionTestCategoryService} from "../../../Service/admission/admission-test/admissionTestCategory.service";
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";
import {AdmissionTestTemplate} from "../../../model/admission/admission-test/admissionTestTemplate";

@Component({
  selector: 'app-admission-template-category',
  templateUrl: './admission-template-category.component.html',
  styleUrls: ['./admission-template-category.component.css']
})
export class AdmissionTemplateCategoryComponent implements OnInit{
  @Input() admissionTestTemplate:any=new AdmissionTestTemplate();
  @ViewChild('form') form: NgForm | undefined;
  admissionTemplateCategory:any = new AdmissionTemplateCategory();
  admission_template_categories:any=[]
  admission_test_categories:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTemplateCategoryView:boolean = false;
  constructor(private admissionTemplateCategoryService: AdmissionTemplateCategoryService,
              private admissionTestCategoryService: AdmissionTestCategoryService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTemplateCategory();
    this.getAdmissionTestCategory();
  }
  getAdmissionTemplateCategory() {
    // this.admissionTemplateCategoryService.getAdmissionTemplateCategory().subscribe((response:any)=>{
    //   this.admission_template_categories = response.data;
    // })
    this.admission_template_categories = this.admissionTestTemplate.categories;
  }
  getAdmissionTestCategory(){
    this.admissionTestCategoryService.getAdmissionTestCategoryActive().subscribe((response:any)=>{
      this.admission_test_categories = response.data;
    })
  }
  admissionTemplateCategoryView() {
    this.isTemplateCategoryView = !this.isTemplateCategoryView;
  }
  postAdmissionTemplateCategory() {
    this.admissionTemplateCategory.active = true;
    this.admissionTemplateCategory.admissionTestTemplateId = this.admissionTestTemplate.id;
    this.admissionTemplateCategoryService.postAdmissionTemplateCategory(this.admissionTemplateCategory).subscribe((response:any)=>{
      if (response.status){
        this.admissionTemplateCategory = new AdmissionTemplateCategory();
        this.form?.resetForm(this.admissionTemplateCategory);
        this.toastr.success(response.message);
        this.admission_template_categories.push(response.data);
        this.admissionTemplateCategory.active = false;
        this.isTemplateCategoryView = false;
      }
    })
  }

  cancelAdmissionTemplateCategory() {
    this.admissionTemplateCategory = new AdmissionTemplateCategory();
    this.form?.resetForm(this.admissionTemplateCategory);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTemplateCategoryView = !this.isTemplateCategoryView;
  }
  editAdmissionTemplateCategory(admission_template_category: any) {
    this.isTemplateCategoryView = true;
    this.admissionTemplateCategory = admission_template_category;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.admissionTemplateCategory.admissionTestTemplateId = admission_template_category.admissionTestTemplate.id;
    this.admissionTemplateCategory.admissionTestCategoryId = admission_template_category.admissionTestCategory.id;
  }
  putAdmissionTemplateCategory() {
    this.admissionTemplateCategoryService.putAdmissionTemplateCategory(this.admissionTemplateCategory, this.admissionTemplateCategory.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_template_categories.findIndex((item: AdmissionTemplateCategory) => item.id === this.admissionTemplateCategory.id);
        this.admission_template_categories[indexToUpdate] = response.data;
        this.admissionTemplateCategory = new AdmissionAffiliateType();
        this.form?.resetForm(this.admissionTemplateCategory);
        this.admissionTemplateCategory.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isTemplateCategoryView = false;
      }
    });
  }

  deleteAdmissionTemplateCategory(admission_template_category: any) {
    Swal.fire({
      title: 'Admission Template Category Delete',
      text: 'Are you want to delete this Admission Template Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTemplateCategoryService.deleteAdmissionTemplateCategory(admission_template_category.id).subscribe((response:any) => {
          if(response.status){
            this.admission_template_categories = this.admission_template_categories.filter((item: any)  => item !== admission_template_category);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  viewAdmissionTemplateCategory(admission_template_category: any) {
    this.router.navigate(['/admission-template-category', admission_template_category.id]);
  }
}
