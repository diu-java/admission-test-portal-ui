import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {CountryService} from "../../../Service/common-setup/country.service";
import {PersonInformation} from "../../../model/student/personInformation";
import {PassportInformation} from "../../../model/student/passportInformation";
import {PersonInformationService} from "../../../Service/student/personInformation.service";
import {StudentPassportInformationService} from "../../../Service/student/studentPassportInformation.service";
import {StudentDocumentService} from "../../../Service/student/studentDocument.service";

@Component({
  selector: 'app-student-passport-information',
  templateUrl: './student-passport-information.component.html',
  styleUrls: ['./student-passport-information.component.css']
})
export class StudentPassportInformationComponent implements OnInit{
  @ViewChild('passportInformationForm') formPassportInformation: NgForm | undefined;
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isVisaInfoView:boolean = false;
  isPassportInfoView:boolean = false;

  passportInformation = new PassportInformation();
  passport_informations:any=[];
  countries:any=[];
  sMessage:any;
  constructor(private service: PersonInformationService,
              private route: ActivatedRoute,
              private toastr: ToastrService, private passportInformationService: StudentPassportInformationService,
              private countryService: CountryService, private documentService: StudentDocumentService) {
  }
  ngOnInit() {
    this.getPersonInformationView();
    this.getCountry();
  }
  getPersonInformationView(){
    this.route.params.subscribe((params)=>{
      const personId = +params['id'];
      this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
        this.personInformation = response.data;
        this.getPassportInformation(this.personInformation.id);
      });
    })
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }
  passportInfoView() {
    this.isPassportInfoView = true;
    this.passportInformation = new PassportInformation();
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }
  postDocument(event: any){
    const file:File = event.target.files[0];
    this.documentService.postDocument(file,this.personInformation.id, 'Passport', 'Passport').subscribe((response:any)=>{
      if(response.status){
        // this.toastr.success(response.message);
        this.sMessage = response.message;
        this.passportInformation.attachmentId = response.data.id;
      }
    })
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

  // Passport Information Start
  getPassportInformation(personId:any){
    this.passportInformationService.getPassportInformation(personId).subscribe((response:any)=>{
      this.passport_informations = response.data;
    })
  }

  postPassportInformation() {
    this.passportInformation.studentPersonId = this.personInformation.id;
    this.passportInformationService.postPassportInformation(this.passportInformation).subscribe((response:any)=>{
      if (response.status){
        this.passportInformation = new PassportInformation();
        this.formPassportInformation?.resetForm(this.passportInformation);
        this.toastr.success(response.message);
        this.passport_informations.push(response.data);
      }
    })
  }

  putPassportInformation() {
    this.passportInformation.studentPersonId = this.personInformation.id;
    this.passportInformationService.putPassportInformation(this.passportInformation, this.passportInformation.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.passport_informations.findIndex((item: PassportInformation) => item.id === this.passportInformation.id);
        this.passport_informations[indexToUpdate] = response.data;
        this.passportInformation = new PassportInformation();
        this.formPassportInformation?.resetForm(this.passportInformation);
        this.toastr.success(response.message);

        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelPassportInformation() {
    this.passportInformation = new PassportInformation();
    this.formPassportInformation?.resetForm(this.passportInformation);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editPassportInformation(passport_information: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isPassportInfoView = true;
    this.passportInformation = passport_information;
    this.passportInformation.issueCountryId = passport_information.issueCountry.id;
    if(passport_information.attachment){
      this.passportInformation.attachmentId = passport_information.attachment.id;
    }
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
        this.passportInformationService.deletePassportInformation(passport_information.id).subscribe((response:any) => {
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
  // Passport Information End

}
