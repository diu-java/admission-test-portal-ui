import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionChooseOption} from "../../../model/admission/admission-setup/admissionChooseOption";
import {Title} from "@angular/platform-browser";
import {AdmissionChooseOptionService} from "../../../Service/admission/admission-setup/admissionChooseOption.service";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {
  AdmissionApplicationTypeService
} from "../../../Service/admission/admission-setup/admissionApplicationType.service";
import {ProgramTypeService} from "../../../Service/academic/configuration/programType.service";

@Component({
  selector: 'app-admission-choose-option',
  templateUrl: './admission-choose-option.component.html',
  styleUrls: ['./admission-choose-option.component.css']
})
export class AdmissionChooseOptionComponent implements OnInit{
  @ViewChild('chooseOptionForm') form: NgForm | undefined;
  admissionChooseOption  = new AdmissionChooseOption();
  choose_options:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  application_types:any=[];
  program_types:any=[];
  constructor(private service: AdmissionChooseOptionService, private admissionApplicationTypeService: AdmissionApplicationTypeService,
              private programTypeService: ProgramTypeService,
              private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Admission Choose Option')
  }
  ngOnInit() {
    this.getApplicationType();
    this.getAdmissionChooseOption();
    this.getProgramType();
  }
  getAdmissionChooseOption() {
    this.service.getChooseOption().subscribe((response:any)=>{
      this.choose_options = response.data;
    })
  }
  getApplicationType(){
    this.admissionApplicationTypeService.getApplicationType().subscribe((response:any)=>{
      this.application_types = response.data;
    })
  }
  getProgramType(){
    this.programTypeService.getProgramTypeActive().subscribe((response:any)=>{
      this.program_types = response.data;
    })
  }

  postAdmissionChooseOption() {
    this.admissionChooseOption.active = true;
    this.service.postChooseOption(this.admissionChooseOption).subscribe((response:any)=>{
      if (response.status){
        this.admissionChooseOption = new AdmissionChooseOption();
        this.form?.resetForm(this.admissionChooseOption);
        this.toastr.success(response.message);
        this.choose_options.push(response.data);
      }
    })
  }

  putAdmissionChooseOption() {
    this.service.putChooseOption(this.admissionChooseOption, this.admissionChooseOption.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.choose_options.findIndex((item: AdmissionChooseOption) => item.id === this.admissionChooseOption.id);
        this.choose_options[indexToUpdate] = response.data;
        this.admissionChooseOption = new AdmissionChooseOption();
        this.form?.resetForm(this.admissionChooseOption);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAdmissionChooseOption() {
    this.admissionChooseOption = new AdmissionChooseOption();
    this.form?.resetForm(this.admissionChooseOption);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAdmissionChooseOption(choose_option: any) {
    this.admissionChooseOption = choose_option;
    this.admissionChooseOption.admissionApplicationTypeId = choose_option.admissionApplicationType.id;
    this.admissionChooseOption.programTypeId = choose_option.programType.id;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAdmissionChooseOption(choose_option: any) {
    Swal.fire({
      title: 'Choose Option Delete',
      text: 'Are you want to delete this Choose Option.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteChooseOption(choose_option.id).subscribe((response:any) => {
          if(response.status){
            this.choose_options = this.choose_options.filter((item: any)  => item !== choose_option);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
