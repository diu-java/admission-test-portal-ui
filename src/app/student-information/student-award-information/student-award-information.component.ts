import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonInformation} from "../../model/student/personInformation";
import {Award} from "../../model/student/award";
import {PersonInformationService} from "../../Service/student/personInformation.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {StudentAwardService} from "../../Service/student/studentAward.service";
import {CountryService} from "../../Service/common-setup/country.service";
import Swal from "sweetalert2";
import {StudentInformation} from "../../model/student/studentInformation";

@Component({
  selector: 'app-student-award-information',
  templateUrl: './student-award-information.component.html',
  styleUrls: ['./student-award-information.component.css']
})
export class StudentAwardInformationComponent implements OnInit{
  @Input() studentInformation:any = new StudentInformation();
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
    this.getAward(this.studentInformation.studentPerson.id);
    // this.route.params.subscribe((params)=>{
    //   const personId = +params['id'];
    //   this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
    //     this.personInformation = response.data;
    //     this.getAward(this.personInformation.id);
    //   });
    // })
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
    this.award.studentPersonId = this.studentInformation.studentPerson.id;
    this.awardService.postAward(this.award).subscribe((response:any)=>{
      if (response.status){
        this.award = new Award();
        this.formAward?.resetForm(this.award);
        this.toastr.success(response.message);
        this.awards.push(response.data);
        this.isAwardInfoView = false;
      }
    })
  }

  putAward() {
    this.award.studentPersonId = this.studentInformation.studentPerson.id;
    this.awardService.putAward(this.award, this.award.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.awards.findIndex((item: Award) => item.id === this.award.id);
        this.awards[indexToUpdate] = response.data;
        this.award = new Award();
        this.formAward?.resetForm(this.award);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAwardInfoView = false;
      }
    })
  }

  cancelAward() {
    this.award = new Award();
    this.formAward?.resetForm(this.award);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAwardInfoView = false;
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
}
