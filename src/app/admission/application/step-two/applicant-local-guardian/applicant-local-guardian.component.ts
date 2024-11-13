import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RelationService} from "../../../../Service/common-setup/relation.service";
import {
  ApplicantGroupInsuranceService
} from "../../../../Service/admission/application/applicantGroupInsurance.service";
import {ApplicantFamilyService} from "../../../../Service/admission/application/applicantFamily.service";
import {ApplicantEmergencyContact} from "../../../../model/admission/applicantInformation/applicantEmergencyContact";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {ApplicantGroupInsurance} from "../../../../model/admission/applicantInformation/applicantGroupInsurance";
import {
  ApplicantEmergencyContactService
} from "../../../../Service/admission/application/applicantEmergencyContact.service";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
@Component({
  selector: 'app-applicant-local-guardian',
  templateUrl: './applicant-local-guardian.component.html',
  styleUrls: ['./applicant-local-guardian.component.css']
})
export class ApplicantLocalGuardianComponent implements OnInit {
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('emergencyContactForm') form: NgForm | undefined;
  @ViewChild('groupInsuranceForm') formGroupInsurance: NgForm | undefined;
  applicantEmergencyContact:ApplicantEmergencyContact = new ApplicantEmergencyContact();
  admissionPerson = new AdmissionPerson();
  applicantGroupInsurance:any = new ApplicantGroupInsurance();
  countries:any=[];
  relations:any=[];
  relation_groups:any=[];
  emergency_contacts:any=[];
  group_insurances:any=[];
  family:any=[];
  checkOther:any;
  isSaveButton: boolean = true;
  isUpdateButton: boolean = false;
  isLocalGuardianView: boolean = false;
  isGroupInsuranceView: boolean = false;
  loading: boolean = false;
  payment:any;
  submittedEmergencyContact:boolean = false;
  formSubmitted:boolean = false;
  constructor(private relationService: RelationService,
              private applicantGroupInsuranceService: ApplicantGroupInsuranceService, private familyService: ApplicantFamilyService,
              private emergencyContactService: ApplicantEmergencyContactService,
              private toastr: ToastrService,) {
  }
  ngOnInit() {
    this.getRelation();
    this.getAdmissionApplicationView();
    this.getRelationGroup();
  }
  getAdmissionApplicationView() {
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getEmergencyContact(person?.admissionEmergencyContacts);
      this.getGroupInsurance(person?.admissionGroupInsurances);
    });
  }

  getRelation() {
    this.relationService.getRelationActive().subscribe((response: any) => {
      this.relations = response.data;
    })
  }

  getRelationGroup() {
    this.relationService.getRelationActive().subscribe((response: any) => {
      this.relation_groups = response.data.filter((item:any)=> item.code === 'F' || item.code === 'M' || item.code === 'o');
    })
  }
  getEmergencyContact(emergency_contact:any){
    this.emergency_contacts = emergency_contact;
  }
  postEmergencyContact() {
    this.submittedEmergencyContact = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantEmergencyContact.admissionPersonId = this.admissionPerson.id;
    this.emergencyContactService.postEmergencyContact(this.applicantEmergencyContact).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.applicantEmergencyContact = new ApplicantEmergencyContact();
        this.form?.resetForm(this.applicantEmergencyContact);
        this.toastr.success(response.message);
        this.emergency_contacts.push(response.data);
        this.isLocalGuardianView = false;
      }
    })
  }
  putEmergencyContact() {
    this.submittedEmergencyContact = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantEmergencyContact.admissionPersonId = this.admissionPerson.id;
    this.emergencyContactService.putEmergencyContact(this.applicantEmergencyContact, this.applicantEmergencyContact.id).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        let indexToUpdate = this.emergency_contacts.findIndex((item: ApplicantEmergencyContact) => item.id === this.applicantEmergencyContact.id);
        this.emergency_contacts[indexToUpdate] = response.data;
        this.applicantEmergencyContact = new ApplicantEmergencyContact();
        this.form?.resetForm(this.applicantEmergencyContact);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isLocalGuardianView = false;
      }
    })
  }

  localGuardianView() {
    this.isLocalGuardianView = !this.isLocalGuardianView;
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  cancelEmergencyContact() {
    this.applicantEmergencyContact = new ApplicantEmergencyContact();
    this.form?.resetForm(this.applicantEmergencyContact);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isLocalGuardianView = !this.isLocalGuardianView;
    this.submittedEmergencyContact = false;
  }

  editEmergencyContact(emergency_contact: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isLocalGuardianView = true;
    this.applicantEmergencyContact = emergency_contact;
    this.applicantEmergencyContact.relationId = emergency_contact.relation.id;
  }

  deleteEmergencyContact(emergency_contact: any) {
    Swal.fire({
      title: 'Local Guardian Information Delete',
      text: 'Are you want to delete this Local Guardian Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.emergencyContactService.deleteEmergencyContact(emergency_contact.id).subscribe((response:any) => {
          if(response.status){
            this.emergency_contacts = this.emergency_contacts.filter((item: any)  => item !== emergency_contact);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  getGroupInsurance(group_insurance:any){
    this.group_insurances = group_insurance;
  }

  formatName(name: any) {
    if (name) {
      const formattedName = name.split(' ').map((word: string) => {
        const parts = word.split('-').map((part: string) => {
          if (part.endsWith('.')) {
            return part;
          } else if (part.includes('.')) {
            return part.split('.').map((subPart: string) => subPart.toUpperCase()).join('.');
          } else {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          }
        });
        return parts.join('-');
      }).join(' ');
      return formattedName;
    }
  }
}
