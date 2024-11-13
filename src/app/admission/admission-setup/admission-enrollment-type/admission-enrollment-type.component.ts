import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";

import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {
  AdmissionEnrollmentTypeService
} from "../../../Service/admission/admission-setup/admissionEnrollmentType.service";
import {AdmissionEnrollmentType} from "../../../model/admission/admission-setup/admissionEnrollmentType";

@Component({
  selector: 'app-admission-enrollment-type',
  templateUrl: './admission-enrollment-type.component.html',
  styleUrls: ['./admission-enrollment-type.component.css']
})
export class AdmissionEnrollmentTypeComponent implements OnInit{
  @ViewChild('enrollmentTypeForm') form: NgForm | undefined;
  admissionEnrollmentType  = new AdmissionEnrollmentType();
  enrollment_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;

  constructor(private service: AdmissionEnrollmentTypeService,
              private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Application Type')
  }
  ngOnInit() {
    this.getAdmissionEnrollmentType();
  }

  getAdmissionEnrollmentType() {
    this.service.getAdmissionEnrollmentType().subscribe((response:any)=>{
      this.enrollment_types = response.data;
    })
  }


  postAdmissionEnrollmentType() {
    this.admissionEnrollmentType.active = true;
    this.service.postAdmissionEnrollmentType(this.admissionEnrollmentType).subscribe((response:any)=>{
      if(response.status){
        this.admissionEnrollmentType = new AdmissionEnrollmentType();
        this.form?.resetForm(this.admissionEnrollmentType);
        this.toastr.success(response.message);
        this.enrollment_types.push(response.data);
      }
    })
  }

  putAdmissionEnrollmentType() {

    this.service.putAdmissionEnrollmentType(this.admissionEnrollmentType, this.admissionEnrollmentType.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.enrollment_types.findIndex((item: AdmissionEnrollmentType) => item.id === this.admissionEnrollmentType.id);
        this.enrollment_types[indexToUpdate] = response.data;
        this.admissionEnrollmentType = new AdmissionEnrollmentType();
        this.form?.resetForm(this.admissionEnrollmentType);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAdmissionEnrollmentType() {
    this.admissionEnrollmentType = new AdmissionEnrollmentType();
    this.form?.resetForm(this.admissionEnrollmentType);
    this.isSaveButton = true;
    this.isUpdateButton = false;

  }

  editAdmissionEnrollmentType(enrollment_type: any) {
    this.admissionEnrollmentType = enrollment_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAdmissionEnrollmentType(enrollment_type: any) {
    Swal.fire({
      title: 'Enrollment Type Delete',
      text: 'Are you want to delete this Enrollment Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAdmissionEnrollmentType(enrollment_type.id).subscribe((response:any) => {
          if(response.status){
            this.enrollment_types = this.enrollment_types.filter((item: any)  => item !== enrollment_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
