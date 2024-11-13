import {Component, Input, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {
  ApplicantPassportInformation
} from "../../../../model/admission/applicantInformation/applicantPassportInformation";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {CountryService} from "../../../../Service/common-setup/country.service";
import {
  ApplicantPassportInformationService
} from "../../../../Service/admission/application/applicantPassportInformation.service";
import {ToastrService} from "ngx-toastr";
import {ApplicantDocumentService} from "../../../../Service/admission/application/applicantDocument.service";

@Component({
  selector: 'app-applicant-passport',
  templateUrl: './applicant-passport.component.html',
  styleUrls: ['./applicant-passport.component.css']
})
export class ApplicantPassportComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('passportInformationForm') form: NgForm | undefined;
  applicantPassportInformation:any=new ApplicantPassportInformation();
  countries:any=[];
  passport_informations:any=[];
  admissionPerson = new AdmissionPerson();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isPassportView:boolean = false;
  sMessage:boolean =false;
  loading:boolean =false;
  formSubmitted: boolean = false;
  isOpenAttachment:boolean = false;
  constructor(private countryService: CountryService,
              private service: ApplicantPassportInformationService, private documentService: ApplicantDocumentService,
              private toastr: ToastrService,
  ) {
  }
  ngOnInit() {
    this.getCountry();
    this.getAdmissionApplicationView();
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getPassportInformation(person?.admissionPassportInformations);
    })
  }
  passportView() {
    this.isPassportView = !this.isPassportView;
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isOpenAttachment = true;
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }
  getPassportInformation(passport:any){
    this.passport_informations  = passport;
  }
  postDocument(event: any){
    const file:File = event.target.files[0];
    this.documentService.postDocument(file,this.admissionPerson.id, 'Passport', 'Passport').subscribe((response:any)=>{
      if(response.status){
        this.sMessage = response.message;
        this.applicantPassportInformation.attachmentId = response.data.id;
      }
    })
  }
  isOpenFile() {
    this.isOpenAttachment = true;
  }
  getDocument(code:any, name:any, fileExtension:any){
    this.documentService.getDocument(code).subscribe((response:Blob)=>{
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
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
  postPassportInformation() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantPassportInformation.admissionPersonId = this.admissionPerson.id;
    this.service.postPassportInformation(this.applicantPassportInformation).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.applicantPassportInformation = new ApplicantPassportInformation();
        this.form?.resetForm(this.applicantPassportInformation);
        this.toastr.success(response.message);
        this.passport_informations.push(response.data);
        this.isPassportView = false;
      }
    })
  }
  editPassportInformation(passport_information: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isPassportView = true;
    this.applicantPassportInformation = passport_information;
    this.applicantPassportInformation.issueCountryId = passport_information.issueCountry.id;

    if(passport_information.attachment){
      this.isOpenAttachment =false;
      this.applicantPassportInformation.attachmentId = passport_information.attachment.id;
    }else {
      this.isOpenAttachment =true;
    }
  }

  putPassportInformation() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantPassportInformation.admissionPersonId = this.admissionPerson.id;
    this.service.putPassportInformation(this.applicantPassportInformation, this.applicantPassportInformation.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.passport_informations.findIndex((item: ApplicantPassportInformation) => item.id === this.applicantPassportInformation.id);
        this.passport_informations[indexToUpdate] = response.data;
        this.applicantPassportInformation = new ApplicantPassportInformation();
        this.form?.resetForm(this.applicantPassportInformation);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isPassportView = false;
      }
    })
  }

  cancelPassportInformation() {
    this.applicantPassportInformation = new ApplicantPassportInformation();
    this.form?.resetForm(this.applicantPassportInformation);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isPassportView = !this.isPassportView;
    this.formSubmitted = false;
  }

  deletePassportInformation(passport_information: any) {
    Swal.fire({
      title: 'Passport Information Delete',
      text: 'Are you want to delete this Passport Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deletePassportInformation(passport_information.id).subscribe((response:any) => {
          if(response.status){
            this.passport_informations = this.passport_informations.filter((item: any)  => item !== passport_information);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
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
          htmlContent = `<img src="${url}" width="500px"/>`;
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
}
