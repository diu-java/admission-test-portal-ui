import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {
  AdmissionApplicationDocumentVerifyTypeService
} from "../../../../Service/admission/admission-setup/admissionApplicationDocumentVerifyType.service";
import {
  AdmissionApplicationDocumentVerify
} from "../../../../model/admission/applicantInformation/admissionApplicationDocumentVerify";
import {
  AdmissionApplicationDocumentVerifyService
} from "../../../../Service/admission/application/admissionApplicationDocumentVerify.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";

@Component({
  selector: 'app-admission-review-document',
  templateUrl: './admission-review-document.component.html',
  styleUrls: ['./admission-review-document.component.css']
})
export class AdmissionReviewDocumentComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();

  admissionApplicationDocumentVerify:any = new AdmissionApplicationDocumentVerify();
  admissionPerson:any = new AdmissionPerson();
  application_document_verify_types:any=[];
  admission_application_document_verifies:any=[];
  loading:boolean = false;
  enableReviewDocument:boolean = false;
  constructor(private admissionApplicationDocumentVerifyTypeService: AdmissionApplicationDocumentVerifyTypeService, private cdRef: ChangeDetectorRef,
              private admissionApplicationDocumentVerifyService: AdmissionApplicationDocumentVerifyService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getAdmissionApplicationDocumentVerifyType();
  }
  getAdmissionApplicationView(){
    this.getAdmissionApplicationDocumentVerify(this.admissionApplication?.admissionApplicationDocumentVerifies);
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
    });
  }
  getAdmissionApplicationDocumentVerifyType(){
    this.admissionApplicationDocumentVerifyTypeService.getAdmissionApplicationDocumentVerifyType().subscribe((response:any)=>{
      this.application_document_verify_types = response.data;
      this.application_document_verify_types.forEach((item:any) => {
        const selected = this.admission_application_document_verifies.some((documentVerify: any) => documentVerify.admissionDocumentVerifyType.id === item.id);
        item.selected = selected;
      });
    })
  }
  getAdmissionApplicationDocumentVerify(admissionApplication:any){
    this.admission_application_document_verifies = admissionApplication;
    this.application_document_verify_types.forEach((item:any) => {
      const selected = this.admission_application_document_verifies.some((type: any) => type.admissionDocumentVerifyType.id === item.id);
      item.selected = selected;
    });
  }

  postAdmissionApplicationDocumentVerify(application_document_verify_type: any) {
    this.loading = true;
    const exists = this.admission_application_document_verifies.some((application_document_verify: any) => application_document_verify.admissionDocumentVerifyType.id === application_document_verify_type.id);
    console.log(exists)
    if(!exists){
      this.admissionApplicationDocumentVerify.admissionApplicationId = this.admissionApplication.id;
      this.admissionApplicationDocumentVerify.admissionDocumentVerifyTypeId = application_document_verify_type.id;
      this.admissionApplicationDocumentVerifyService.postAdmissionApplicationDocumentVerify(this.admissionApplicationDocumentVerify).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.toastr.success(response.message);
          this.admission_application_document_verifies.push(response.data);
        }
      })
    }else{
      const applicationDocumentVerifyId = this.admission_application_document_verifies.find((item: any) => item.admissionDocumentVerifyType.id === application_document_verify_type.id);
      if(applicationDocumentVerifyId) {
        this.admissionApplicationDocumentVerifyService.deleteAdmissionApplicationDocumentVerify(applicationDocumentVerifyId.id).subscribe((res: any) => {
          this.loading = false;
          if (res.status) {
            this.admission_application_document_verifies = this.admission_application_document_verifies.filter((item: any) => item.id !== applicationDocumentVerifyId.id);
            // Show success message
          }
        });
      }

    }
  }
  cancelDocumentReview() {
    this.enableReviewDocument = !this.enableReviewDocument;
  }
}
