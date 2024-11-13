import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {ApplicantCreditTransfer} from "../../../../model/admission/applicantInformation/applicantCreditTransfer";
import {ActivatedRoute} from "@angular/router";
import {AdmissionApplicationService} from "../../../../Service/admission/admission/admissionApplication.service";
import {ToastrService} from "ngx-toastr";
import {ApplicantDocumentService} from "../../../../Service/admission/application/applicantDocument.service";
import {
  ApplicantCreditTransferService
} from "../../../../Service/admission/application/applicantCreditTransfer.service";
import Swal from "sweetalert2";
import {AdmissionWaiverTypeService} from "../../../../Service/admission/admission-setup/admissionWaiverType.service";
import {AdmissionWaiverService} from "../../../../Service/admission/application/admissionWaiver.service";
import {AdmissionWaiver} from "../../../../model/admission/applicantInformation/admissionWaiver";
import {AdmissionAffiliate} from "../../../../model/admission/applicantInformation/admissionAffiliate";
import {
  AdmissionAffiliateOrganizationService
} from "../../../../Service/admission/admission-setup/admissionAffiliateOrganization.service";
import {
  AdmissionAffiliateUserTypeService
} from "../../../../Service/admission/admission-setup/admissionAffiliateUserType.service";
import {AdmissionAffiliateService} from "../../../../Service/admission/application/admissionAffiliate.service";
import {
  AdmissionAffiliateTypeService
} from "../../../../Service/admission/admission-setup/admissionAffiliateType.service";
@Component({
  selector: 'app-applicant-other-information',
  templateUrl: './applicant-other-information.component.html',
  styleUrls: ['./applicant-other-information.component.css']
})
export class ApplicantOtherInformationComponent implements OnInit{
  @ViewChild('creditTransferForm') form: NgForm | undefined;
  @ViewChild('admissionAffiliateForm') affiliateForm: NgForm | undefined;
  admissionApplication:any = new AdmissionApplication();
  admissionPerson = new AdmissionPerson();
  applicantCreditTransfer:any = new ApplicantCreditTransfer();
  admissionWaiver:any = new AdmissionWaiver();
  credit_transfers:any=[]
  waiver_types:any=[]
  waivers:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isCreditTransferView:boolean = false;
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
  constructor(private route: ActivatedRoute, private admissionApplicationService: AdmissionApplicationService,
              private affiliateTypeService: AdmissionAffiliateTypeService,
              private admissionWaiverService: AdmissionWaiverService, private affiliateOrganizationService: AdmissionAffiliateOrganizationService,
              private affiliateUserTypeService: AdmissionAffiliateUserTypeService, private admissionAffiliateService: AdmissionAffiliateService,
              private toastr: ToastrService, private documentService: ApplicantDocumentService, private waiverTypeService: AdmissionWaiverTypeService, private service: ApplicantCreditTransferService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getWaiverType();
    this.getAffiliateOrganization();
    this.getAffiliateType();
  }
  getAdmissionApplicationView(){
    this.route.params.subscribe((params)=>{
      const admissionApplicationId = +params['id'];
      this.admissionApplicationService.getViewAdmissionApplication(admissionApplicationId).subscribe((response:any)=>{
        this.admissionApplication = response.data;
        this.admissionApplication.admissionPersons.forEach((person:any)=>{
          this.admissionPerson = person;
          this.getCreditTransfer(person?.admissionCreditTransfers);
          this.getAdmissionWaiver(person?.admissionWaivers);
          this.getAffiliate(person?.admissionAffiliates);
        })
      });
    })
  }
  getCreditTransfer(credit_transfer:any){
    this.credit_transfers = credit_transfer;
  }

  postTranscriptDocument(event: any){
    const file:File = event.target.files[0];
    console.log(file.type)
    const maxSizeInBytes = 500 * 1024;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
    this.tMessage = '';
    if (file.size > maxSizeInBytes) {
      // this.nidMessage = `File size exceeds the maximum limit of ${maxSizeInMB}MB.`;
      this.toastr.error('File size exceeds the maximum limit of 500 KB')

    }else if (!allowedTypes.includes(file.type)){
      this.toastr.error('File type not supported. Only PDF, PNG, JPEG, JPG files are allowed.');
    }else {
      this.documentService.postDocument(file,this.admissionPerson.id, 'Transcript', 'Transcript').subscribe((response:any)=>{
        if(response.status){
          this.tMessage = response.message;
          this.applicantCreditTransfer.transcriptAttachmentId = response.data.id;
        }
      })
    }
  }
  postSyllabusDocument( event: any){
    const file:File = event.target.files[0];
    console.log(file.type)
    const maxSizeInBytes = 500 * 1024;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
    this.sMessage = '';
    if (file.size > maxSizeInBytes) {
      // this.nidMessage = `File size exceeds the maximum limit of ${maxSizeInMB}MB.`;
      this.toastr.error('File size exceeds the maximum limit of 500 KB')

    }else if (!allowedTypes.includes(file.type)){
      this.toastr.error('File type not supported. Only PDF, PNG, JPEG, JPG files are allowed.');
    }else {
      this.documentService.postDocument(file,this.admissionPerson.id, 'Syllabus', 'Syllabus').subscribe((response:any)=>{
        if(response.status){
          this.sMessage = response.message;
          this.applicantCreditTransfer.syllabusAttachmentId = response.data.id;
        }
      })
    }
  }
  getDocument(code:any, name:any, fileExtension:any){
    this.documentService.getDocument(code).subscribe((response:Blob)=>{
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        console.log(code)
        link.download = name+fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('File download error:', error);
      }
    )
  }

