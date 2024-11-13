import {Component, Input, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {ApplicantAward} from "../../../../model/admission/applicantInformation/applicantAward";
import {ApplicantAwardService} from "../../../../Service/admission/application/applicantAward.service";
import {ToastrService} from "ngx-toastr";
import {CountryService} from "../../../../Service/common-setup/country.service";

@Component({
  selector: 'app-applicant-award',
  templateUrl: './applicant-award.component.html',
  styleUrls: ['./applicant-award.component.css']
})
export class ApplicantAwardComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('awardForm') form: NgForm | undefined;
  admissionPerson:any = new AdmissionPerson();
  countries:any=[];
  applicantAward = new ApplicantAward();
  awards:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAwardView:boolean = false;
  loading:boolean = false;
  formSubmitted: boolean = false;
  constructor(private awardService: ApplicantAwardService, private toastr: ToastrService, private countryService: CountryService,) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getCountry();
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getAward(person?.admissionAwards);
    });
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }

  awardView() {
    this.isAwardView = !this.isAwardView;
    this.isUpdateButton = false;
    this.isSaveButton = true;
  }

  getAward(award:any){
    this.awards = award;
  }

  postAward() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantAward.admissionPersonId = this.admissionPerson.id;
    this.awardService.postAward(this.applicantAward).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.applicantAward = new ApplicantAward();
        this.form?.resetForm(this.applicantAward);
        this.toastr.success(response.message);
        this.isAwardView = false;
        this.awards.push(response.data);
      }
    })
  }

  putAward() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantAward.admissionPersonId = this.admissionPerson.id;
    this.awardService.putAward(this.applicantAward, this.applicantAward.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.awards.findIndex((item: ApplicantAward) => item.id === this.applicantAward.id);
        this.awards[indexToUpdate] = response.data;
        this.applicantAward = new ApplicantAward();
        this.form?.resetForm(this.applicantAward);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAwardView = false;
      }
    })
  }

  cancelAward() {
    this.applicantAward = new ApplicantAward();
    this.form?.resetForm(this.applicantAward);
    this.isSaveButton = true;
    this.isAwardView = !this.isAwardView;
  }

  editAward(award: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAwardView = true;
    this.applicantAward = award;
    this.applicantAward.countryId = award.country.id;
  }

  deleteAward(award: any) {
    Swal.fire({
      title: 'Award Delete',
      text: 'Are you want to delete this Award.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.awardService.deleteAward(award.id).subscribe((response:any) => {
          if(response.status){
            this.awards = this.awards.filter((item: any)  => item !== award);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
