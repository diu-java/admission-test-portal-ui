import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonInformation} from "../../model/student/personInformation";
import {VisaInformation} from "../../model/student/visaInformation";
import {PersonInformationService} from "../../Service/student/personInformation.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {StudentVisaInformationService} from "../../Service/student/studentVisaInformation.service";
import {StudentDocumentService} from "../../Service/student/studentDocument.service";
import Swal from "sweetalert2";
import {StudentInformation} from "../../model/student/studentInformation";

@Component({
  selector: 'app-student-visa',
  templateUrl: './student-visa.component.html',
  styleUrls: ['./student-visa.component.css']
})
export class StudentVisaComponent implements OnInit{
  @Input() studentInformation:any = new StudentInformation();
  @ViewChild('visaInformationForm') formVisaInformation: NgForm | undefined;
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isVisaInfoView:boolean = false;
  visaInformation = new VisaInformation();
  document=new Document();
  visa_informations:any=[];
  sMessage:any;
  isImage: boolean=true;
  constructor(private service: PersonInformationService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private visaInformationService: StudentVisaInformationService,
              private documentService: StudentDocumentService,
  ) {
  }
  ngOnInit() {
    this.getPersonInformationView();
  }
  getPersonInformationView(){
    this.getVisaInformation(this.studentInformation.studentPerson.id);
    // this.route.params.subscribe((params)=>{
    //   const personId = +params['id'];
    //   this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
    //     this.personInformation = response.data;
    //     this.getVisaInformation(this.personInformation.id);
    //   });
    // })
  }
  studentVisaInfoView(){
    this.isVisaInfoView = !this.isVisaInfoView;
    this.visaInformation = new VisaInformation();
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }
  postDocument(event: any){
    const file:File = event.target.files[0];
    this.documentService.postDocument(file,this.personInformation.id, 'VISA', 'VISA').subscribe((response:any)=>{
      if(response.status){
        this.sMessage = response.message;
        this.visaInformation.attachmentId = response.data.id;
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
  // VISA Information Start
  getVisaInformation(studentPersonId:any){
    this.visaInformationService.getVisaInformation(studentPersonId).subscribe((response:any)=>{
      this.visa_informations = response.data;

    })
  }


  postVisaInformation() {
    this.visaInformation.studentPersonId = this.studentInformation.studentPerson.id;
    this.visaInformationService.postVisaInformation(this.visaInformation).subscribe((response:any)=>{
      if (response.status){
        this.visaInformation = new VisaInformation();
        this.formVisaInformation?.resetForm(this.visaInformation);
        this.toastr.success(response.message);
        this.visa_informations.push(response.data);
      }
    })
  }

  putVisaInformation() {
    this.visaInformation.studentPersonId = this.personInformation.id;
    this.visaInformationService.putVisaInformation(this.visaInformation, this.visaInformation.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.visa_informations.findIndex((item: VisaInformation) => item.id === this.visaInformation.id);
        this.visa_informations[indexToUpdate] = response.data;
        this.visaInformation = new VisaInformation();
        this.formVisaInformation?.resetForm(this.visaInformation);
        this.toastr.success(response.message);

        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelVisaInformation() {
    this.visaInformation = new VisaInformation();
    this.formVisaInformation?.resetForm(this.visaInformation);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isVisaInfoView = false;
  }

  editVisaInformation(visa_information: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isVisaInfoView = true;
    this.visaInformation = visa_information;
    if(visa_information.attachment){
      this.visaInformation.attachmentId = visa_information.attachment.id;
    }
  }

  deleteVisaInformation(visa_information: any) {
    Swal.fire({
      title: 'Visa Information Delete',
      text: 'Are you want to delete this Visa Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.visaInformationService.deleteVisaInformation(visa_information.id).subscribe((response:any) => {
          if(response.status){
            this.visa_informations = this.visa_informations.filter((item: any)  => item !== visa_information);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
