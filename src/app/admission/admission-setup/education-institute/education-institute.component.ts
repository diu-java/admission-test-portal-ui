import {Component, OnInit, ViewChild} from '@angular/core';
import {EducationInstitute} from "../../../model/common-setup/educationInstitute";
import {EducationMajor} from "../../../model/common-setup/educationMajor";
import Swal from "sweetalert2";
import {EducationInstituteTypeService} from "../../../Service/common-setup/educationInstituteType.service";
import {EducationInstituteService} from "../../../Service/common-setup/educationInstitute.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {LevelOfEducationService} from "../../../Service/common-setup/levelOfEducation.service";
import {EducationInstituteLevel} from "../../../model/common-setup/educationInstituteLevel";

@Component({
  selector: 'app-education-institute',
  templateUrl: './education-institute.component.html',
  styleUrls: ['./education-institute.component.css']
})
export class EducationInstituteComponent implements OnInit{
  @ViewChild('educationInstituteForm') form: NgForm | undefined;
  educationInstitute:any = new EducationInstitute();
  educationInstituteLevel:any = new EducationInstituteLevel()
  levels:any = [];
  institute_types:any=[];
  education_institutes:any=[];
  level_of_educations:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  instituteTypeId:any;
  search:any = '';
  page: number = 0;
  total: number = 0;
  size:number = 10;
  constructor(private educationInstituteTypeService: EducationInstituteTypeService, private levelOfEducationService: LevelOfEducationService,
              private service: EducationInstituteService, private toastr: ToastrService, private titleService: Title) {
    this.titleService.setTitle('Education Institute')
  }
  ngOnInit() {
    this.getEducationInstituteType()
    this.getEducationInstitute();
    this.getLevelOfEducation()
  }

  getEducationInstituteType(){
    this.educationInstituteTypeService.getEducationInstituteTypeActive().subscribe((response:any)=>{
      this.institute_types = response.data;
    })
  }
  getEducationInstitute(){
    this.service.getEducationInstitutePagination(this.search, this.size, this.page).subscribe((response:any)=>{
        this.education_institutes = response.data.content;
        this.total = response.data.totalElements;
    })
  }
  getFilteredInstitutes() {
    return this.education_institutes.filter((institute: any) =>
      institute.code.toLowerCase().includes(this.search.toLowerCase()) ||
      institute.name.toLowerCase().includes(this.search.toLowerCase()) ||
      (institute.educationInstituteType?.name || '').toLowerCase().includes(this.search.toLowerCase()) ||
      institute.educationInstituteLevels.some((item: any) =>
        item.levelOfEducation.name.toLowerCase().includes(this.search.toLowerCase())
      )
    );
  }
  getLevelOfEducation(){
    this.levelOfEducationService.getLevelOfEducation().subscribe((response:any)=>{
      this.level_of_educations = response.data;
    })
  }
  pageChangeEvent(event: number) {
    this.page = event-1;
    this.getEducationInstitute();
  }

  postEducationInstitute() {
    this.educationInstitute.active = true;
    this.service.postEducationInstitute(this.educationInstitute).subscribe((response:any)=>{
      if (response.status){
        this.educationInstitute = new EducationInstitute();
        this.form?.resetForm(this.educationInstitute);
        this.toastr.success(response.message);
        this.education_institutes.push(response.data);
      }
    })
  }

  putEducationInstitute() {
    this.service.putEducationInstitute(this.educationInstitute, this.educationInstitute.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.education_institutes.findIndex((item: EducationMajor) => item.id === this.educationInstitute.id);
        this.education_institutes[indexToUpdate] = response.data;
        this.educationInstitute = new EducationInstitute();
        this.form?.resetForm(this.educationInstitute);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelEducationInstitute() {
    this.educationInstitute = new EducationInstitute();
    this.form?.resetForm(this.educationInstitute);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editEducationInstitute(education_institute: any) {
    this.educationInstitute = education_institute;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.educationInstitute.educationInstituteTypeId = education_institute.educationInstituteType.id;
    this.levels = [];
    for (let i = 0; i < education_institute.educationInstituteLevels.length; i++) {
      this.levels.push(education_institute.educationInstituteLevels[i].levelOfEducation.id);
    }
    this.instituteLevelOfEducationVal();
  }

  deleteEducationInstitute(education_institute: any) {
    Swal.fire({
      title: 'Education Institute Type Delete',
      text: 'Are you want to delete this Education Institute Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteEducationInstitute(education_institute.id).subscribe((response:any) => {
          if(response.status){
            this.education_institutes = this.education_institutes.filter((item: any)  => item !== education_institute);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }

  instituteLevelOfEducationVal() {
    this.educationInstitute.levelOfEducation = this.levels.toString();
  }
}
