import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {AdmissionAffiliate} from "../../../../model/admission/applicantInformation/admissionAffiliate";
import {
  AdmissionAffiliateTypeService
} from "../../../../Service/admission/admission-setup/admissionAffiliateType.service";
import {
  AdmissionAffiliateOrganizationService
} from "../../../../Service/admission/admission-setup/admissionAffiliateOrganization.service";
import {
  AdmissionAffiliateUserTypeService
} from "../../../../Service/admission/admission-setup/admissionAffiliateUserType.service";
import {AdmissionAffiliateService} from "../../../../Service/admission/application/admissionAffiliate.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {AdmissionReference} from "../../../../model/admission/applicantInformation/admissionReference";
import {ReferenceSubUnitService} from "../../../../Service/common-setup/referenceSubUnit.service";
import {ReferenceUnitService} from "../../../../Service/common-setup/referenceUnit.service";
import {ReferenceService} from "../../../../Service/common-setup/reference.service";
import {AdmissionReferenceService} from "../../../../Service/admission/application/admissionReference.service";

@Component({
  selector: 'app-applicant-reference',
  templateUrl: './applicant-reference.component.html',
  styleUrls: ['./applicant-reference.component.css']
})
export class ApplicantReferenceComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('admissionReferenceForm') form: NgForm | undefined;
  @ViewChild('admissionAffiliateForm') affiliateForm: NgForm | undefined;
  admissionPerson = new AdmissionPerson();
  admissionReference:any = new AdmissionReference();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  sMessage:string ='';
  tMessage:string ='';
  //affiliate type
  affiliate_types:any=[];
  affiliate_organizations:any=[];
  affiliate_user_types:any=[];
  affiliates:any=[];
  isOrganization:boolean = false;
  isAffiliateUser:boolean = false;
  isAffiliateView:boolean = false;
  loading:boolean = false;
  admissionAffiliate:any = new AdmissionAffiliate();
  formSubmitted:boolean =false;
  isOpenAttachment:boolean = false;
  isOpenSyllabusAttachment:boolean = false;

  reference_units:any=[];
  reference_sub_units:any=[];
  references:any=[];
  admission_references:any=[];
  isReferenceCode:boolean = true;
  isReferenceUnitCode:boolean = true;
  isReferenceSubUnitCode:boolean = true;
  isOpenCode:boolean = false;
  isReferenceView:boolean = false;
  constructor(private affiliateTypeService: AdmissionAffiliateTypeService, private affiliateOrganizationService: AdmissionAffiliateOrganizationService,
              private affiliateUserTypeService: AdmissionAffiliateUserTypeService, private admissionAffiliateService: AdmissionAffiliateService,
              private admissionReferenceService: AdmissionReferenceService,
              private referenceSubUnitService: ReferenceSubUnitService ,private referenceUnitService: ReferenceUnitService, private referenceService: ReferenceService,
              private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getAffiliateOrganization();
    this.getAffiliateType();
    this.getReference();
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getAffiliate(person?.admissionAffiliates);
      this.getAdmissionReference(person?.admissionReferences);
    })
  }
  getAdmissionReference(reference:any){
    this.admission_references = reference;
    if (this.admission_references.length > 0) {
      this.admissionReference.referenceId = this.admission_references[0]?.reference?.id;
      // this.admissionReference.code = this.admission_references[0]?.code;

      this.getReferenceUnit();
      this.checkReference(this.admission_references[0]?.reference?.id)
      if(this.admission_references[0]?.referenceUnit?.id){
        this.admissionReference.referenceUnitId = this.admission_references[0]?.referenceUnit?.id;
        this.checkReferenceUnit(this.admission_references[0]?.referenceUnit?.id)
      }
      if(this.admission_references[0]?.referenceSubUnit?.id){
        this.getReferenceSubUnit();
        this.admissionReference.referenceSubUnitId = this.admission_references[0]?.referenceSubUnit?.id;
        this.checkReferenceSubUnit(this.admission_references[0]?.referenceSubUnit?.id)
      }
      if(this.admission_references[0]?.code){
        this.admissionReference.code = this.admission_references[0]?.code;
        this.isOpenCode = true;
      }
    }
  }

  getReference(){
    this.referenceService.getReferenceActive().subscribe((response:any)=>{
      this.references = response.data;
    })
  }
  checkReference(referenceId:any){
    this.formSubmitted = false;
    let indexToUpdate = this.references.findIndex((item: any) => item.id === referenceId && item.isEnableCode);
    console.log(indexToUpdate)
    if(indexToUpdate !== -1){
      this.isReferenceCode = true;
      this.isOpenCode = true;
    }else {
      this.isReferenceCode = false;
      this.isOpenCode = false;
      this.admissionReference.code = '';
    }
  }
  getReferenceUnit() {
    this.reference_units = [];
    this.reference_sub_units = [];
    this.admissionReference.referenceUnitId = undefined;
    this.admissionReference.referenceSubUnitId = undefined;
    if(this.admissionReference.referenceId){
      this.referenceUnitService.getReferenceUnitActive(this.admissionReference.referenceId).subscribe((response:any)=>{
        this.reference_units = response.data;
      })
    }else {
      this.toastr.warning('Invalid Reference');
      this.isReferenceUnitCode = true;
    }
  }
  checkReferenceUnit(referenceUnitId:any){
    this.formSubmitted = false;
    let indexToUpdate = this.reference_units.findIndex((item: any) => item.id === referenceUnitId && item.isEnableCode);
    if(indexToUpdate !== -1){
      this.isReferenceUnitCode = true;
      this.isOpenCode = true;
    }else {
      this.isReferenceUnitCode = false;
      this.isOpenCode = false;
      this.admissionReference.code = '';
    }
  }
  getReferenceSubUnit() {
    this.reference_sub_units = [];
    this.admissionReference.referenceSubUnitId = undefined
    if(this.admissionReference.referenceUnitId){
      this.referenceSubUnitService.getReferenceSubUnitActive(this.admissionReference.referenceUnitId).subscribe((response:any)=>{
        this.reference_sub_units = response.data;
      });
    }else {
      this.toastr.warning('Invalid Reference Unit');
      this.isReferenceUnitCode = true;

    }
  }
  checkReferenceSubUnit(referenceSubUnitId:any){
    this.formSubmitted = false;
    let indexToUpdate = this.reference_sub_units.findIndex((item: any) => item.id === referenceSubUnitId && item.isEnableCode);
    if(indexToUpdate !== -1){
      this.isOpenCode = true;
    }else {
      this.isOpenCode = false;
      this.admissionReference.code = '';
    }
  }

  postAdmissionReference() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.admissionReference.admissionPersonId = this.admissionPerson.id;
    this.admissionReference.active = true;
    this.admissionReferenceService.postAdmissionReference(this.admissionReference).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.admission_references.push(response.data);
        this.toastr.success(response.message);
      }
    })
  }

  putAdmissionReference(id:any) {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.admissionReference.admissionPersonId = this.admissionPerson.id;
    this.admissionReferenceService.putAdmissionReference(this.admissionReference, id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        // let indexToUpdate = this.admission_references.findIndex((item: AdmissionReference) => item.id === this.admissionReference.id);
        // this.admission_references[indexToUpdate] = response.data;
        this.toastr.success(response.message);
      }
    })
  }

  cancelAdmissionReference() {
    this.admissionReference = new AdmissionReference();
    this.form?.resetForm(this.admissionReference);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isReferenceView = !this.isReferenceView;
  }

  editAdmissionReference(admission_reference: any) {

  }

  deleteAdmissionReference(admission_reference: any) {
    Swal.fire({
      title: 'Admission Reference Delete',
      text: 'Are you want to delete this Admission Reference.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionReferenceService.deleteAdmissionReference(admission_reference.id).subscribe((response:any) => {
          if(response.status){
            this.admission_references = this.admission_references.filter((item: any)  => item !== admission_reference);
            this.admissionReference = new AdmissionReference();
            this.form?.resetForm(this.admissionReference);
            this.toastr.success(response.message);
            this.isReferenceCode = true;
            this.isReferenceUnitCode = true;
            this.isOpenCode = false;
            this.formSubmitted = false;
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  // getReference(){
  //   this.referenceService.getReferenceActive().subscribe((response:any)=>{
  //     this.references = response.data;
  //   })
  // }
  // checkReference(referenceId:any){
  //   let indexToUpdate = this.references.findIndex((item: any) => item.id === referenceId && item.isEnableCode);
  //   if(indexToUpdate !== -1){
  //     this.isReferenceCode = true;
  //     this.isOpenCode = true;
  //   }else {
  //     this.isReferenceCode = false;
  //     this.isOpenCode = false;
  //   }
  // }
  // getReferenceUnit() {
  //   this.reference_units = [];
  //   this.reference_sub_units = [];
  //   this.admissionReference.referenceUnitId = undefined;
  //   this.admissionReference.referenceSubUnitId = undefined;
  //   if(this.admissionReference.referenceId){
  //     this.referenceUnitService.getReferenceUnitActive(this.admissionReference.referenceId).subscribe((response:any)=>{
  //       this.reference_units = response.data;
  //     })
  //   }else {
  //     this.toastr.warning('Invalid Reference');
  //     this.isReferenceUnitCode = true;
  //   }
  // }
  // checkReferenceUnit(referenceUnitId:any){
  //   let indexToUpdate = this.reference_units.findIndex((item: any) => item.id === referenceUnitId && item.isEnableCode);
  //   if(indexToUpdate !== -1){
  //     this.isReferenceUnitCode = true;
  //     this.isOpenCode = true;
  //   }else {
  //     this.isReferenceUnitCode = false;
  //     this.isOpenCode = false;
  //   }
  // }
  // getReferenceSubUnit() {
  //   this.reference_sub_units = [];
  //   this.admissionReference.referenceSubUnitId = undefined
  //   if(this.admissionReference.referenceUnitId){
  //     this.referenceSubUnitService.getReferenceSubUnit(this.admissionReference.referenceUnitId).subscribe((response:any)=>{
  //       this.reference_sub_units = response.data;
  //     });
  //   }else {
  //     this.toastr.warning('Invalid Reference Unit');
  //     this.isReferenceUnitCode = true;
  //
  //   }
  // }
  // checkReferenceSubUnit(referenceSubUnitId:any){
  //   let indexToUpdate = this.reference_sub_units.findIndex((item: any) => item.id === referenceSubUnitId && item.isEnableCode);
  //   console.log(indexToUpdate)
  //   if(indexToUpdate !== -1){
  //     this.isOpenCode = true;
  //   }else {
  //     this.isOpenCode = false;
  //   }
  // }
  // getAdmissionReference(reference:any){
  //   this.admission_references = reference;
  // }
  //
  // postAdmissionReference() {
  //   this.loading = true;
  //   this.admissionReference.admissionPersonId = this.admissionPerson.id;
  //   this.admissionReference.active = true;
  //   this.admissionReferenceService.postAdmissionReference(this.admissionReference).subscribe((response:any)=>{
  //     this.loading = false;
  //     if(response.status){
  //       this.admissionReference = new AdmissionReference();
  //       this.form?.resetForm(this.admissionReference);
  //       this.toastr.success(response.message);
  //       this.admission_references.push(response.data);
  //       this.isReferenceView = false;
  //     }
  //   })
  // }
  //
  // putAdmissionReference(id:any) {
  //   this.loading = true;
  //   this.admissionReference.admissionPersonId = this.admissionPerson.id;
  //   this.admissionReferenceService.putAdmissionReference(this.admissionReference, id).subscribe((response:any)=>{
  //     this.loading = false;
  //     if (response.status){
  //       let indexToUpdate = this.admission_references.findIndex((item: AdmissionReference) => item.id === this.admissionReference.id);
  //       this.admission_references[indexToUpdate] = response.data;
  //       this.admissionReference = new AdmissionReference();
  //       this.form?.resetForm(this.admissionReference);
  //       this.toastr.success(response.message);
  //       this.isUpdateButton = false;
  //       this.isSaveButton = true;
  //       this.isReferenceView = false;
  //     }
  //   })
  // }
  //
  // cancelAdmissionReference() {
  //   this.admissionReference = new AdmissionReference();
  //   this.form?.resetForm(this.admissionReference);
  //   this.isSaveButton = true;
  //   this.isUpdateButton = false;
  //   this.isReferenceCode = true;
  //   this.isReferenceUnitCode = true;
  //   this.isOpenCode = false;
  //   this.isReferenceView = !this.isReferenceView;
  // }
  //
  // editAdmissionReference(admission_reference: any) {
  //
  // }
  //
  // deleteAdmissionReference(admission_reference: any) {
  //   Swal.fire({
  //     title: 'Admission Reference Delete',
  //     text: 'Are you want to delete this Admission Reference.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //   }).then((result: any) => {
  //     if (result.value) {
  //       this.admissionReferenceService.deleteAdmissionReference(admission_reference.id).subscribe((response:any) => {
  //         if(response.status){
  //           this.admission_references = this.admission_references.filter((item: any)  => item !== admission_reference);
  //           this.toastr.success(response.message);
  //         }
  //       });
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       this.toastr.warning('Cancel')
  //     }
  //   });
  // }

  //Admission Affiliate
  getAffiliateType(){
    this.affiliateTypeService.getAffiliateTypeActive().subscribe((response:any)=>{
      this.affiliate_types = response.data;
    })
  }
  getAffiliate(affiliate:any){
    this.affiliates = affiliate;
  }
  getAffiliateOrganization(){
    this.affiliateOrganizationService.getAffiliateOrganizationActive().subscribe((response:any)=>{
      this.affiliate_organizations = response.data;
    })
  }
  getAffiliateUserType(){
    this.affiliateUserTypeService.getAffiliateUseTypeActive().subscribe((response:any)=>{
      this.affiliate_user_types = response.data;
    })
  }
  enableAffiliateOrganization(admissionAffiliateTypeId:any){
    let affiliate_organization = this.affiliate_types.findIndex((item:any)=> item.id === admissionAffiliateTypeId && item.isAffiliateOrganization)
    let affiliate_userType = this.affiliate_types.findIndex((item:any)=> item.id === admissionAffiliateTypeId && item.isAffiliateUserType)
    if(affiliate_organization !== -1){
      this.isOrganization = true;
      this.getAffiliateOrganization();
    }else {
      this.isOrganization = false;
      this.admissionAffiliate.admissionAffiliateOrganizationId = undefined;
    }
    if(affiliate_userType !== -1 ){
      this.isAffiliateUser = true;
      this.getAffiliateUserType();
    }else {
      this.isAffiliateUser = false;
      this.admissionAffiliate.admissionAffiliateOrganizationId = undefined;
      this.admissionAffiliate.admissionAffiliateTypeId = undefined;
      this.admissionAffiliate.code = undefined;
    }
  }
  postAffiliateType() {
    this.loading = true;
    this.admissionAffiliate.admissionPersonId = this.admissionPerson.id;
    this.admissionAffiliate.active = true;
    this.admissionAffiliateService.postAdmissionAffiliate(this.admissionAffiliate).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.admissionAffiliate = new AdmissionAffiliate();
        this.affiliateForm?.resetForm(this.admissionAffiliate);
        this.toastr.success(response.message);
        this.affiliates.push(response.data);
        this.isAffiliateView = false;
      }
    })
  }
  putAffiliateType(id:any) {
    this.loading = true;
    this.admissionAffiliate.admissionPersonId = this.admissionPerson.id;
    this.admissionAffiliateService.putAdmissionAffiliate(this.admissionAffiliate, id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.affiliates.findIndex((item: AdmissionAffiliate) => item.id === this.admissionAffiliate.id);
        this.affiliates[indexToUpdate] = response.data;
        this.admissionAffiliate = new AdmissionAffiliate();
        this.affiliateForm?.resetForm(this.admissionAffiliate);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAffiliateView = false;
      }
    })
  }

  affiliateView() {
    this.isAffiliateView = !this.isAffiliateView;
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAffiliate(affiliate: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAffiliateView = true;
    this.admissionAffiliate = affiliate;
    if(this.admissionAffiliate.admissionAffiliateType){
      this.admissionAffiliate.admissionAffiliateTypeId = affiliate.admissionAffiliateType.id;
    }
    if(this.admissionAffiliate.admissionAffiliateUserType){
      this.admissionAffiliate.admissionAffiliateUserTypeId = affiliate.admissionAffiliateUserType.id;
    }
    this.enableAffiliateOrganization(this.admissionAffiliate.admissionAffiliateUserTypeId);
    if(this.admissionAffiliate.admissionAffiliateOrganization){
      this.admissionAffiliate.admissionAffiliateOrganizationId = affiliate.admissionAffiliateOrganization.id;
    }
  }

  deleteAffiliate(affiliate: any) {
    Swal.fire({
      title: 'Admission Affiliate Information Delete',
      text: 'Are you want to delete this Admission Affiliate Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionAffiliateService.deleteAdmissionAffiliate(affiliate.id).subscribe((response:any) => {
          if(response.status){
            this.affiliates = this.affiliates.filter((item: any)  => item !== affiliate);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  cancelAffiliate() {
    this.admissionAffiliate = new AdmissionAffiliate();
    this.form?.resetForm(this.admissionAffiliate);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAffiliateView = !this.isAffiliateView;
  }
  isOpenFile() {
    this.isOpenAttachment = true;
  }
  isOpenSyllabus() {
    this.isOpenSyllabusAttachment = true;
  }


  referenceView() {
    this.isReferenceView = !this.isReferenceView;
  }
}