  postCreditTransfer() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantCreditTransfer.admissionPersonId = this.admissionPerson.id;
    this.service.postCreditTransfer(this.applicantCreditTransfer).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.applicantCreditTransfer = new ApplicantCreditTransfer();
        this.form?.resetForm(this.applicantCreditTransfer);
        this.toastr.success(response.message);
        this.credit_transfers.push(response.data);
        this.isCreditTransferView = false;
      }
    })
  }
  editCreditTransfer(credit_transfer: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isCreditTransferView = true;
    this.applicantCreditTransfer = credit_transfer;
    if(credit_transfer.transcriptAttachment){
      this.isOpenAttachment =false;
      this.applicantCreditTransfer.transcriptAttachmentId = credit_transfer.transcriptAttachment.id;
    }else {
      this.isOpenAttachment =true;
    }
    if(credit_transfer.syllabusAttachment){
      this.isOpenSyllabusAttachment = false
      this.applicantCreditTransfer.syllabusAttachmentId = credit_transfer.syllabusAttachment.id;
    }else {
      this.isOpenSyllabusAttachment = true;
    }
  }

  putCreditTransfer() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantCreditTransfer.admissionPersonId = this.admissionPerson.id;
    if(this.applicantCreditTransfer.transcriptAttachment){
      this.applicantCreditTransfer.transcriptAttachmentId = this.applicantCreditTransfer.transcriptAttachment.id;
    }
    if(this.applicantCreditTransfer.syllabusAttachment){
      this.applicantCreditTransfer.syllabusAttachmentId = this.applicantCreditTransfer.syllabusAttachment.id;
    }
    this.service.putCreditTransfer(this.applicantCreditTransfer, this.applicantCreditTransfer.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.credit_transfers.findIndex((item: ApplicantCreditTransfer) => item.id === this.applicantCreditTransfer.id);
        this.credit_transfers[indexToUpdate] = response.data;
        this.applicantCreditTransfer = new ApplicantCreditTransfer();
        this.form?.resetForm(this.applicantCreditTransfer);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isCreditTransferView = false;
      }
    })
  }

  creditTransferView() {
    this.isCreditTransferView = !this.isCreditTransferView;
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isOpenAttachment =true;
    this.isOpenSyllabusAttachment =true;
  }

  deleteCreditTransfer(credit_transfer: any) {
    Swal.fire({
      title: 'Credit Transfer Information Delete',
      text: 'Are you want to delete this Credit Transfer Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteCreditTransfer(credit_transfer.id).subscribe((response:any) => {
          if(response.status){
            this.credit_transfers = this.credit_transfers.filter((item: any)  => item !== credit_transfer);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  cancelCreditTransfer() {
    this.applicantCreditTransfer = new ApplicantCreditTransfer();
    this.form?.resetForm(this.applicantCreditTransfer);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isCreditTransferView = !this.isCreditTransferView;
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
      const selected = this.waivers.some((waiver: any) => waiver.admissionWaiverType.id === item.id);
      item.selected = selected;
    });
  }
  postAdmissionWaiver(waiver_type:any){
    this.loading = true;
    const selected = this.waivers.some((waiver: any) => waiver.admissionWaiverType.id === waiver_type.id);
    if(selected === false){
      this.admissionWaiver.admissionPersonId = this.admissionPerson.id;
      this.admissionWaiver.admissionWaiverTypeId = waiver_type.id;
      this.admissionWaiverService.postAdmissionWaiver(this.admissionWaiver).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.toastr.success(response.message);
          this.waivers.push(response.data);
        }
      })
    }else if(selected === true){
      const waiverId = this.waivers.find((item:any)=> item.admissionWaiverType.id === waiver_type.id);
      this.admissionWaiverService.deleteAdmissionWaiver(waiverId.id).subscribe((res:any)=>{
        this.loading = false;
        if(res.status){
          this.waivers = this.waivers.filter((item: any)  => item !== waiverId.id);
          this.waivers = [];
        }
      })
    }
  }
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
}
