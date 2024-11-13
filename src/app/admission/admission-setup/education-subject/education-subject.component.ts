import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {EducationMajor} from "../../../model/common-setup/educationMajor";
import {DegreeService} from "../../../Service/common-setup/degree.service";
import {LevelOfEducationService} from "../../../Service/common-setup/levelOfEducation.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {EducationSubject} from "../../../model/common-setup/educationSubject";
import {EducationSubjectService} from "../../../Service/common-setup/educationSubject.service";

@Component({
  selector: 'app-education-subject',
  templateUrl: './education-subject.component.html',
  styleUrls: ['./education-subject.component.css']
})
export class EducationSubjectComponent implements OnInit{
  @ViewChild('educationSubjectForm') form: NgForm | undefined;
  educationSubject  = new EducationSubject();
  education_subjects:any=[];
  level_of_educations:any=[];
  degrees:any=[];
  degree_lists:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  levelOfEducationId:any;
  degreeId:any;
  constructor( private service: EducationSubjectService, private degreeService: DegreeService, private levelOfEducationService: LevelOfEducationService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Education Subject')
  }
  ngOnInit() {
    this.getLevelOfEducation()
  }

  getEducationSubject(){
    this.education_subjects=[];
    if(this.degreeId){
      this.service.getEducationSubjectActive(this.degreeId).subscribe((response:any)=>{
        this.education_subjects = response.data;
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
    this.educationSubject.degreeId = undefined;
    this.educationSubject.levelOfEducationId = undefined;
    if(levelOfEducationId){
      this.degreeService.getDegreeActive(levelOfEducationId).subscribe((response:any)=>{
        this.degrees = response.data;
      })
    }else {
      this.toastr.error('Invalid Level of Education')
    }
  }

  getDegreeList(levelOfEducationId:any){
    this.education_subjects=[];
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

  postEducationSubject() {
    this.educationSubject.active = true;
    this.service.postEducationSubject(this.educationSubject).subscribe((response:any)=>{
      if (response.status){
        this.educationSubject = new EducationSubject();
        this.form?.resetForm(this.educationSubject);
        this.toastr.success(response.message);
        this.education_subjects.push(response.data);
      }
    })
  }

  putEducationSubject() {
    this.service.putEducationSubject(this.educationSubject, this.educationSubject.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.education_subjects.findIndex((item: EducationSubject) => item.id === this.educationSubject.id);
        this.education_subjects[indexToUpdate] = response.data;
        this.educationSubject = new EducationSubject();
        this.form?.resetForm(this.educationSubject);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelEducationSubject() {
    this.educationSubject = new EducationSubject();
    this.form?.resetForm(this.educationSubject);
    this.educationSubject.levelOfEducationId = undefined;
    this.isSaveButton = true;
    this.isUpdateButton = false;

  }

  editEducationSubject(education_subject: any) {
    console.log(education_subject)
    this.educationSubject = education_subject;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.getDegree(education_subject.degree.levelOfEducation.id)
    this.educationSubject.levelOfEducationId = education_subject.degree.levelOfEducation.id;
    this.educationSubject.degreeId = education_subject.degree.id;
  }

  deleteEducationSubject(education_subject: any) {
    Swal.fire({
      title: 'Education Subject Delete',
      text: 'Are you want to delete this Education Subject.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteEducationSubject(education_subject.id).subscribe((response:any) => {
          if(response.status){
            this.education_subjects = this.education_subjects.filter((item: any)  => item !== education_subject);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
}
