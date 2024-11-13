import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {AdmissionApplicationTypeService} from "../../../Service/admission/admission-setup/admissionApplicationType.service";
import Swal from "sweetalert2";
import {
  AdmissionMembershipUserTypeService
} from "../../../Service/admission/admission-setup/admissionMembershipUserType.service";

@Component({
  selector: 'app-application-type',
  templateUrl: './admission-application-type.component.html',
  styleUrls: ['./admission-application-type.component.css']
})
export class AdmissionApplicationTypeComponent implements OnInit{
  @ViewChild('applicationTypeForm') form: NgForm | undefined;
  admissionApplicationType  = new AdmissionApplicationType();
  application_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;

  constructor(private service: AdmissionApplicationTypeService,
              private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Application Type')
  }
  ngOnInit() {
    this.getApplicationType();
  }

  getApplicationType() {
    this.service.getApplicationType().subscribe((response:any)=>{
      this.application_types = response.data;
    })
  }


  postApplicationType() {
    this.admissionApplicationType.active = true;
    this.service.postApplicationType(this.admissionApplicationType).subscribe((response:any)=>{
      if(response.status){
        this.admissionApplicationType = new AdmissionApplicationType();
        this.form?.resetForm(this.admissionApplicationType);
        this.admissionApplicationType.isPassport = false;
        this.toastr.success(response.message);
        this.application_types.push(response.data);
      }
    })
  }

  putApplicationType() {

    this.service.putApplicationType(this.admissionApplicationType, this.admissionApplicationType.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.application_types.findIndex((item: AdmissionApplicationType) => item.id === this.admissionApplicationType.id);
        this.application_types[indexToUpdate] = response.data;
        this.admissionApplicationType = new AdmissionApplicationType();
        this.form?.resetForm(this.admissionApplicationType);
        this.admissionApplicationType.isPassport = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelApplicationType() {
    this.admissionApplicationType = new AdmissionApplicationType();
    this.form?.resetForm(this.admissionApplicationType);
    this.isSaveButton = true;
    this.isUpdateButton = false;

  }

  editApplicationType(application_type: any) {
    this.admissionApplicationType = application_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteApplicationType(application_type: any) {
    Swal.fire({
      title: 'Application Type Delete',
      text: 'Are you want to delete this Application Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteApplicationType(application_type.id).subscribe((response:any) => {
          if(response.status){
            this.application_types = this.application_types.filter((item: any)  => item !== application_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
