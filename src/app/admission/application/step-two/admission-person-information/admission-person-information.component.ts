import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {NgForm} from "@angular/forms";
import {AdmissionPersonService} from "../../../../Service/admission/admission/admissionPerson.service";
import {GenderService} from "../../../../Service/common-setup/gender.service";
import {AddressTypeService} from "../../../../Service/common-setup/addressType.service";
import {MaritalStatusService} from "../../../../Service/common-setup/maritalStatus.service";
import {BloodGroupService} from "../../../../Service/common-setup/bloodGroup.service";
import {CountryService} from "../../../../Service/common-setup/country.service";
import {ReligionService} from "../../../../Service/common-setup/religion.service";
import {ToastrService} from "ngx-toastr";
import {ApplicantDocumentService} from "../../../../Service/admission/application/applicantDocument.service";
import {Gender} from "../../../../model/common-setup/gender";
import {Religion} from "../../../../model/common-setup/religion";
import {BloodGroup} from "../../../../model/common-setup/bloodGroup";
import {MaritalStatus} from "../../../../model/common-setup/maritalStatus";
import {Country} from "../../../../model/common-setup/country";
import {AddressType} from "../../../../model/common-setup/addressType";
import {NationalityService} from "../../../../Service/common-setup/nationality.service";
import {Nationality} from "../../../../model/common-setup/nationality";
import Swal from "sweetalert2";
import {FileAttachment} from "../../../../model/file-attachment.model";
import {AttachmentService} from "../../../../Service/attachment.service";

