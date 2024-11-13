import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {EducationInstituteType} from "../../../model/common-setup/educationInstituteType";
import {EducationInstituteTypeService} from "../../../Service/common-setup/educationInstituteType.service";

@Component({
  selector: 'app-education-institute-type',
  templateUrl: './education-institute-type.component.html',
  styleUrls: ['./education-institute-type.component.css']
})
export class EducationInstituteTypeComponent implements OnInit{
  @ViewChild('instituteTypeForm') form: NgForm | undefined;
  educationInstituteType  = new EducationInstituteType();
  institute_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor( private service: EducationInstituteTypeService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Education Institute Type')
  }
  ngOnInit() {
    this.getEducationInstituteType();
  }

  getEducationInstituteType(){
    this.service.getEducationInstituteType().subscribe((response:any)=>{
      this.institute_types = response.data;
    })
  }

  postEducationInstituteType() {
    this.educationInstituteType.active = true;
    this.service.postEducationInstituteType(this.educationInstituteType).subscribe((response:any)=>{
      if (response.status){
        this.educationInstituteType = new EducationInstituteType();
        this.form?.resetForm(this.educationInstituteType);
        this.toastr.success(response.message);
        this.institute_types.push(response.data);
      }
    })
  }

  putEducationInstituteType() {
    this.service.putEducationInstituteType(this.educationInstituteType, this.educationInstituteType.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.institute_types.findIndex((item: EducationInstituteType) => item.id === this.educationInstituteType.id);
        this.institute_types[indexToUpdate] = response.data;
        this.educationInstituteType = new EducationInstituteType();
        this.form?.resetForm(this.educationInstituteType);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelEducationInstituteType() {
    this.educationInstituteType = new EducationInstituteType();
    this.form?.resetForm(this.educationInstituteType);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editEducationInstituteType(institute_type: any) {
    this.educationInstituteType = institute_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteEducationInstituteType(institute_type: any) {
    Swal.fire({
      title: 'Education Institute Type Delete',
      text: 'Are you want to delete this Education Institute Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteEducationInstituteType(institute_type.id).subscribe((response:any) => {
          if(response.status){
            this.institute_types = this.institute_types.filter((item: any)  => item !== institute_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
}
