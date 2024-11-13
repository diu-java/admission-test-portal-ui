import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AdmissionMembershipOrganization
} from "../../../model/admission/admission-setup/admissionMembershipOrganization";
import {NgForm} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {
  AdmissionMembershipOrganizationService
} from "../../../Service/admission/admission-setup/admissionMembershipOrganization.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-membership-organization',
  templateUrl: './admission-membership-organization.component.html',
  styleUrls: ['./admission-membership-organization.component.css']
})
export class AdmissionMembershipOrganizationComponent implements OnInit{
  @ViewChild('membershipOrganizationForm') form: NgForm | undefined;
  admissionMembershipOrganization:any = new AdmissionMembershipOrganization()
  membership_organizations:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(private service: AdmissionMembershipOrganizationService,
              private titleService: Title,
              private toastr: ToastrService) {
    this.titleService.setTitle('Admission Membership Organization')
  }
  ngOnInit() {
    this.getMembershipOrganization();
  }
  getMembershipOrganization(){
    this.service.getMembershipOrganization().subscribe((response:any)=>{
      this.membership_organizations = response.data;
    })
  }

  postMembershipOrganization() {
    this.admissionMembershipOrganization.active = true;
    this.service.postMembershipOrganization(this.admissionMembershipOrganization).subscribe((response:any)=>{
      if (response.status){
        this.admissionMembershipOrganization = new AdmissionMembershipOrganization();
        this.form?.resetForm(this.admissionMembershipOrganization);
        this.toastr.success(response.message);
        this.membership_organizations.push(response.data);
      }
    })
  }

  putMembershipOrganization() {
    this.service.putMembershipOrganization(this.admissionMembershipOrganization, this.admissionMembershipOrganization.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.membership_organizations.findIndex((item: AdmissionMembershipOrganization) => item.id === this.admissionMembershipOrganization.id);
        this.membership_organizations[indexToUpdate] = response.data;
        this.admissionMembershipOrganization = new AdmissionMembershipOrganization();
        this.form?.resetForm(this.admissionMembershipOrganization);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelMembershipOrganization() {
    this.admissionMembershipOrganization = new AdmissionMembershipOrganization();
    this.form?.resetForm(this.admissionMembershipOrganization);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editMembershipOrganization(membership_organization: any) {
    this.admissionMembershipOrganization = membership_organization;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteMembershipOrganization(membership_organization: any) {
    Swal.fire({
      title: 'Membership Organization Delete',
      text: 'Are you want to delete this Membership Organization.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteMembershipOrganization(membership_organization.id).subscribe((response:any) => {
          if(response.status){
            this.membership_organizations = this.membership_organizations.filter((item: any)  => item !== membership_organization);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