@Component({
  selector: 'app-admission-person-information',
  templateUrl: './admission-person-information.component.html',
  styleUrls: ['./admission-person-information.component.css']
})
export class AdmissionPersonInformationComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('personalInformationForm') form: NgForm | undefined;

  isPersonInfoView:boolean = false;
  genders:any=[];
  blood_groups:any=[];
  religions:any=[];
  countries:any=[];
  marital_statuses:any=[];
  isMarried:boolean = false;
  nidMessage:any;
  birthMessage:any;
  photoMessage:any;
  signatureMessage:any;
  address_types:any=[];
  nationalities:any=[];
  formSubmitted: boolean = false;
  loading: boolean = false;
  attachment: FileAttachment | null = null;
  // scanner: any;
  constructor(private service: AdmissionPersonService, private genderService: GenderService,
              private maritalStatusService: MaritalStatusService, private nationalityService: NationalityService,
              private addressTypeService: AddressTypeService, private router: Router,
              private bloodGroupService: BloodGroupService, private countryService: CountryService, private documentService: ApplicantDocumentService,
              private religionService: ReligionService, private toastr: ToastrService, private attachmentService: AttachmentService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getAddressType()
    this.getGender();
    this.getBloodGroup();
    this.getReligion();
    this.getCountry();
    this.getMaritalStatus();
    this.getNationality();

    this.documentService.isOpenFormView$.subscribe((status: boolean) => {
      this.isPersonInfoView = status;
    });
    const savedModelData = sessionStorage.getItem('modelData');

    let existingAttachments: any[] = JSON.parse(sessionStorage.getItem('attachmentData') || '[]');
    if (!Array.isArray(existingAttachments)) {
      existingAttachments = [];
    }

    if(savedModelData){
      this.admissionApplication.admissionPersons[0] =  JSON.parse(savedModelData);
      existingAttachments.forEach((storedAttachment: any) => {
        if (storedAttachment?.name === 'NID') {
          this.admissionApplication.admissionPersons[0].nationalAttachment = storedAttachment;
        }
        if (storedAttachment?.name === 'BirthCertificate') {
          this.admissionApplication.admissionPersons[0].birthCertificateAttachment = storedAttachment;
        }
      });
    }
    sessionStorage.removeItem('modelData');

  }
  getAdmissionApplicationView(){
    this.admissionApplication?.admissionPersons.forEach((person:any)=>{
      person.gender = person.gender? person.gender: new Gender();
      person.religion = person.religion? person.religion: new Religion();
      person.bloodGroup = person.bloodGroup? person.bloodGroup: new BloodGroup();
      person.maritalStatus = person.maritalStatus? person.maritalStatus: new MaritalStatus();
      person.countryOfBirth = person.countryOfBirth? person.countryOfBirth: new Country();
      person.mailingAddress = person.mailingAddress? person.mailingAddress: new AddressType();
      person.nationality = person.nationality? person.nationality: new Nationality();
      this.selectMaritalStatus(person.maritalStatus?.id);
      // if(person.photoAttachment){
      //   person.photoAttachment.file = this.getDocumentPhoto(person.photoAttachment);
      // }
      // if(person.signatureAttachment){
      //   person.signatureAttachment.file = this.getDocumentPhoto(person.signatureAttachment);
      // }
    });
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

  personInfoView() {
    this.isPersonInfoView = true;
  }
  getNationality(){
    this.nationalityService.getNationalityActive().subscribe((response:any)=>{
      this.nationalities = response.data;
    })
  }

  getAddressType(){
    this.addressTypeService.getAddressTypeActive().subscribe((response:any)=>{
      this.address_types = response.data;
    })
  }
  getGender(){
    this.genderService.getGenderActive().subscribe((response:any)=>{
      this.genders = response.data;
    })
  }
  getBloodGroup(){
    this.bloodGroupService.getBloodGroupActive().subscribe((response:any)=>{
      this.blood_groups = response.data;
    })
  }
  getReligion(){
    this.religionService.getReligionActive().subscribe((response:any)=>{
      this.religions = response.data;
    })
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }
  getMaritalStatus(){
    this.maritalStatusService.getMaritalStatusActive().subscribe((response:any)=>{
      this.marital_statuses = response.data;
    })
  }

  selectMaritalStatus(id :any){
    let indexToUpdate = this.marital_statuses.findIndex((item: any) => item.id === id && item.isDetail);
    if(indexToUpdate !== -1){
      this.isMarried = true;
    }else {
      this.isMarried = false;
    }
  }

  getDocumentPhoto(attachment:any){
    return this.documentService.getDocumentPhoto(attachment.code).subscribe((response:any)=>{
      attachment.file = response;
    })
  }
  postNIDDoc(person:any, event: any){
    const file:File = event.target.files[0];
    console.log(file)
    const maxSizeInBytes = 500 * 1024;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
    this.nidMessage = '';
    if (file.size > maxSizeInBytes) {
      // this.nidMessage = `File size exceeds the maximum limit of ${maxSizeInMB}MB.`;
      this.toastr.error('File size exceeds the maximum limit of 500 KB')

    }else if (!allowedTypes.includes(file.type)){
      this.toastr.error('File type not supported. Only PDF, PNG, JPEG, JPG files are allowed.');
    }else {
      this.documentService.postDocument(file,person.id, 'NID', 'NID').subscribe((response:any)=>{
        if(response.status){
          this.nidMessage = response.message;
          person.nationalAttachment = response.data;
        }
      })
    }
  }

  postBirthDDoc(person:any, event: any){
    const file:File = event.target.files[0];
    console.log(file.type)
    const maxSizeInBytes = 500 * 1024;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
    this.birthMessage = '';
    if (file.size > maxSizeInBytes) {
      this.toastr.error('File size exceeds the maximum limit of 500 KB')

    }else if (!allowedTypes.includes(file.type)){
      this.toastr.error('File type not supported. Only PDF, PNG, JPEG, JPG files are allowed.');
    }else {
      this.documentService.postDocument(file,person.id, 'BirthCertificate', 'BirthCertificate').subscribe((response:any)=>{
        if(response.status){
          this.birthMessage = response.message;
          person.birthCertificateAttachment = response.data;
        }
      })
    }
  }

  postApplicantPhoto(person:any, event: any){
    const file:File = event.target.files[0];
    console.log(file.type)
    const maxSizeInBytes = 500 * 1024;
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    this.photoMessage = '';
    if (file.size > maxSizeInBytes) {
      // this.nidMessage = `File size exceeds the maximum limit of ${maxSizeInMB}MB.`;
      this.toastr.error('File size exceeds the maximum limit of 500 KB')

    }else if (!allowedTypes.includes(file.type)){
      this.toastr.error('File type not supported. Only PNG, JPEG, JPG files are allowed.');
    }else {
      this.documentService.postDocument(file,person.id, 'Photo', 'Photo').subscribe((response:any)=>{
        if(response.status){
          this.photoMessage = response.message;
          person.photoAttachment = response.data;
        }
      })
    }
  }

  postApplicantSignature(person:any, event: any){
    const file:File = event.target.files[0];
    console.log(file.type)
    const maxSizeInBytes = 500 * 1024;
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    this.photoMessage = '';
    if (file.size > maxSizeInBytes) {
      this.toastr.error('File size exceeds the maximum limit of 500 KB')

    }else if (!allowedTypes.includes(file.type)){
      this.toastr.error('File type not supported. Only PNG, JPEG, JPG files are allowed.');
    }else {
      this.documentService.postDocument(file,person.id, 'Signature', 'Signature').subscribe((response:any)=>{
        if(response.status){
          this.signatureMessage = response.message;
          person.signatureAttachment = response.data;
        }
      })
    }

  }
  getApplicantDocument(code:any, name:any, fileExtension:any){
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

  putAdmissionPersonInformation(person:any) {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    person.admissionApplicationId = this.admissionApplication.id;
    person.genderId = person.gender?.id;
    person.religionId = person.religion?.id;
    person.bloodGroupId = person.bloodGroup?.id;
    person.maritalStatusId = person.maritalStatus?.id;
    person.countryOfBirthId = person.countryOfBirth?.id;
    person.mailingAddressId = person.mailingAddress?.id;
    person.nationalityId = person.nationality?.id;
    person.nationalAttachmentId = person.nationalAttachment?.id
    person.birthCertificateAttachmentId = person.birthCertificateAttachment?.id
    person.photoAttachmentId = person.photoAttachment?.id
    person.signatureAttachmentId = person.signatureAttachment?.id
    this.service.putAdmissionPersonInformation(person, person.id).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
      }
    })
  }
  cancelPersonInformation() {
    this.isPersonInfoView = false;
  }

  getDocumentScan(refName:any,recordName:any, recordId:any, name:any, moduleName:any, fileExtension:any) {
    this.router.navigate(['/document-scan',this.admissionApplication.id,refName, recordName, recordId, name, moduleName, fileExtension]);
  }
  getDocumentScanDemo(recordId:any,  person:{}, name:any, moduleName:any, fileExtension:any,) {
    sessionStorage.setItem('modelData', this.safeStringify(person));
    this.router.navigate(['/document-scan',this.admissionApplication.id,recordId, name, moduleName, fileExtension]);
  }

  getDocument(code: any, name: string, fileExtension: string) {
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
  formatName(name: any) {
    if (name) {
      const formattedName = name.split(' ').map((word: string) => {
        const parts = word.split('-').map((part: string) => {
          if (part.endsWith('.')) {
            return part;
          } else if (part.includes('.')) {
            return part.split('.').map((subPart: string) => subPart.toUpperCase()).join('.');
          } else {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          }
        });
        return parts.join('-');
      }).join(' ');
      return formattedName;
    }
  }


}
