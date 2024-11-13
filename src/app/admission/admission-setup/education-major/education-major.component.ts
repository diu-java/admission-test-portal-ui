import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {EducationMajor} from "../../../model/common-setup/educationMajor";
import {EducationMajorService} from "../../../Service/common-setup/educationMajor.service";
import {DegreeService} from "../../../Service/common-setup/degree.service";
import {LevelOfEducationService} from "../../../Service/common-setup/levelOfEducation.service";

@Component({
  selector: 'app-education-major',
  templateUrl: './education-major.component.html',
  styleUrls: ['./education-major.component.css']
})
export class EducationMajorComponent implements OnInit{
  @ViewChild('educationMajorForm') form: NgForm | undefined;
  educationMajor  = new EducationMajor();
  education_majors:any=[];
  level_of_educations:any=[];
  degrees:any=[];
  degree_lists:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  levelOfEducationId:any;
  degreeId:any;
  constructor( private service: EducationMajorService, private degreeService: DegreeService, private levelOfEducationService: LevelOfEducationService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Education Major')
  }
  ngOnInit() {
    this.getLevelOfEducation()
  }

  getEducationMajor(){
    this.education_majors = [];
    if(this.degreeId){
      this.service.getEducationMajor(this.degreeId).subscribe((response:any)=>{
        this.education_majors = response.data;
      })
    }else {
      this.toastr.error('Invalid Degree')
    }
  }
  getLevelOfEducation(){
    this.levelOfEducationService.getLevelOfEducation().subscribe((response:any)=>{
      this.level_of_educations = response.data;
    })
  }
  getDegree(levelOfEducationId:any){
    this.degrees = [];
    this.educationMajor.degreeId = undefined;
    this.educationMajor.levelOfEducationId = undefined;
    if(levelOfEducationId){
      this.degreeService.getDegreeActive(levelOfEducationId).subscribe((response:any)=>{
        this.degrees = response.data;
      })
    }else {
      this.toastr.error('Invalid Level of Education')
    }
  }
  getDegreeList(levelOfEducationId:any){
    this.education_majors=[];
    this.degree_lists = [];
    this.degreeId = undefined;
    this.levelOfEducationId = undefined;
    if(levelOfEducationId){
      this.degreeService.getDegreeActive(levelOfEducationId).subscribe((response:any)=>{
        this.degree_lists = response.data;
      })
    }else {
      this.toastr.error('Invalid Level of Education')
    }
  }


  postEducationMajor() {
    this.educationMajor.active = true;
    this.service.postEducationMajor(this.educationMajor).subscribe((response:any)=>{
      if (response.status){
        this.educationMajor = new EducationMajor();
        this.form?.resetForm(this.educationMajor);
        this.toastr.success(response.message);
        this.education_majors.push(response.data);
      }
    })
  }

  putEducationMajor() {
    this.service.putEducationMajor(this.educationMajor, this.educationMajor.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.education_majors.findIndex((item: EducationMajor) => item.id === this.educationMajor.id);
        this.education_majors[indexToUpdate] = response.data;
        this.educationMajor = new EducationMajor();
        this.form?.resetForm(this.educationMajor);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelEducationMajor() {
    this.educationMajor = new EducationMajor();
    this.form?.resetForm(this.educationMajor);
    this.educationMajor.levelOfEducationId = undefined;
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editEducationMajor(education_major: any) {
    this.educationMajor = education_major;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.getDegree(education_major.degree.levelOfEducation.id)
    this.educationMajor.levelOfEducationId = education_major.degree.levelOfEducation.id;
    this.educationMajor.degreeId = education_major.degree.id;
  }

  deleteEducationMajor(education_major: any) {
    Swal.fire({
      title: 'Education Institute Type Delete',
      text: 'Are you want to delete this Education Institute Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteEducationMajor(education_major.id).subscribe((response:any) => {
          if(response.status){
            this.education_majors = this.education_majors.filter((item: any)  => item !== education_major);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
}
