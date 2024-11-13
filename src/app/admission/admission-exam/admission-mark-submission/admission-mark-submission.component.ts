import {Component, OnInit} from '@angular/core';
import {AdmissionMarkTeacherService} from "../../../Service/admission/admission-exam/admissionMarkTeacher.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {AdmissionMarkTeacher} from "../../../model/admission/admission-exam/admissionMarkTeacher";
import {AdmissionMarkSubmitService} from "../../../Service/admission/admission-exam/admissionMarkSubmit.service";
import {AdmissionMarkSubmit} from "../../../model/admission/admission-exam/admissionMarkSubmit";
import {AdmissionMarkApplicantService} from "../../../Service/admission/admission-exam/admissionMarkApplicant.service";
import {AdmissionMarkEntry} from "../../../model/admission/admission-exam/admissionMarkEntry";
import {AdmissionMarkEntryService} from "../../../Service/admission/admission-exam/admissionMarkEntry.service";

@Component({
  selector: 'app-admission-mark-submission',
  templateUrl: './admission-mark-submission.component.html',
  styleUrls: ['./admission-mark-submission.component.css']
})
export class AdmissionMarkSubmissionComponent implements OnInit{
  admissionMarkTeacher:any = new AdmissionMarkTeacher();
  admissionMarkSubmit:any = new AdmissionMarkSubmit();
  admissionMarkEntry:any = new AdmissionMarkEntry();
  admission_applicants:any=[];
  admission_submissions:any=[];
  markDistributionId: any;
  loading:boolean=false;
  constructor(private admissionMarkTeacherService:AdmissionMarkTeacherService,
              private admissionMarkSubmitService: AdmissionMarkSubmitService,
              private admissionMarkApplicantService: AdmissionMarkApplicantService,
              private admissionMarkEntryService: AdmissionMarkEntryService,
              private toastr: ToastrService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.getAdmissionMarkEntryView();
  }
  getAdmissionMarkEntryView(){
    this.route.params.subscribe((params)=>{
      const admissionMarkTeacherId = +params['id'];
      this.admissionMarkTeacherService.getAdmissionMarkTeacherView(admissionMarkTeacherId).subscribe((response:any)=>{
        this.admissionMarkTeacher = response.data;
        this.getAdmissionMarkSubmit(this.admissionMarkTeacher.admissionExam.id);
        this.getAdmissionMarkApplicant(this.admissionMarkTeacher.admissionExam.id);
        this.getAdmissionMarkSubmitFind(this.admissionMarkTeacher.admissionExam.id, this.admissionMarkTeacher.admissionMarkDistribution.id);
      });
    })
  }
  getAdmissionMarkSubmit(admissionExamId:any){
    this.admissionMarkSubmitService.getAdmissionMarkSubmit(admissionExamId).subscribe((response:any)=>{
      this.admission_submissions = response.data;
    });
  }
  getAdmissionMarkSubmitFind(admissionExamId:any, admissionDistributionId:any){
    this.admissionMarkSubmitService.getAdmissionMarkSubmitFind(admissionExamId, admissionDistributionId).subscribe((response:any)=>{
      this.admissionMarkSubmit = response.data;
      console.log(response.data.length);
    });
  }
  changeMode(admission_applicant:any){
    admission_applicant.selected = true;
  }
  postAdmissionMarkSubmit() {
    this.admissionMarkSubmit.employeeInfoId = this.admissionMarkTeacher.employeeInfo.id;
    this.admissionMarkSubmit.admissionExamId = this.admissionMarkTeacher.admissionExam.id;
    this.admissionMarkSubmit.admissionMarkTemplateId = this.admissionMarkTeacher.admissionMarkTemplate.id;
    this.admissionMarkSubmit.admissionMarkDistributionId = this.admissionMarkTeacher.admissionMarkDistribution.id;
    this.admissionMarkSubmit.admissionMarkTeacherId = this.admissionMarkTeacher.id;
    this.admissionMarkSubmit.status = 1;
    this.admissionMarkSubmitService.postAdmissionMarkSubmit(this.admissionMarkSubmit).subscribe((response:any)=>{
      if(response.status){
        this.toastr.success(response.message);
        this.getAdmissionMarkEntryView();
      }
    })
  }
  getAdmissionMarkApplicant(admissionExamId:any){
    this.admissionMarkApplicantService.getAdmissionMarkApplicant(admissionExamId).subscribe((response:any)=>{
      this.admission_applicants = response.data;
      this.admission_applicants.forEach((item:any)=>{
        if(item.admissionMarkEntries.length){
        const data = item.admissionMarkEntries.find((itm:any)=>itm.admissionMarkDistribution.id === this.admissionMarkTeacher.admissionMarkDistribution.id);
          item.mark = data?.mark;
          item.markId = data?.id;
        }
      })
    });
  }

  postAdmissionMarkEntry(admission_applicant: any) {
    this.loading = true;
    this.admissionMarkEntry.admissionMarkApplicantId = admission_applicant.id
    this.admissionMarkEntry.admissionMarkDistributionId = this.admissionMarkTeacher.admissionMarkDistribution.id;
    this.admissionMarkEntry.admissionMarkTeacherId = this.admissionMarkTeacher.id;
    this.admissionMarkEntry.mark = admission_applicant.mark;
    console.log(admission_applicant.markId)
    if(admission_applicant.markId){
      this.admissionMarkEntryService.putAdmissionMarkEntry(this.admissionMarkEntry, admission_applicant.markId).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.toastr.success(response.message);
          this.getAdmissionMarkApplicant(this.admissionMarkTeacher.admissionExam.id);
        }else {
          this.loading = false;
        }
      })
    }else {
      this.admissionMarkEntryService.postAdmissionMarkEntry(this.admissionMarkEntry).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.toastr.success(response.message);
          this.getAdmissionMarkApplicant(this.admissionMarkTeacher.admissionExam.id);
        }else {
          this.loading = false;
        }
      })
    }

  }

  putAdmissionMarkEntry(admission_applicant: any) {
    this.loading = true;
    this.admissionMarkEntry.id = admission_applicant.markId;
    this.admissionMarkEntry.admissionMarkApplicantId = admission_applicant.id
    this.admissionMarkEntry.admissionMarkDistributionId = this.admissionMarkTeacher.admissionMarkDistribution.id;
    this.admissionMarkEntry.mark = admission_applicant.mark;
    this.admissionMarkEntryService.putAdmissionMarkEntry(this.admissionMarkEntry, this.admissionMarkEntry.id).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
        this.getAdmissionMarkEntryView();
      }else {
        this.loading = false;
      }
    })
  }
}
