import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import {AdmissionAffiliateTypeService} from "../../../Service/admission/admission-setup/admissionAffiliateType.service";
import {AdmissionAffiliateUserType} from "../../../model/admission/admission-setup/admissionAffiliateUserType";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-affiliate-type',
  templateUrl: './admission-affiliate-type.component.html',
  styleUrls: ['./admission-affiliate-type.component.css']
})
export class AdmissionAffiliateTypeComponent implements OnInit{
  @ViewChild('affiliateTypeForm') form: NgForm | undefined;
  affiliateType  = new AdmissionAffiliateType();
  affiliate_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor( private service: AdmissionAffiliateTypeService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Affiliate Type')
  }
  ngOnInit() {
    this.getAffiliateType();
  }
  getAffiliateType() {
    this.service.getAffiliateType().subscribe((response:any)=>{
      this.affiliate_types = response.data;
    })
  }
  postAffiliateType() {
    this.affiliateType.active = true;
    this.service.postAffiliateType(this.affiliateType).subscribe((response:any)=>{
      if (response.status){
        this.affiliateType = new AdmissionAffiliateType();
        this.form?.resetForm(this.affiliateType);
        this.affiliateType.isAffiliateOrganization = false;
        this.affiliateType.isAffiliateUserType = false;
        this.toastr.success(response.message);
        this.affiliate_types.push(response.data);
      }
    })
  }

  putAffiliateType() {
    this.service.putAffiliateType(this.affiliateType, this.affiliateType.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.affiliate_types.findIndex((item: AdmissionAffiliateType) => item.id === this.affiliateType.id);
        this.affiliate_types[indexToUpdate] = response.data;
        this.affiliateType = new AdmissionAffiliateType();
        this.form?.resetForm(this.affiliateType);
        this.affiliateType.isAffiliateOrganization = false;
        this.affiliateType.isAffiliateUserType = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAffiliateType() {
    this.affiliateType = new AdmissionAffiliateType();
    this.form?.resetForm(this.affiliateType);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAffiliateType(affiliate_type: any) {
    this.affiliateType = affiliate_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAffiliateType(affiliate_type: any) {
    Swal.fire({
      title: 'Affiliate Type Delete',
      text: 'Are you want to delete this Affiliate Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAffiliateType(affiliate_type.id).subscribe((response:any) => {
          if(response.status){
            this.affiliate_types = this.affiliate_types.filter((item: any)  => item !== affiliate_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
