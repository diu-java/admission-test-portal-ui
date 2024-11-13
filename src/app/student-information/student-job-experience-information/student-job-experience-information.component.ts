import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonInformation} from "../../model/student/personInformation";
import {JobExperience} from "../../model/student/jobExperience";
import {ToastrService} from "ngx-toastr";
import {CountryService} from "../../Service/common-setup/country.service";
import {StudentJobExperienceService} from "../../Service/student/studentJobExperience.service";
import Swal from "sweetalert2";
import {StudentInformation} from "../../model/student/studentInformation";

@Component({
  selector: 'app-student-job-experience-information',
  templateUrl: './student-job-experience-information.component.html',
  styleUrls: ['./student-job-experience-information.component.css']
})
export class StudentJobExperienceInformationComponent implements OnInit{
  @ViewChild('jobExperienceForm') form: NgForm | undefined;
  @Input() studentInformation:any = new StudentInformation();
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isJobExperienceInfoView:boolean = false;
  loading:boolean = false;
  formSubmitted:boolean = false;

  jobExperience = new JobExperience();
  job_experiences:any=[];
  countries:any=[];

  constructor(private toastr: ToastrService, private countryService: CountryService, private jobExperienceService: StudentJobExperienceService) {
  }
  ngOnInit() {
    this.getPersonInformationView();
    this.getCountry();
  }
  getPersonInformationView(){
    this.getJobExperience(this.studentInformation.studentPerson.id);
    // this.route.params.subscribe((params)=>{
    //   const personId = +params['id'];
    //   this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
    //     this.personInformation = response.data;
    //     this.getJobExperience(this.personInformation.id);
    //   });
    // })
  }
  jobExperienceInfoView() {
    this.isJobExperienceInfoView = true;
    this.formSubmitted = false;
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }
  // Job Experience Start
  getJobExperience(personId:any){
    this.jobExperienceService.getJobExperience(personId).subscribe((response:any)=>{
      this.job_experiences = response.data;
    })
  }

  postJobExperience() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.jobExperience.studentPersonId = this.studentInformation.studentPerson.id;
    this.jobExperienceService.postJobExperience(this.jobExperience).subscribe((response:any)=>{
      if (response.status){
        this.jobExperience = new JobExperience();
        this.form?.resetForm(this.jobExperience);
        this.toastr.success(response.message);
        this.job_experiences.push(response.data);
        this.isJobExperienceInfoView = false;
      }
    })
  }

  putJobExperience() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.jobExperience.studentPersonId = this.studentInformation.studentPerson.id;
    this.jobExperienceService.putJobExperience(this.jobExperience, this.jobExperience.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.job_experiences.findIndex((item: JobExperience) => item.id === this.jobExperience.id);
        this.job_experiences[indexToUpdate] = response.data;
        this.jobExperience = new JobExperience();
        this.form?.resetForm(this.jobExperience);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isJobExperienceInfoView = false;
      }
    })
  }

  cancelJobExperience() {
    this.jobExperience = new JobExperience();
    this.form?.resetForm(this.jobExperience);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isJobExperienceInfoView = false;
  }

  editJobExperience(job_experience: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isJobExperienceInfoView = true;
    this.jobExperience = job_experience;
    this.jobExperience.countryId = job_experience.country.id;
  }

  deleteJobExperience(job_experience: any) {
    Swal.fire({
      title: 'Job Experience Delete',
      text: 'Are you want to delete this Job Experience.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.jobExperienceService.deleteJobExperience(job_experience.id).subscribe((response:any) => {
          if(response.status){
            this.job_experiences = this.job_experiences.filter((item: any)  => item !== job_experience);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
