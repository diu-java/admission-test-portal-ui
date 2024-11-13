import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {AdmissionAffiliateOrganization} from "../../../model/admission/admission-setup/admissionAffiliateOrganization";
import {
  AdmissionAffiliateOrganizationService
} from "../../../Service/admission/admission-setup/admissionAffiliateOrganization.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-affiliate-organization',
  templateUrl: './admission-affiliate-organization.component.html',
  styleUrls: ['./admission-affiliate-organization.component.css']
})
export class AdmissionAffiliateOrganizationComponent implements OnInit{
  @ViewChild('affiliateOrganizationForm') form: NgForm | undefined;
  affiliateOrganization  = new AdmissionAffiliateOrganization();
  affiliate_organizations:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(private service: AdmissionAffiliateOrganizationService,
              private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Affiliate Organization')
  }
  ngOnInit() {
    this.getAffiliateOrganization();
  }
  getAffiliateOrganization(){
    this.service.getAffiliateOrganization().subscribe((response:any)=>{
      this.affiliate_organizations = response.data;
    })
  }

  postAffiliateOrganization() {
    this.affiliateOrganization.active = true;
    this.service.postAffiliateOrganization(this.affiliateOrganization).subscribe((response:any)=>{
      if (response.status){
        this.affiliateOrganization = new AdmissionAffiliateOrganization();
        this.form?.resetForm(this.affiliateOrganization);
        this.toastr.success(response.message);
        this.affiliate_organizations.push(response.data);
      }
    })
  }

  putAffiliateOrganization() {
    this.service.putAffiliateOrganization(this.affiliateOrganization, this.affiliateOrganization.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.affiliate_organizations.findIndex((item: AdmissionAffiliateOrganization) => item.id === this.affiliateOrganization.id);
        this.affiliate_organizations[indexToUpdate] = response.data;
        this.affiliateOrganization = new AdmissionAffiliateOrganization();
        this.form?.resetForm(this.affiliateOrganization);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAffiliateOrganization() {
    this.affiliateOrganization = new AdmissionAffiliateOrganization();
    this.form?.resetForm(this.affiliateOrganization);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAffiliateOrganization(affiliate_organization: any) {
    this.affiliateOrganization = affiliate_organization;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAffiliateOrganization(affiliate_organization: any) {
    Swal.fire({
      title: 'Application Type Delete',
      text: 'Are you want to delete this Application Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAffiliateOrganization(affiliate_organization.id).subscribe((response:any) => {
          if(response.status){
            this.affiliate_organizations = this.affiliate_organizations.filter((item: any)  => item !== affiliate_organization);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
