import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {AdmissionWaiverCategory} from "../../../model/admission/admission-setup/admissionWaiverCategory";
import {
  AdmissionWaiverCategoryService
} from "../../../Service/admission/admission-setup/admissionWaiverCategory.service";

@Component({
  selector: 'app-admission-waiver-category',
  templateUrl: './admission-waiver-category.component.html',
  styleUrls: ['./admission-waiver-category.component.css']
})
export class AdmissionWaiverCategoryComponent implements OnInit{
  @ViewChild('waiverCategoryForm') form: NgForm | undefined;
  waiverCategory  = new AdmissionWaiverCategory();
  waiver_categories:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(  private service: AdmissionWaiverCategoryService, private toastr: ToastrService, private titleService: Title) {
    this.titleService.setTitle('Admission Waiver Category')
  }
  ngOnInit() {
    this.getWaiverCategory();
  }
  getWaiverCategory() {
    this.service.getWaiverCategory().subscribe((response:any)=>{
      this.waiver_categories = response.data;
    })
  }
  postWaiverCategory() {
    this.waiverCategory.active = true;
    this.service.postWaiverCategory(this.waiverCategory).subscribe((response:any)=>{
      if(response.status){
        this.waiverCategory = new AdmissionWaiverCategory();
        this.form?.resetForm(this.waiverCategory);
        this.toastr.success(response.message);
        this.waiver_categories.push(response.data);
        this.waiverCategory.active = false;
      }
    })
  }

  putWaiverCategory() {
    this.service.putWaiverCategory(this.waiverCategory, this.waiverCategory.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.waiver_categories.findIndex((item: AdmissionWaiverCategory) => item.id === this.waiverCategory.id);
        this.waiver_categories[indexToUpdate] = response.data;
        this.waiverCategory = new AdmissionWaiverCategory();
        this.form?.resetForm(this.waiverCategory);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.waiverCategory.active = false;
      }
    })
  }

  cancelWaiverCategory() {
    this.waiverCategory = new AdmissionWaiverCategory();
    this.form?.resetForm(this.waiverCategory);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editWaiverCategory(waiver_category: any) {
    this.waiverCategory = waiver_category;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteWaiverCategory(waiver_category: any) {
    Swal.fire({
      title: 'Waiver Category Delete',
      text: 'Are you want to delete this Waiver Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteWaiverCategory(waiver_category.id).subscribe((response:any) => {
          if(response.status){
            this.waiver_categories = this.waiver_categories.filter((item: any)  => item !== waiver_category);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
