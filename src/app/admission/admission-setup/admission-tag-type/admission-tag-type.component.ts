import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {AdmissionTagType} from "../../../model/admission/admission-setup/admissionTagType";
import {AdmissionTagTypeService} from "../../../Service/admission/admission-setup/admissionTagType.service";

@Component({
  selector: 'app-admission-tag-type',
  templateUrl: './admission-tag-type.component.html',
  styleUrls: ['./admission-tag-type.component.css']
})
export class AdmissionTagTypeComponent implements OnInit{
  @ViewChild('tagTypeForm') form: NgForm | undefined;
  admissionTagType:any  = new AdmissionTagType();
  tag_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;

  constructor(private service: AdmissionTagTypeService,
              private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Tag Type')
  }
  ngOnInit() {
    this.getAdmissionTagType();
  }

  getAdmissionTagType() {
    this.service.getAdmissionTagType().subscribe((response:any)=>{
      this.tag_types = response.data;
    })
  }


  postAdmissionTagType() {
    this.admissionTagType.active = true;
    this.service.postAdmissionTagType(this.admissionTagType).subscribe((response:any)=>{
      if(response.status){
        this.admissionTagType = new AdmissionTagType();
        this.form?.resetForm(this.admissionTagType);
        this.toastr.success(response.message);
        this.tag_types.push(response.data);
        this.admissionTagType.active = false;
      }
    })
  }

  putAdmissionTagType() {
    this.service.putAdmissionTagType(this.admissionTagType, this.admissionTagType.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.tag_types.findIndex((item: AdmissionTagType) => item.id === this.admissionTagType.id);
        this.tag_types[indexToUpdate] = response.data;
        this.admissionTagType = new AdmissionTagType();
        this.form?.resetForm(this.admissionTagType);
        this.admissionTagType.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAdmissionTagType() {
    this.admissionTagType = new AdmissionTagType();
    this.form?.resetForm(this.admissionTagType);
    this.isSaveButton = true;
    this.isUpdateButton = false;

  }

  editAdmissionTagType(enrollment_type: any) {
    this.admissionTagType = enrollment_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAdmissionTagType(tag_type: any) {
    Swal.fire({
      title: 'Tag Type Delete',
      text: 'Are you want to delete this Tag Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAdmissionTagType(tag_type.id).subscribe((response:any) => {
          if(response.status){
            this.tag_types = this.tag_types.filter((item: any)  => item !== tag_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
