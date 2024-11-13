import {Component, Input, OnInit} from '@angular/core';
import {
  AdmissionTestApplicantEnrollService
} from "../../../Service/admission/admission-test/admissionTestApplicantEnroll.service";
import {AdmissionTest} from "../../../model/admission/admission-test/admissionTest";

@Component({
  selector: 'app-admission-test-applicant-enroll',
  templateUrl: './admission-test-applicant-enroll.component.html',
  styleUrls: ['./admission-test-applicant-enroll.component.css']
})
export class AdmissionTestApplicantEnrollComponent implements OnInit{
  @Input() admissionTest:any=new AdmissionTest();
  admission_test_applicants = [];
  constructor(private admissionTestApplicantEnrollService: AdmissionTestApplicantEnrollService) {
  }
  ngOnInit() {
  }

  applicantUpdate() {
    this.admissionTestApplicantEnrollService.getAdmissionTestApplicantEnroll().subscribe((response:any)=>{
      this.admissionTest.applicants = response.data;
    })
  }

  downloadPDFReport() {
    this.admissionTestApplicantEnrollService.getAdmissionTestApplicantEnroll().subscribe((response:any)=>{
      this.admissionTest.applicants = response.data;
    })
  }
}
