import {Component, OnInit} from '@angular/core';
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {AdmissionApplicationService} from "../../../../Service/admission/admission/admissionApplication.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";
import {ApplicantDocumentService} from "../../../../Service/admission/application/applicantDocument.service";

@Component({
  selector: 'app-admission-form-review',
  templateUrl: './admission-form-review.component.html',
  styleUrls: ['./admission-form-review.component.css']
})
export class AdmissionFormReviewComponent implements OnInit{
  admissionApplication:any = new AdmissionApplication();
  admissionPerson:any = new AdmissionPerson();
  isFreedomFighter:any[] = [];
  isTribal:any[] = [];
  isPhysicalDisorder:any[] = [];
  isFirstDivisionPlayer:any[] = [];
  isDIUEmployee:any[] = [];
  isDIUAlumni:any[] = [];
  payment:any;
  isChecked:boolean = false;
  constructor(private service: AdmissionApplicationService, private documentService: ApplicantDocumentService,
              private toastr: ToastrService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
  }
  getAdmissionApplicationView(){
    this.route.params.subscribe((params)=>{
      const admissionApplicationId = +params['id'];
      this.service.getViewAdmissionApplication(admissionApplicationId).subscribe((response:any)=>{
        this.admissionApplication = response.data;
        this.admissionApplication?.admissionPersons.forEach((person:any)=>{
          this.isFreedomFighter = person.admissionWaivers.filter((item:any)=>item.admissionWaiverType.code === 'FF')
          this.isTribal = person.admissionWaivers.filter((item:any)=>item.admissionWaiverType.code === 'TRI')
          this.isPhysicalDisorder = person.admissionWaivers.filter((item:any)=>item.admissionWaiverType.code === 'PD')
          this.isFirstDivisionPlayer = person.admissionWaivers.filter((item:any)=>item.admissionWaiverType.code === 'FDP')
          this.isDIUEmployee = person.admissionWaivers.filter((item:any)=>item.admissionWaiverType.code === 'EM')
          this.isDIUAlumni = person.admissionWaivers.filter((item:any)=>item.admissionWaiverType.code === 'AL')
          if(person.photoAttachment){
            person.photoAttachment.file = this.getDocumentPhoto(person.photoAttachment);
          }
          if(person.signatureAttachment){
            person.signatureAttachment.file = this.getDocumentPhoto(person.signatureAttachment);
          }
        });
      });
    })
  }
  getDocumentPhoto(attachment:any){
    return this.documentService.getDocumentPhoto(attachment.code).subscribe((response:any)=>{
      attachment.file = response;
    })
  }
  getBack() {
    this.router.navigate(['/admission-application-form', this.admissionApplication.id]);
  }

  // calculateAge(birthdate: string): number {
  //   const birthDate = new Date(birthdate);
  //   const today = new Date();
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDifference = today.getMonth() - birthDate.getMonth();
  //   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // }
  calculateAge(dob: Date): number {
    if(dob === undefined){
      return 0;
    }
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    if (age < 0) {
      age = 0;
    }
    return age;
  }
  submitApplication() {
    Swal.fire({
      title: 'Application Submission',
      text: 'Are you want to submit this Application',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionApplication.status = 1;
        this.service.submitAdmissionApplication(this.admissionApplication).subscribe((response:any) => {
          if(response.status){
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
