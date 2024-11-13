import {Component, Input, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {ProfessionalExperience} from "../../../../model/admission/applicantInformation/professionalExperience";
import {
  ApplicantProfessionalExperienceService
} from "../../../../Service/admission/application/applicantProfessionalExperience.service";
import {ToastrService} from "ngx-toastr";
import {CountryService} from "../../../../Service/common-setup/country.service";

@Component({
  selector: 'app-applicant-professional-experience',
  templateUrl: './applicant-professional-experience.component.html',
  styleUrls: ['./applicant-professional-experience.component.css']
})
export class ApplicantProfessionalExperienceComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('professionalExperienceForm') form: NgForm | undefined;
  admissionPerson:any = new AdmissionPerson();
  professionalExperience = new ProfessionalExperience();
  isProfessionalExperienceView:boolean = false;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAddMore:boolean = false;
  loading:boolean = false;
  countries:any=[];
  professional_experiences:any=[];
  formSubmitted: boolean = false;
  constructor(private professionalExperienceService: ApplicantProfessionalExperienceService,
              private toastr: ToastrService,
              private countryService: CountryService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getCountry();
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getProfessionalExperience(person?.admissionJobExperiences);
    });
  }
  addMore() {
    this.isAddMore = !this.isAddMore;
  }

  professionalExperienceView() {
    this.isProfessionalExperienceView = !this.isProfessionalExperienceView;
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }
  getProfessionalExperience(professional_experience:any){
    this.professional_experiences = professional_experience;
  }

  postProfessionalExperience() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.professionalExperience.admissionPersonId = this.admissionPerson.id;
    this.professionalExperienceService.postJobExperience(this.professionalExperience).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.professionalExperience = new ProfessionalExperience();
        this.form?.resetForm(this.professionalExperience);
        this.toastr.success(response.message);
        this.isProfessionalExperienceView = false;
        this.professional_experiences.push(response.data);
      }
    })
  }

  putProfessionalExperience() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.professionalExperience.admissionPersonId = this.admissionPerson.id;
    this.professionalExperienceService.putJobExperience(this.professionalExperience, this.professionalExperience.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.professional_experiences.findIndex((item: ProfessionalExperience) => item.id === this.professionalExperience.id);
        this.professional_experiences[indexToUpdate] = response.data;
        this.professionalExperience = new ProfessionalExperience();
        this.form?.resetForm(this.professionalExperience);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isProfessionalExperienceView = false;
      }
    })
  }

  cancelProfessionalExperience() {
    this.professionalExperience = new ProfessionalExperience();
    this.form?.resetForm(this.professionalExperience);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isProfessionalExperienceView = !this.isProfessionalExperienceView;
    this.formSubmitted = false;
  }

  editProfessionalExperience(professional_experience: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isProfessionalExperienceView = true;
    this.professionalExperience = professional_experience;
    this.professionalExperience.countryId = professional_experience.country.id;
  }

  deleteProfessionalExperience(professional_experience: any) {
    Swal.fire({
      title: 'Professional Experience Delete',
      text: 'Are you want to delete this Award.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.professionalExperienceService.deleteJobExperience(professional_experience.id).subscribe((response:any) => {
          if(response.status){
            this.professional_experiences = this.professional_experiences.filter((item: any)  => item !== professional_experience);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
