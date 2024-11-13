import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {
  AdmissionAffiliateUserType
} from "../../../model/admission/admission-setup/admissionAffiliateUserType";
import {AdmissionWaiverType} from "../../../model/admission/admission-setup/admissionWaiverType";
import {Title} from "@angular/platform-browser";
import {AdmissionWaiverTypeService} from "../../../Service/admission/admission-setup/admissionWaiverType.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-waiver-type',
  templateUrl: './admission-waiver-type.component.html',
  styleUrls: ['./admission-waiver-type.component.css']
})
export class AdmissionWaiverTypeComponent implements OnInit{
  @ViewChild('waiverTypeForm') form: NgForm | undefined;
  waiverType  = new AdmissionWaiverType();
  waiver_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(  private service: AdmissionWaiverTypeService, private toastr: ToastrService, private titleService: Title) {
    this.titleService.setTitle('Admission Waiver Type')
  }
  ngOnInit() {
    this.getWaiverType();
  }
  getWaiverType() {
    this.service.getWaiverType().subscribe((response:any)=>{
      this.waiver_types = response.data;
    })
  }
  postWaiverType() {
    this.waiverType.active = true;
    this.service.postWaiverType(this.waiverType).subscribe((response:any)=>{
      if(response.status){
        this.waiverType = new AdmissionWaiverType();
        this.form?.resetForm(this.waiverType);
        this.toastr.success(response.message);
        this.waiver_types.push(response.data);
      }
    })
  }

  putWaiverType() {
    this.service.putWaiverType(this.waiverType, this.waiverType.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.waiver_types.findIndex((item: AdmissionWaiverType) => item.id === this.waiverType.id);
        this.waiver_types[indexToUpdate] = response.data;
        this.waiverType = new AdmissionWaiverType();
        this.form?.resetForm(this.waiverType);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelWaiverType() {
    this.waiverType = new AdmissionWaiverType();
    this.form?.resetForm(this.waiverType);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editWaiverType(waiver_type: any) {
    this.waiverType = waiver_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteWaiverType(waiver_type: any) {
    Swal.fire({
      title: 'Waiver Type Delete',
      text: 'Are you want to delete this Waiver Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteWaiverType(waiver_type.id).subscribe((response:any) => {
          if(response.status){
            this.waiver_types = this.waiver_types.filter((item: any)  => item !== waiver_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
