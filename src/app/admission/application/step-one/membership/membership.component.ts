import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApplicationMembership} from "../../../../model/admission/applicantInformation/applicationMembership";
import {NgForm} from "@angular/forms";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {
  ApplicantMembershipInformationService
} from "../../../../Service/admission/application/applicantMembershipInformation.service";
import {ToastrService} from "ngx-toastr";
import {
  AdmissionMembershipOrganizationService
} from "../../../../Service/admission/admission-setup/admissionMembershipOrganization.service";
import {
  AdmissionMembershipUserTypeService
} from "../../../../Service/admission/admission-setup/admissionMembershipUserType.service";
import Swal from "sweetalert2";
import {ApplicantGroupInsurance} from "../../../../model/admission/applicantInformation/applicantGroupInsurance";
import {ApplicantFamily} from "../../../../model/admission/applicantInformation/applicantFamily";

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('membershipInformationForm') form: NgForm | undefined;
  isDIU:boolean = false;
  loading:boolean = false;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isMembership:boolean = false;
  applicantMembership:any = new ApplicationMembership();
  admissionPerson:any = new AdmissionPerson();
  admission_membership_organizations:any=[];
  membership_types:any=[];
  memberships:any=[]
  formSubmitted: boolean = false;
  constructor(private applicantMembershipService: ApplicantMembershipInformationService,
              private admissionMembershipOrganizationService: AdmissionMembershipOrganizationService,
              private membershipTypeService: AdmissionMembershipUserTypeService,
              private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getMembershipOrganization();
    this.getMembershipType();
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getApplicantMembership(person?.admissionMemberships)
    });
  }
  getMembershipOrganization(){
    this.admissionMembershipOrganizationService.getMembershipOrganizationActive().subscribe((response:any)=>{
      this.admission_membership_organizations = response.data;
    })
  }
  getMembershipType(){
    this.membershipTypeService.getMembershipUserTypeActive().subscribe((response:any)=>{
      this.membership_types = response.data;
    })
  }
  getApplicantMembership(applicant_membership:any){
    this.memberships = applicant_membership;
    // if(applicant_membership.length){
    //   this.applicantMembership.id = applicant_membership[0].id;
    //   this.applicantMembership.admissionMembershipOrganizationId = applicant_membership[0].admissionMembershipOrganization.id;
    //   this.applicantMembership.admissionMembershipUserTypeId = applicant_membership[0].admissionMembershipUserType.id;
    //   this.applicantMembership.code = applicant_membership[0].code;
    //   this.isUpdateButton = true;
    //   this.isSaveButton = false;
    //   this.isDIU = true;
    // }
  }

  postApplicantMembership() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantMembership.admissionPersonId = this.admissionPerson.id;
    this.applicantMembership.active = true;
    this.applicantMembershipService.postMembershipInformation(this.applicantMembership).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.memberships.push(response.data);
        this.toastr.success(response.message);
        this.applicantMembership = new ApplicantFamily();
        this.form?.resetForm(this.applicantMembership);
        this.isMembership = false;
      }
    })
  }

  putApplicantMembership() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantMembership.admissionPersonId = this.admissionPerson.id;
    this.applicantMembership.active = true;
    this.applicantMembershipService.putMembershipInformation(this.applicantMembership, this.applicantMembership.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.memberships.findIndex((item: ApplicationMembership) => item.id === this.applicantMembership.id);
        this.memberships[indexToUpdate] = response.data;
        this.applicantMembership = new ApplicationMembership();
        this.form?.resetForm(this.applicantMembership);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isMembership = false;
      }
    })
  }

  membershipView() {
    this.isMembership = true;
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editMembership(membership: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isMembership = true;
    this.applicantMembership = membership;
    this.applicantMembership.admissionMembershipOrganizationId = membership.admissionMembershipOrganization.id;
    this.applicantMembership.admissionMembershipUserTypeId = membership.admissionMembershipUserType.id;
  }

  deleteMembership(membership: any) {
    Swal.fire({
      title: 'Membership Delete',
      text: 'Are you want to delete this Membership.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.applicantMembershipService.deleteMembershipInformation(membership.id).subscribe((response:any) => {
          if(response.status){
            this.memberships = this.memberships.filter((item: any)  => item !== membership);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  cancel() {
    this.applicantMembership = new ApplicationMembership();
    this.form?.resetForm(this.applicantMembership);
    this.isMembership = false;
    this.formSubmitted = false;
  }
}
