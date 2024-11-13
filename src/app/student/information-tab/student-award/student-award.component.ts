import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {CountryService} from "../../../Service/common-setup/country.service";
import {PersonInformation} from "../../../model/student/personInformation";
import {PersonInformationService} from "../../../Service/student/personInformation.service";
import {Award} from "../../../model/student/award";
import {StudentAwardService} from "../../../Service/student/studentAward.service";

@Component({
  selector: 'app-student-award',
  templateUrl: './student-award.component.html',
  styleUrls: ['./student-award.component.css']
})
export class StudentAwardComponent implements OnInit{
  @ViewChild('awardForm') formAward: NgForm | undefined;
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAwardInfoView:boolean = false;

  award = new Award();
  awards:any=[];
  countries:any=[];
  constructor(private service: PersonInformationService,
              private route: ActivatedRoute,
              private toastr: ToastrService, private awardService: StudentAwardService, private countryService: CountryService) {
  }
  ngOnInit() {
    this.getPersonInformationView();
    this.getCountry();
  }

  getPersonInformationView(){
    this.route.params.subscribe((params)=>{
      const personId = +params['id'];
      this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
        this.personInformation = response.data;
        this.getAward(this.personInformation.id);
      });
    })
  }
  awardInfoView() {
    this.isAwardInfoView = true;
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }

  // Award Start
  getAward(personId:any){
    this.awardService.getAward(personId).subscribe((response:any)=>{
      this.awards = response.data;
    })
  }

  postAward() {
    this.award.studentPersonId = this.personInformation.id;
    this.awardService.postAward(this.award).subscribe((response:any)=>{
      if (response.status){
        this.award = new Award();
        this.formAward?.resetForm(this.award);
        this.toastr.success(response.message);
        this.awards.push(response.data);
      }
    })
  }

  putAward() {
    this.award.studentPersonId = this.personInformation.id;
    this.awardService.putAward(this.award, this.award.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.awards.findIndex((item: Award) => item.id === this.award.id);
        this.awards[indexToUpdate] = response.data;
        this.award = new Award();
        this.formAward?.resetForm(this.award);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAward() {
    this.award = new Award();
    this.formAward?.resetForm(this.award);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAward(award: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAwardInfoView = true;
    this.award = award;
    this.award.countryId = award.country.id;
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
  // Award End
}
