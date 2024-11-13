import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestCategory} from "../../../model/admission/admission-test/admissionTestCategory";
import {AdmissionTestCategoryService} from "../../../Service/admission/admission-test/admissionTestCategory.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-test-category',
  templateUrl: './admission-test-category.component.html',
  styleUrls: ['./admission-test-category.component.css']
})
export class AdmissionTestCategoryComponent implements OnInit{
  @ViewChild('form') form: NgForm | undefined;
  admissionTestCategory:any = new AdmissionTestCategory();
  admission_test_categories:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTestCategoryView:boolean = false;
  constructor(private admissionTestCategoryService: AdmissionTestCategoryService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTestCategory();
  }
  getAdmissionTestCategory() {
    this.admissionTestCategoryService.getAdmissionTestCategory().subscribe((response:any)=>{
      this.admission_test_categories = response.data;
    })
  }
  admissionTestCategoryView() {
    this.isTestCategoryView = !this.isTestCategoryView;
  }
  postAdmissionTestCategory() {
    this.admissionTestCategory.active = true;
    this.admissionTestCategoryService.postAdmissionTestCategory(this.admissionTestCategory).subscribe((response:any)=>{
      if (response.status){
        this.admissionTestCategory = new AdmissionTestCategory();
        this.form?.resetForm(this.admissionTestCategory);
        this.toastr.success(response.message);
        this.admission_test_categories.push(response.data);
        this.admissionTestCategory.active = false;
        this.isTestCategoryView = false;
      }
    })
  }

  cancelAdmissionTestCategory() {
    this.admissionTestCategory = new AdmissionTestCategory();
    this.form?.resetForm(this.admissionTestCategory);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTestCategoryView = !this.isTestCategoryView;
  }
  editAdmissionTestCategory(admission_test_category: any) {
    this.admissionTestCategory = admission_test_category;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isTestCategoryView = true;
  }
  putAdmissionTestCategory() {
    this.admissionTestCategoryService.putAdmissionTestCategory(this.admissionTestCategory, this.admissionTestCategory.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_test_categories.findIndex((item: AdmissionTestCategory) => item.id === this.admissionTestCategory.id);
        this.admission_test_categories[indexToUpdate] = response.data;
        this.admissionTestCategory = new AdmissionAffiliateType();
        this.form?.resetForm(this.admissionTestCategory);
        this.admissionTestCategory.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isTestCategoryView = false;
      }
    })
  }

  deleteAdmissionTestCategory(admission_test_category: any) {
    Swal.fire({
      title: 'Admission Test Category Delete',
      text: 'Are you want to delete this Admission Test Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTestCategoryService.deleteAdmissionTestCategory(admission_test_category.id).subscribe((response:any) => {
          if(response.status){
            this.admission_test_categories = this.admission_test_categories.filter((item: any)  => item !== admission_test_category);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
