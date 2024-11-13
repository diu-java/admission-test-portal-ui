import {Component, OnInit} from '@angular/core';
import {PersonInformation} from "../../model/student/personInformation";
import {GenderService} from "../../Service/common-setup/gender.service";
import {BloodGroupService} from "../../Service/common-setup/bloodGroup.service";
import {MaritalStatusService} from "../../Service/common-setup/maritalStatus.service";
import {CountryService} from "../../Service/common-setup/country.service";
import {PersonInformationService} from "../../Service/student/personInformation.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit{
  personInformation = new PersonInformation();
  activeTab: number = 1;
  genders:any=[];
  blood_groups:any=[];
  marital_statuses:any=[];
  countries:any=[];
  isMarried:boolean = false;
  constructor(private genderService: GenderService, private bloodGroupService: BloodGroupService,
              private service: PersonInformationService,
              private maritalStatusService: MaritalStatusService, private countryService: CountryService,
              private toastr: ToastrService, private router: Router) {
  }
  ngOnInit() {
    this.getGender();
    this.getBloodGroup();
    this.getMaritalStatus();
    this.getCountry();
  }
  activateTab(tabName: number) {
    this.activeTab = tabName;
  }
  getGender(){
    this.genderService.getGenderActive().subscribe((response:any)=>{
      this.genders = response.data;
    })
  }
  getBloodGroup(){
    this.bloodGroupService.getBloodGroupActive().subscribe((response:any)=>{
      this.blood_groups = response.data;
    })
  }
  getMaritalStatus(){
    this.maritalStatusService.getMaritalStatusActive().subscribe((response:any)=>{
      this.marital_statuses = response.data;

    })
  }
  selectMaritalStatus(){
    let indexToUpdate = this.marital_statuses.findIndex((item:any)=> item.id === this.personInformation.maritalStatusId && item.isDetail);
    console.log(indexToUpdate)
    if(indexToUpdate !== -1){
      this.isMarried = true;
    }else {
      this.isMarried = false;
    }
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }

  postPerson() {
    this.service.postPersonInformation(this.personInformation).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        this.router.navigate(['/student-profile', response.data.id]);
      }
    })
  }
}
