import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {
  AdmissionAffiliateUserType
} from "../../../model/admission/admission-setup/admissionAffiliateUserType";
import {Title} from "@angular/platform-browser";
import {
  AdmissionAffiliateUserTypeService
} from "../../../Service/admission/admission-setup/admissionAffiliateUserType.service";
import {AdmissionAffiliateOrganization} from "../../../model/admission/admission-setup/admissionAffiliateOrganization";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-affiliate-user-type',
  templateUrl: './admission-affiliate-user-type.component.html',
  styleUrls: ['./admission-affiliate-user-type.component.css']
})
export class AdmissionAffiliateUserTypeComponent implements OnInit{
  @ViewChild('affiliateUserTypeForm') form: NgForm | undefined;
  affiliateUserType  = new AdmissionAffiliateUserType();
  affiliate_user_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;

  constructor( private service: AdmissionAffiliateUserTypeService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Affiliate User Type')
  }
  ngOnInit() {
    this.getAffiliateUserType();
  }
  getAffiliateUserType() {
    this.service.getAffiliateUserType().subscribe((response:any)=>{
      this.affiliate_user_types = response.data;
    })
  }
  postAffiliateUserType() {
    this.affiliateUserType.active = true;
    this.service.postAffiliateUserType(this.affiliateUserType).subscribe((response:any)=>{
      if (response.status){
        this.affiliateUserType = new AdmissionAffiliateUserType();
        this.form?.resetForm(this.affiliateUserType);
        this.toastr.success(response.message);
        this.affiliate_user_types.push(response.data);
      }
    })
  }

  putAffiliateUserType() {
    this.service.putAffiliateUserType(this.affiliateUserType, this.affiliateUserType.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.affiliate_user_types.findIndex((item: AdmissionAffiliateUserType) => item.id === this.affiliateUserType.id);
        this.affiliate_user_types[indexToUpdate] = response.data;
        this.affiliateUserType = new AdmissionAffiliateUserType();
        this.form?.resetForm(this.affiliateUserType);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAffiliateUserType() {
    this.affiliateUserType = new AdmissionAffiliateUserType();
    this.form?.resetForm(this.affiliateUserType);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAffiliateUserType(affiliate_user_type: any) {
    this.affiliateUserType = affiliate_user_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAffiliateUserType(affiliate_user_type: any) {
    Swal.fire({
      title: 'Affiliate User Type Delete',
      text: 'Are you want to delete this Affiliate User Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAffiliateUserType(affiliate_user_type.id).subscribe((response:any) => {
          if(response.status){
            this.affiliate_user_types = this.affiliate_user_types.filter((item: any)  => item !== affiliate_user_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
