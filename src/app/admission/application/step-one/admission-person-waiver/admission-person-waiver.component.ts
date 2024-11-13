import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {NgForm} from "@angular/forms";
import {
  AdmissionWaiverCategoryService
} from "../../../../Service/admission/admission-setup/admissionWaiverCategory.service";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {AdmissionWaiverCategory} from "../../../../model/admission/admission-setup/admissionWaiverCategory";
import {AdmissionPersonWaiver} from "../../../../model/admission/applicantInformation/admissionPersonWaiver";
import {AdmissionPersonWaiverService} from "../../../../Service/admission/application/admissionPersonWaiver.service";
import {ToastrService} from "ngx-toastr";
import {ApplicantEmergencyContact} from "../../../../model/admission/applicantInformation/applicantEmergencyContact";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-person-waiver',
  templateUrl: './admission-person-waiver.component.html',
  styleUrls: ['./admission-person-waiver.component.css']
})
export class AdmissionPersonWaiverComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('admissionPersonWaiverForm') form: NgForm | undefined;

  admissionPerson = new AdmissionPerson();
  admissionPersonWaiver  = new AdmissionPersonWaiver();
  waiver_categories:any=[];
  admission_person_waivers:any=[]
  loading:boolean = false;
  isPersonWaiverView:boolean = false;
  formSubmitted:boolean = false;
  isSaveButton: boolean = true;
  isUpdateButton: boolean = false;
  constructor(private admissionWaiverCategoryService: AdmissionWaiverCategoryService,
              private admissionPersonWaiverService: AdmissionPersonWaiverService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getWaiverCategory();
    this.getAdmissionApplicationView();

  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getAdmissionPersonWaiver(person?.admissionPersonWaivers)
    })
  }
  getWaiverCategory(){
    this.admissionWaiverCategoryService.getWaiverCategoryActive().subscribe((response:any)=>{
      this.waiver_categories = response.data;
    })
  }
  getAdmissionPersonWaiver(waivers:any){
    this.admission_person_waivers = waivers;
  }
  admissionPersonWaiverView(){
    this.isPersonWaiverView = !this.isPersonWaiverView;
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }
  postAdmissionPersonWaiver() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.admissionPersonWaiver.admissionPersonId = this.admissionPerson.id;
    this.admissionPersonWaiverService.postAdmissionPersonWaiver(this.admissionPersonWaiver).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.admissionPersonWaiver = new AdmissionPersonWaiver();
        this.form?.resetForm(this.admissionPersonWaiver);
        this.toastr.success(response.message);
        this.admission_person_waivers.push(response.data);
        this.isPersonWaiverView = false;
      }
    })
  }
  editAdmissionPersonWaiver(admission_person_waiver: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isPersonWaiverView = true;
    this.admissionPersonWaiver = admission_person_waiver;
    this.admissionPersonWaiver.waiverCategoryId = admission_person_waiver.waiverCategory.id;
  }
  putAdmissionPersonWaiver() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.admissionPersonWaiver.admissionPersonId = this.admissionPerson.id;
    this.admissionPersonWaiverService.putAdmissionPersonWaiver(this.admissionPersonWaiver, this.admissionPersonWaiver.id).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        let indexToUpdate = this.admission_person_waivers.findIndex((item: AdmissionPersonWaiver) => item.id === this.admissionPersonWaiver.id);
        this.admission_person_waivers[indexToUpdate] = response.data;
        this.admissionPersonWaiver = new AdmissionPersonWaiver();
        this.form?.resetForm(this.admissionPersonWaiver);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isPersonWaiverView = false;
      }
    })
  }

  cancelAdmissionPersonWaiver() {
    this.admissionPersonWaiver = new AdmissionPersonWaiver();
    this.form?.resetForm(this.admissionPersonWaiver);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isPersonWaiverView = !this.isPersonWaiverView;
    this.formSubmitted = false;
  }

  deleteAdmissionPersonWaiver(admission_person_waiver: any) {
    Swal.fire({
      title: 'Admission Waiver Delete',
      text: 'Are you want to delete this Admission Waiver.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionPersonWaiverService.deleteAdmissionPersonWaiver(admission_person_waiver.id).subscribe((response:any) => {
          if(response.status){
            this.admission_person_waivers = this.admission_person_waivers.filter((item: any)  => item !== admission_person_waiver);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
