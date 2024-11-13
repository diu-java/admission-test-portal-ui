import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonInformation} from "../../model/student/personInformation";
import {Research} from "../../model/student/research";
import {PersonInformationService} from "../../Service/student/personInformation.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {StudentResearchService} from "../../Service/student/studentResearch.service";
import {CountryService} from "../../Service/common-setup/country.service";
import Swal from "sweetalert2";
import {StudentInformation} from "../../model/student/studentInformation";

@Component({
  selector: 'app-student-research-information',
  templateUrl: './student-research-information.component.html',
  styleUrls: ['./student-research-information.component.css']
})
export class StudentResearchInformationComponent implements OnInit{
  @Input() studentInformation:any = new StudentInformation();
  @ViewChild('researchForm') formResearch: NgForm | undefined;
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isResearchInfoView:boolean = false;

  research = new Research();
  researches:any=[];
  countries:any=[];


  constructor(private service: PersonInformationService,
              private route: ActivatedRoute,
              private toastr: ToastrService, private researchService: StudentResearchService, private countryService: CountryService) {
  }
  ngOnInit() {
    this.getPersonInformationView();
    this.getCountry();
  }
  getPersonInformationView(){
    this.getResearch(this.studentInformation.studentPerson.id);
    // this.route.params.subscribe((params)=>{
    //   const personId = +params['id'];
    //   this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
    //     this.personInformation = response.data;
    //     this.getResearch(this.personInformation.id);
    //   });
    // })
  }
  researchInfoView() {
    this.isResearchInfoView = !this.isResearchInfoView;
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }

  // Research Start
  getResearch(personId:any){
    this.researchService.getResearch(personId).subscribe((response:any)=>{
      this.researches = response.data;
    })
  }

  postResearch() {
    this.research.studentPersonId = this.studentInformation.studentPerson.id;
    this.researchService.postResearch(this.research).subscribe((response:any)=>{
      if (response.status){
        this.research = new Research();
        this.formResearch?.resetForm(this.research);
        this.toastr.success(response.message);
        this.researches.push(response.data);
        this.isResearchInfoView = false;
      }
    })
  }

  putResearch() {
    this.research.studentPersonId = this.studentInformation.studentPerson.id;
    this.researchService.putResearch(this.research, this.research.id).subscribe((response:any)=>{
      if (response.status){
        this.research = new Research();
        this.formResearch?.resetForm(this.research);
        let indexToUpdate = this.researches.findIndex((item: Research) => item.id === this.research.id);
        this.researches[indexToUpdate] = response.data;
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isResearchInfoView = false;
      }
    })
  }

  cancelResearch() {
    this.research = new Research();
    this.formResearch?.resetForm(this.research);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isResearchInfoView = false;
  }

  editResearch(research: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isResearchInfoView = true;
    this.research = research;
  }

  deleteResearch(research: any) {
    Swal.fire({
      title: 'Research Delete',
      text: 'Are you want to delete this Research.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.researchService.deleteResearch(research.id).subscribe((response:any) => {
          if(response.status){
            this.researches = this.researches.filter((item: any)  => item !== research);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
