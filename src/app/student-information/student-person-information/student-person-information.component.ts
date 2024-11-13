import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonInformation} from "../../model/student/personInformation";
import {CountryService} from "../../Service/common-setup/country.service";
import {PersonInformationService} from "../../Service/student/personInformation.service";
import {GenderService} from "../../Service/common-setup/gender.service";
import {BloodGroupService} from "../../Service/common-setup/bloodGroup.service";
import {MaritalStatusService} from "../../Service/common-setup/maritalStatus.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {StudentDocumentService} from "../../Service/student/studentDocument.service";
import {ReligionService} from "../../Service/common-setup/religion.service";
import {Title} from "@angular/platform-browser";
import {StudentInformation} from "../../model/student/studentInformation";

@Component({
  selector: 'app-student-person-information',
  templateUrl: './student-person-information.component.html',
  styleUrls: ['./student-person-information.component.css']
})
export class StudentPersonInformationComponent implements OnInit{
  @Input() studentInformation:any = new StudentInformation();
  @ViewChild('personInformationForm') form: NgForm | undefined;
  activeTab: number = 1;
  isPersonalInfoView:boolean = false;
  isDocumentInfoView:boolean = false;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isMarried:boolean = false;
  countries:any=[];
  genders:any=[];
  blood_groups:any=[];
  marital_statuses:any=[];
  religions:any=[];
  personInformation:any = new PersonInformation();
  sMessage:any;
  birthCertificateMessage:any;
  etinMessage:any;
  photoMessage:any;
  signatureMessage:any;
  studentPhotoInformation:any=[];
  studentSignatureInformation:any=[];

  constructor(private countryService: CountryService, private service: PersonInformationService, private genderService: GenderService, private bloodGroupService: BloodGroupService, private maritalStatusService: MaritalStatusService,
              private toastr: ToastrService, private route: ActivatedRoute, private documentService: StudentDocumentService, private religionService: ReligionService,
              private titleService: Title) {
    this.titleService.setTitle('Student Look Up')
  }
  ngOnInit() {
    this.getStudentInformationView();
    this.getCountry();
    this.getGender();
    this.getBloodGroup();
    this.getMaritalStatus();
    this.getReligion();
  }
  getStudentInformationView(){
      this.service.getViewPersonInformation(this.studentInformation.studentPerson.id).subscribe((response:any)=>{
        this.personInformation = response.data;
      });
  }
  getPersonInformation(personId:any){

    this.personInformation = personId;
  }

  activateTab(tabName: number) {
    this.activeTab = tabName;
  }


  personalInfoView(personInformation:any) {
    this.isPersonalInfoView = !this.isPersonalInfoView;
    this.personInformation = personInformation;
    this.personInformation.active = personInformation.active;
    this.personInformation.genderId = personInformation.gender.id;

    this.personInformation.bloodGroupId = personInformation.bloodGroup.id;
    if(personInformation.religion){
      this.personInformation.religionId = personInformation.religion.id;
    }
    if(personInformation.countryOfBirth){
      this.personInformation.countryOfBirth = personInformation.countryOfBirth.id;
    }
    this.selectMaritalStatus();
    if(personInformation.maritalStatus){
      this.personInformation.maritalStatusId = personInformation.maritalStatus.id;
    }
    if(personInformation.tinAttachment){
      this.personInformation.tinAttachmentId = personInformation.tinAttachment.id;
    }
    if(personInformation.nationalAttachment){
      this.personInformation.nationalAttachmentId = personInformation.nationalAttachment.id;
    }
    if(personInformation.birthCertificateAttachment){
      this.personInformation.birthCertificateAttachmentId = personInformation.birthCertificateAttachment.id;
    }

  }

  documentInfoView() {
    this.isDocumentInfoView = true;
  }

  // common service info
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
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
  getMaritalStatus(){
    this.maritalStatusService.getMaritalStatusActive().subscribe((response:any)=>{
      this.marital_statuses = response.data;
    })
  }
  selectMaritalStatus(){
    let indexToUpdate = this.marital_statuses.findIndex((item: any) => item.id === this.personInformation.maritalStatusId && item.isDetail);
    if(indexToUpdate !== -1){
      this.isMarried = true;
    }else {
      this.isMarried = false;
    }
  }

  putPersonInformation() {
    if(this.personInformation.photoAttachment){
      this.personInformation.photoAttachmentId = this.personInformation.photoAttachment.id;
    }
    if(this.personInformation.signatureAttachment){
      this.personInformation.signatureAttachmentId = this.personInformation.signatureAttachment.id;
    }
    this.service.putPersonInformation(this.personInformation, this.personInformation.id).subscribe((response:any)=>{
      if(response.status){
        this.isPersonalInfoView = false;
        this.form?.resetForm(this.personInformation);
        this.toastr.success(response.message);
        this.personInformation=response.data;
      }
    })
  }
  postNID(event: any){
    const file:File = event.target.files[0];
    this.documentService.postDocument(file,this.personInformation.id, 'NID', 'NID').subscribe((response:any)=>{
      if(response.status){
        this.sMessage = response.message;
        this.personInformation.nationalAttachmentId = response.data.id;
      }
    })
  }
  postBirthCertificate(event: any){
    const file:File = event.target.files[0];
    this.documentService.postDocument(file,this.personInformation.id, 'BirthCertificate', 'BirthCertificate').subscribe((response:any)=>{
      if(response.status){
        this.birthCertificateMessage = response.message;
        this.personInformation.birthCertificateAttachmentId = response.data.id;
      }
    })
  }
  postETIn(event: any){
    const file:File = event.target.files[0];
    this.documentService.postDocument(file,this.personInformation.id, 'ETIN', 'ETIN').subscribe((response:any)=>{
      if(response.status){
        this.etinMessage = response.message;
        this.personInformation.tinAttachmentId = response.data.id;
      }
    })
  }
  postPhoto(event: any){
    const file:File = event.target.files[0];
    this.documentService.postDocument(file,this.personInformation.id, 'Profile Picture', 'Profile Picture').subscribe((response:any)=>{
      if(response.status){
        this.photoMessage = response.message;
        this.personInformation.photoAttachmentId = response.data.id;
        this.studentPhotoInformation = response.data;
      }
    })
  }
  postSignature(event: any){
    const file:File = event.target.files[0];
    this.documentService.postDocument(file,this.personInformation.id, 'Signature', 'Signature').subscribe((response:any)=>{
      if(response.status){
        this.signatureMessage = response.message;
        this.personInformation.signatureAttachmentId = response.data.id;
        this.studentSignatureInformation = response.data;
      }
    })
  }

  getStudentDocument(code:any, name:any, fileExtension:any){
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

  cancelPersonInformation() {
    this.isPersonalInfoView = false;
  }
}
