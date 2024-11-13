import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {Degree} from "../../../model/common-setup/degree";
import {DegreeService} from "../../../Service/common-setup/degree.service";
import {LevelOfEducationService} from "../../../Service/common-setup/levelOfEducation.service";
import {RoleService} from "../../../utility/role.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
export class DegreeComponent implements OnInit{
  @ViewChild('degreeForm') form: NgForm | undefined;
  degree  = new Degree();
  degrees:any=[];
  level_of_educations:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  levelOfEducationId:any;

  constructor(private service: DegreeService, private levelOfEductionService: LevelOfEducationService,
              private roleService: RoleService,
              private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Degree')
  }

  ngOnInit(){
    this.getLevelOfEducation();
  }
  menuRoleAccess(role: any){
    return this.roleService.hasRole(role);
  }
  getLevelOfEducation(){
    this.levelOfEductionService.getLevelOfEducation().subscribe((response:any)=>{
      this.level_of_educations = response.data;
    })
  }
  getDegree(){
    this.degrees = [];
    if(this.levelOfEducationId){
      this.service.getDegree(this.levelOfEducationId).subscribe((response:any)=>{
        this.degrees = response.data;
      })
    }else {
      this.toastr.error('Invalid Level of Education')
    }

  }

  postDegree() {
    this.degree.active = true;
    this.service.postDegree(this.degree).subscribe((response:any)=>{
      if (response.status){
        this.degree = new Degree();
        this.form?.resetForm(this.degree);
        this.degree.isVerify = false;
        this.toastr.success(response.message);
        this.degrees.push(response.data);
      }
    })
  }
  editDegree(degree: any) {
    this.degree = degree;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.degree.levelOfEducationId = degree.levelOfEducation.id;
  }
  putDegree() {
    this.service.putDegree(this.degree, this.degree.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.degrees.findIndex((item: Degree) => item.id === this.degree.id);
        this.degrees[indexToUpdate] = response.data;
        this.degree = new Degree();
        this.form?.resetForm(this.degree);
        this.degree.isVerify = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }
  cancelDegree() {
    this.degree = new Degree();
    this.form?.resetForm(this.degree);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }
  deleteDegree(degree: any) {
    Swal.fire({
      title: 'Degree Delete',
      text: 'Are you want to delete this Degree.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteDegree(degree.id).subscribe((response:any) => {
          if(response.status){
            this.degrees = this.degrees.filter((item: any)  => item !== degree);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
