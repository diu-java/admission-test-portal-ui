import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";
import {AdmissionMembership} from "../../../model/admission/admission-setup/admissionMembership";
import {Title} from "@angular/platform-browser";
import {AdmissionMembershipService} from "../../../Service/admission/admission-setup/admissionMembership.service";
import {AdmissionMembershipUserType} from "../../../model/admission/admission-setup/admissionMembershipUserType";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {
  AdmissionMembershipUserTypeService
} from "../../../Service/admission/admission-setup/admissionMembershipUserType.service";
import {
  AdmissionMembershipOrganizationService
} from "../../../Service/admission/admission-setup/admissionMembershipOrganization.service";

@Component({
  selector: 'app-admission-membership',
  templateUrl: './admission-membership.component.html',
  styleUrls: ['./admission-membership.component.css']
})
export class AdmissionMembershipComponent implements OnInit{
  @ViewChild('membershipForm') form: NgForm | undefined;
  admissionMembership:any  = new AdmissionMembership();
  memberships:any=[];
  membership_user_types:any=[];
  membership_organizations:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(private service: AdmissionMembershipService,
              private admissionMembershipUserTypeService: AdmissionMembershipUserTypeService,
              private admissionMembershipOrganizationService: AdmissionMembershipOrganizationService,
              private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Admission Membership');
  }
  ngOnInit(){
    this.getAdmissionMembership();
    this.getMembershipUserType();
    this.getMembershipOrganization();
  }
  getAdmissionMembership() {
    this.service.getMembership().subscribe((response:any)=>{
      this.memberships = response.data;
    })
  }
  getMembershipUserType() {
    this.admissionMembershipUserTypeService.getMembershipUserType().subscribe((response:any)=>{
      this.membership_user_types = response.data;
    })
  }
  getMembershipOrganization(){
    this.admissionMembershipOrganizationService.getMembershipOrganization().subscribe((response:any)=>{
      this.membership_organizations = response.data;
    })
  }

  postAdmissionMembership() {
    this.admissionMembership.active = true;
    this.service.postMembership(this.admissionMembership).subscribe((response:any)=>{
      if(response.status){
        this.admissionMembership = new AdmissionMembership();
        this.form?.resetForm(this.admissionMembership);
        this.toastr.success(response.message);
        this.membership_user_types.push(response.data);
      }
    })
  }

  putAdmissionMembership() {
    this.service.putMembership(this.admissionMembership, this.admissionMembership.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.memberships.findIndex((item: AdmissionMembership) => item.id === this.admissionMembership.id);
        this.memberships[indexToUpdate] = response.data;
        this.admissionMembership = new AdmissionMembership();
        this.form?.resetForm(this.admissionMembership);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAdmissionMembership() {
    this.admissionMembership = new AdmissionMembership();
    this.form?.resetForm(this.admissionMembership);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAdmissionMembership(membership: any) {
    this.admissionMembership = membership;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAdmissionMembership(membership: any) {
    Swal.fire({
      title: 'Admission Membership Delete',
      text: 'Are you want to delete this Admission Membership.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteMembership(membership.id).subscribe((response:any) => {
          if(response.status){
            this.membership_user_types = this.membership_user_types.filter((item: any)  => item !== membership);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
