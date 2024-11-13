import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApplicantCreditTransfer} from "../../../../model/admission/applicantInformation/applicantCreditTransfer";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";
import {ApplicantDocumentService} from "../../../../Service/admission/application/applicantDocument.service";
import {
  ApplicantCreditTransferService
} from "../../../../Service/admission/application/applicantCreditTransfer.service";
import {NgForm} from "@angular/forms";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {Router} from "@angular/router";
@Component({
  selector: 'app-applicant-credit-transfer',
  templateUrl: './applicant-credit-transfer.component.html',
  styleUrls: ['./applicant-credit-transfer.component.css']
})
export class ApplicantCreditTransferComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('creditTransferForm') form: NgForm | undefined;
  @ViewChild('admissionAffiliateForm') affiliateForm: NgForm | undefined;
  admissionPerson = new AdmissionPerson();
  applicantCreditTransfer:any = new ApplicantCreditTransfer();
  credit_transfers:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isCreditTransferView:boolean = false;
  sMessage:string ='';
  tMessage:string ='';
  //affiliate type
  loading:boolean = false;
  formSubmitted:boolean =false;
  isOpenAttachment:boolean = false;
  isOpenSyllabusAttachment:boolean = false;
  constructor(private toastr: ToastrService, private documentService: ApplicantDocumentService,
              private router: Router,
              private service: ApplicantCreditTransferService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.documentService.isOpenFormView$.subscribe((status: boolean) => {
      this.isCreditTransferView = status;
      if(status){
        this.isOpenAttachment = true;
        this.isOpenSyllabusAttachment = true;
      }
    });
    const savedModelData = sessionStorage.getItem('modelData');
    let existingAttachments: any[] = JSON.parse(sessionStorage.getItem('attachmentData') || '[]');
    if (!Array.isArray(existingAttachments)) {
      existingAttachments = [];
    }
    if(savedModelData){
      let creditTransferData = JSON.parse(savedModelData)
      this.applicantCreditTransfer = creditTransferData;
      existingAttachments.forEach((storedAttachment: any) => {
        if (storedAttachment?.name === 'Transcript') {
          this.applicantCreditTransfer.transcriptAttachmentId = storedAttachment.id;
          this.applicantCreditTransfer.transcriptAttachment = storedAttachment;
          this.isOpenAttachment = false;
        }else {
          this.isOpenAttachment = true;
        }
        if (storedAttachment?.name === 'Syllabus') {
          this.applicantCreditTransfer.syllabusAttachmentId = storedAttachment.id;
          this.applicantCreditTransfer.syllabusAttachment = storedAttachment;
          this.isOpenSyllabusAttachment = false;
        }else {
          this.isOpenSyllabusAttachment = true;
        }
        if(this.applicantCreditTransfer.syllabusAttachment && this.applicantCreditTransfer.transcriptAttachment){
          this.isOpenSyllabusAttachment = false;
          this.isOpenAttachment = false;
        }
        let creditTransferCheck = this.admissionApplication.admissionPersons[0].admissionCreditTransfers.findIndex((creditTransfer:any)=>creditTransfer.id === creditTransferData?.id)
        if(creditTransferCheck !== -1){
          this.isUpdateButton = true;
          this.isSaveButton = false;
        }else {
          this.isUpdateButton = false;
          this.isSaveButton = true;
        }
      });
    }
    sessionStorage.removeItem('modelData');
    sessionStorage.removeItem('attachmentData');
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getCreditTransfer(person?.admissionCreditTransfers);
    });
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
        sessionStorage.removeItem('modelData');
        sessionStorage.removeItem('attachmentData');
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
        sessionStorage.removeItem('modelData');
        sessionStorage.removeItem('attachmentData');
      }
    })
  }

  creditTransferView() {
    this.isCreditTransferView = !this.isCreditTransferView;
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isOpenAttachment =true;
    this.isOpenSyllabusAttachment =true;
    this.formSubmitted = false;
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



  isOpenFile() {
    this.isOpenAttachment = true;
  }
  isOpenSyllabus() {
    this.isOpenSyllabusAttachment = true;
  }
  getDocumentPreview(code: any, name: string, fileExtension: string) {
    Swal.fire({
      title: 'Loading document...',
      text: 'Please wait...',
      didOpen: () => {
        Swal.showLoading();
      },
      showConfirmButton: false,
    });
    this.documentService.getDocument(code).subscribe(
      (response: Blob) => {
        if (!response) {
          Swal.close();
          return;
        }
        if (!(response instanceof Blob)) {
          Swal.close();
          this.toastr.error('The retrieved document is not valid.');
          return;
        }
        let blobType: string;
        switch (fileExtension.toLowerCase()) {
          case '.pdf':
            blobType = 'application/pdf';
            break;
          case '.jpg':
          case '.jpeg':
            blobType = 'image/jpeg';
            break;
          case '.png':
            blobType = 'image/png';
            break;
          case '.gif':
            blobType = 'image/gif';
            break;
          default:
            blobType = 'application/pdf';
            break;
        }
        const blob = new Blob([response], { type: blobType });
        const url = window.URL.createObjectURL(blob);
        let htmlContent: string;
        if (blobType  === 'application/pdf') {
          htmlContent = `<iframe src="${url}" width="100%" height="700px" frameborder="0"></iframe>`;
        } else if (blobType.startsWith('image/')) {
          htmlContent = `<img src="${url}" height="auto" />`;
        } else {
          Swal.close();
          this.toastr.error('Unsupported file type.');
          return;
        }
        Swal.fire({
          title: name,
          html: htmlContent,
          width:'100%',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: 'Close',
          willClose: () => {
            window.URL.revokeObjectURL(url);
          },
        });
      },
      (error) => {
        console.error('File preview error:', error);
        Swal.close();
        this.toastr.error('Failed to preview the document');
      }
    );
  }
  safeStringify(obj: any) {
    const seen = new WeakSet();  // Keeps track of objects we've already seen
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return; // Skip cyclic reference
        }
        seen.add(value);
      }
      return value;
    });
  }
  getDocumentScanDemo(recordId:any,  person:{}, name:any, moduleName:any, fileExtension:any,) {
    sessionStorage.setItem('modelData', this.safeStringify(person));
    this.router.navigate(['/document-scan',this.admissionApplication.id,recordId, name, moduleName, fileExtension]);
  }
}
