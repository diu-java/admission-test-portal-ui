import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {NgForm} from "@angular/forms";
import {AdmissionOffer} from "../../../../model/admission/applicantInformation/admissionOffer";
import {AdmissionStudyCampusService} from "../../../../Service/admission/admission-setup/admissionStudyCampus.service";
import {ProgramService} from "../../../../Service/academic/institute/program.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionOfferService} from "../../../../Service/admission/application/admissionOffer.service";
import {AdmissionTag} from "../../../../model/admission/applicantInformation/admissionTag";
import {AdmissionTagService} from "../../../../Service/admission/application/admissionTag.service";
import {AdmissionTagTypeService} from "../../../../Service/admission/admission-setup/admissionTagType.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-tag',
  templateUrl: './admission-tag.component.html',
  styleUrls: ['./admission-tag.component.css']
})
export class AdmissionTagComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('admissionTagForm') form: NgForm | undefined;
  isAdmissionTagView:boolean = false;
  admissionTag = new AdmissionTag();
  admission_tags:any=[];
  tag_types:any=[];
  programs:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  loading:boolean = false;
  formSubmitted:boolean = false;
  constructor(private admissionTagTypeService: AdmissionTagTypeService, private programService: ProgramService,
              private toastr: ToastrService,
              private admissionTagService: AdmissionTagService) {
  }
  ngOnInit() {

    this.getTagType();
    this.getAdmissionApplicationView();
  }
  getAdmissionApplicationView(){
    // this.admissionApplication.admissionApplicationProgramChooses.forEach((item:any)=>{
    //   this.admissionTag.programId = item.admissionCircularProgram.program.id;
    // })
  }

  admissionTagView() {
    this.isAdmissionTagView = !this.isAdmissionTagView;
  }

  getTagType(){
    this.admissionTagTypeService.getAdmissionTagTypeActive().subscribe((response:any)=>{
      this.tag_types = response.data;
    })
  }

  postAdmissionTag() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.admissionTag.admissionApplicationId = this.admissionApplication.id;
    this.admissionTagService.postAdmissionTag(this.admissionTag).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.admissionTag = new AdmissionTag();
        this.form?.resetForm(this.admissionTag);
        this.toastr.success(response.message);
        this.admissionApplication.admissionTags.push(response.data);
        this.isAdmissionTagView = false;
      }
    })
  }

  putAdmissionTag() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.admissionTag.admissionApplicationId = this.admissionApplication.id;
    this.admissionTagService.putAdmissionTag(this.admissionTag, this.admissionTag.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.admissionApplication.admissionTags.findIndex((item: AdmissionTag) => item.id === this.admissionTag.id);
        this.admissionApplication.admissionTags[indexToUpdate] = response.data;
        this.admissionTag = new AdmissionTag();
        this.form?.resetForm(this.admissionTag);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionTagView = false;
      }
    })
  }

  cancelAdmissionTag() {
    this.admissionTag = new AdmissionTag();
    this.form?.resetForm(this.admissionTag);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionTagView = !this.isAdmissionTagView;
  }

  editAdmissionTag(admission_tag: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionTagView = true;
    this.admissionTag = admission_tag;
  }

  deleteAdmissionTag(admission_tag: any) {
    Swal.fire({
      title: 'Tag Delete',
      text: 'Are you want to Tag this Skill.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTagService.deleteAdmissionTag(admission_tag.id).subscribe((response: any) => {
          if (response.status) {
            this.admissionApplication.admissionTags = this.admissionApplication.admissionTags.filter((item: any) => item !== admission_tag);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
