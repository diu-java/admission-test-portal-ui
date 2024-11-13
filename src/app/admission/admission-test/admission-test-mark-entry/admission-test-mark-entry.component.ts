import {Component, OnInit} from '@angular/core';
import {AdmissionTestTeacherService} from "../../../Service/admission/admission-test/admissionTestTeacher.service";
import {AdmissionTestTeacher} from "../../../model/admission/admission-test/admissionTestTeacher";
import {AdmissionTestApplicantMark} from "../../../model/admission/admission-test/admissionTestApplicantMark";
import {
  AdmissionTestApplicantMarkService
} from "../../../Service/admission/admission-test/admissionTestApplicantMark.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionTestSubmit} from "../../../model/admission/admission-test/admissionTestSubmit";

@Component({
  selector: 'app-admission-test-mark-entry',
  templateUrl: './admission-test-mark-entry.component.html',
  styleUrls: ['./admission-test-mark-entry.component.css']
})
export class AdmissionTestMarkEntryComponent implements OnInit{
  admission_test_teachers:any=[];
  admissionTeacherId:any;
  loading:boolean = false;
  admissionTestTeacher:any= new AdmissionTestTeacher();
  admissionTestApplicantMark:any=new AdmissionTestApplicantMark();
  admissionTestSubmit:any=new AdmissionTestSubmit();
  constructor(private admissionTestTeacherService: AdmissionTestTeacherService,
              private admissionTestApplicantMarkService:AdmissionTestApplicantMarkService,private toastr: ToastrService,
              ) {
  }
  ngOnInit() {
    this.getAdmissionTestTeacher();
  }
  getAdmissionTestTeacher() {
    this.admissionTestTeacherService.getAdmissionTestTeacherActive().subscribe((response:any)=>{
      this.admission_test_teachers = response.data;
    });
  }

  getApplicant(admissionTeacherId: any) {
    this.admissionTestTeacherService.getAdmissionTestTeacherView(admissionTeacherId).subscribe((response:any)=>{
      this.admissionTestTeacher = response.data;
      console.log(response.data)
    });
  }
  changeMode(admission_applicant:any){
    admission_applicant.selected = true;
  }
  postAdmissionMarkEntry(admission_applicant: any) {
    this.loading = true;
    this.admissionTestApplicantMark.admissionEnrollId = admission_applicant.id
    this.admissionTestApplicantMark.admissionMarkDistributionId = this.admissionTestTeacher.admissionMarkDistribution.id;
    this.admissionTestApplicantMark.admissionMarkTeacherId = this.admissionTestTeacher.id;
    this.admissionTestApplicantMark.mark = admission_applicant.mark;
    if(admission_applicant.markId){
      this.admissionTestApplicantMarkService.putAdmissionTestApplicantMark(this.admissionTestApplicantMark, admission_applicant.markId).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.toastr.success(response.message);
          // this.getAdmissionMarkApplicant(this.admissionTestTeacher.admissionTest.id);
        }else {
          this.loading = false;
        }
      })
    }else {
      this.admissionTestApplicantMarkService.postAdmissionTestApplicantMark(this.admissionTestApplicantMark).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.toastr.success(response.message);
          // this.getAdmissionMarkApplicant(this.admissionTestTeacher.admissionTest.id);
        }else {
          this.loading = false;
        }
      })
    }
  }
}
