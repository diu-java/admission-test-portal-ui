import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {
  AdmissionApplicationDocumentVerifyType
} from "../../../model/admission/admission-setup/admissionApplicationDocumentVerifyType";
import {
  AdmissionApplicationDocumentVerifyTypeService
} from "../../../Service/admission/admission-setup/admissionApplicationDocumentVerifyType.service";

@Component({
  selector: 'app-admission-application-document-verify-type',
  templateUrl: './admission-application-document-verify-type.component.html',
  styleUrls: ['./admission-application-document-verify-type.component.css']
})
export class AdmissionApplicationDocumentVerifyTypeComponent implements OnInit{
  @ViewChild('documentTypeForm') form: NgForm | undefined;
  admissionApplicationDocumentVerifyType  = new AdmissionApplicationDocumentVerifyType();
  document_verify_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor( private service: AdmissionApplicationDocumentVerifyTypeService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Admission Test Venue')
  }
  ngOnInit() {
    this.getAdmissionApplicationDocumentVerifyType();
  }

  getAdmissionApplicationDocumentVerifyType(){
    this.service.getAdmissionApplicationDocumentVerifyType().subscribe((response:any)=>{
      this.document_verify_types = response.data;
    })
  }

  postAdmissionApplicationDocumentVerifyType() {
    this.admissionApplicationDocumentVerifyType.active = true;
    this.service.postAdmissionApplicationDocumentVerifyType(this.admissionApplicationDocumentVerifyType).subscribe((response:any)=>{
      if (response.status){
        this.admissionApplicationDocumentVerifyType = new AdmissionApplicationDocumentVerifyType();
        this.form?.resetForm(this.admissionApplicationDocumentVerifyType);
        this.toastr.success(response.message);
        this.document_verify_types.push(response.data);
      }
    })
  }

  putAdmissionApplicationDocumentVerifyType() {
    this.service.putAdmissionApplicationDocumentVerifyType(this.admissionApplicationDocumentVerifyType, this.admissionApplicationDocumentVerifyType.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.document_verify_types.findIndex((item: AdmissionApplicationDocumentVerifyType) => item.id === this.admissionApplicationDocumentVerifyType.id);
        this.document_verify_types[indexToUpdate] = response.data;
        this.admissionApplicationDocumentVerifyType = new AdmissionApplicationDocumentVerifyType();
        this.form?.resetForm(this.admissionApplicationDocumentVerifyType);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAdmissionApplicationDocumentVerifyType() {
    this.admissionApplicationDocumentVerifyType = new AdmissionApplicationDocumentVerifyType();
    this.form?.resetForm(this.admissionApplicationDocumentVerifyType);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAdmissionApplicationDocumentVerifyType(document_verify_type: any) {
    this.admissionApplicationDocumentVerifyType = document_verify_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAdmissionApplicationDocumentVerifyType(document_verify_type: any) {
    Swal.fire({
      title: 'Application Document Verify Type Delete',
      text: 'Are you want to delete this Application Document Verify Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAdmissionApplicationDocumentVerifyType(document_verify_type.id).subscribe((response:any) => {
          if(response.status){
            this.document_verify_types = this.document_verify_types.filter((item: any)  => item !== document_verify_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
}
