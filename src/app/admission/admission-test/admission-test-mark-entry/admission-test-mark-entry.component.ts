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
      this.admissionTestTeacher.admissionTest.applicants.forEach((applicant:any) => {
        applicant.marks = {};
        this.admissionTestTeacher.admissionTest.admissionTestTemplate.categories.forEach((category:any) => {
          applicant.marks[category.id] = {}; // Initialize category
          category.subjects.forEach((subject:any) => {
            applicant.marks[category.id][subject.id] = 0; // Initialize subject mark to 0 or a default value
          });
        });
      });

    });
  }
  calculateCategoryTotal(admission_applicant: any, category: any): number {
    let total = 0;
    if (admission_applicant.marks && admission_applicant.marks[category.id]) {
      for (const subjectId in admission_applicant.marks[category.id]) {
        if (admission_applicant.marks[category.id].hasOwnProperty(subjectId)) {
          total += admission_applicant.marks[category.id][subjectId] || 0;
        }
      }
    }
    return total;
  }

  changeMode(admission_applicant:any){
    admission_applicant.selected = true;
  }
  postAdmissionMarkEntry(admission_applicant: any) {
    console.log(this.admissionTestTeacher)
    this.admissionTestApplicantMark.admissionEnrollId = admission_applicant.id
    this.admissionTestApplicantMark.admissionTemplateCategorySubjectId = 0;
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
      this.loading = false;
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
  postAdmissionMarkEntry2(admission_applicant:any) {
    console.log(admission_applicant)
    const marksArray = [];
    for (const categoryId in admission_applicant.marks) {
      if (admission_applicant.marks.hasOwnProperty(categoryId)) {
        for (const subjectId in admission_applicant.marks[categoryId]) {
          if (admission_applicant.marks[categoryId].hasOwnProperty(subjectId)) {
            marksArray.push({
              categoryId: categoryId,
              subjectId: subjectId,
              mark: admission_applicant.marks[categoryId][subjectId]
            });
          }
        }
      }
    }
    const payload:any = {
      admissionEnrollId: admission_applicant.id,
      marks: marksArray
    };
    console.log(payload)
    this.admissionTestApplicantMarkService.postAdmissionTestApplicantMark(payload).subscribe((response:any) => {
      // Handle response, e.g., show confirmation or update view
    });
  }

}
