import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionMembershipUserType} from "../../../model/admission/admission-setup/admissionMembershipUserType";
import {Title} from "@angular/platform-browser";
import {
  AdmissionMembershipUserTypeService
} from "../../../Service/admission/admission-setup/admissionMembershipUserType.service";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-membership-user-type',
  templateUrl: './admission-membership-user-type.component.html',
  styleUrls: ['./admission-membership-user-type.component.css']
})
export class AdmissionMembershipUserTypeComponent implements OnInit{
  @ViewChild('membershipUserTypeForm') form: NgForm | undefined;
  admissionMembershipUserType  = new AdmissionMembershipUserType();
  membership_user_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(private titleService: Title,
              private service: AdmissionMembershipUserTypeService,
              private toastr: ToastrService) {
    this.titleService.setTitle('Admission Membership User Type')
  }
  ngOnInit() {
    this.getMembershipUserType();
  }

  getMembershipUserType() {
    this.service.getMembershipUserType().subscribe((response:any)=>{
      this.membership_user_types = response.data;
    })
  }
  postMembershipUserType() {
    this.admissionMembershipUserType.active = true;
    this.service.postMembershipUserType(this.admissionMembershipUserType).subscribe((response:any)=>{
      if (response.status){
        this.admissionMembershipUserType = new AdmissionMembershipUserType();
        this.form?.resetForm(this.admissionMembershipUserType);
        this.toastr.success(response.message);
        this.membership_user_types.push(response.data);
      }
    })
  }

  putMembershipUserType() {
    this.service.putMembershipUserType(this.admissionMembershipUserType, this.admissionMembershipUserType.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.membership_user_types.findIndex((item: AdmissionMembershipUserType) => item.id === this.admissionMembershipUserType.id);
        this.membership_user_types[indexToUpdate] = response.data;
        this.admissionMembershipUserType = new AdmissionMembershipUserType();
        this.form?.resetForm(this.admissionMembershipUserType);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelMembershipUserType() {
    this.admissionMembershipUserType = new AdmissionMembershipUserType();
    this.form?.resetForm(this.admissionMembershipUserType);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editMembershipUserType(membership_user_type: any) {
    this.admissionMembershipUserType = membership_user_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteMembershipUserType(membership_user_type: any) {
    Swal.fire({
      title: 'Admission Membership User Type Delete',
      text: 'Are you want to delete this Admission Membership User Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteMembershipUserType(membership_user_type.id).subscribe((response:any) => {
          if(response.status){
            this.membership_user_types = this.membership_user_types.filter((item: any)  => item !== membership_user_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
