import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {AdmissionWaiver} from "../../../../model/admission/applicantInformation/admissionWaiver";

import {AdmissionWaiverService} from "../../../../Service/admission/application/admissionWaiver.service";

import {ToastrService} from "ngx-toastr";
import {AdmissionWaiverTypeService} from "../../../../Service/admission/admission-setup/admissionWaiverType.service";

import Swal from "sweetalert2";

@Component({
  selector: 'app-applicant-special-quota',
  templateUrl: './applicant-special-quota.component.html',
  styleUrls: ['./applicant-special-quota.component.css']
})
export class ApplicantSpecialQuotaComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  admissionPerson = new AdmissionPerson();
  admissionWaiver:any = new AdmissionWaiver();
  waiver_types:any=[]
  waivers:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isCreditTransferView:boolean = false;
  sMessage:string ='';
  loading:boolean = false;
  formSubmitted:boolean =false;
  constructor(private admissionWaiverService: AdmissionWaiverService, private waiverTypeService: AdmissionWaiverTypeService,
              private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getWaiverType();
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getAdmissionWaiver(person?.admissionWaivers);
    });
  }

  // Admission Waiver
  getWaiverType(){
    this.waiverTypeService.getWaiverTypeActive().subscribe((response:any)=>{
      this.waiver_types = response.data;
      this.waiver_types.forEach((item:any) => {
        const selected = this.waivers.some((waiver: any) => waiver.admissionWaiverType.id === item.id);
        item.selected = selected;
      });
    })
  }
  getAdmissionWaiver(waiver:any){
    this.waivers = waiver;
    this.waiver_types.forEach((item:any) => {
      const selected = this.waivers.some((response: any) => response.admissionWaiverType.id === item.id);
      item.selected = selected;
    });
  }
  postAdmissionWaiver(waiver_type:any){
    this.loading = true;
    const exists = this.waivers.some((waiver: any) => waiver.admissionWaiverType.id === waiver_type.id);
    console.log(exists)
    if(!exists){
      this.admissionWaiver.admissionPersonId = this.admissionPerson.id;
      this.admissionWaiver.admissionWaiverTypeId = waiver_type.id;
      this.admissionWaiverService.postAdmissionWaiver(this.admissionWaiver).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.toastr.success(response.message);
          this.waivers.push(response.data);
        }
      })
    }else{
      const waiverId = this.waivers.find((item:any)=> item.admissionWaiverType.id === waiver_type.id);
      if(waiverId){
        this.admissionWaiverService.deleteAdmissionWaiver(waiverId.id).subscribe((res:any)=>{
          this.loading = false;
          if(res.status){
            this.waivers = this.waivers.filter((item: any)  => item.id !== waiverId.id);
          }
        })
      }

    }
  }
}
