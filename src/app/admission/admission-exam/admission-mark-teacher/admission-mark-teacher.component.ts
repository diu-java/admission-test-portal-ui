import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionMarkTemplateService} from "../../../Service/admission/admission-exam/admissionMarkTemplate.service";
import {
  AdmissionMarkDistributionService
} from "../../../Service/admission/admission-exam/admissionMarkDistribution.service";
import {AdmissionMarkHeadService} from "../../../Service/admission/admission-exam/admissionMarkHead.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {AdmissionExamService} from "../../../Service/admission/admission-exam/admissionExam.service";
import {AdmissionExam} from "../../../model/admission/admission-exam/admissionExam";
import {AdmissionMarkTeacherService} from "../../../Service/admission/admission-exam/admissionMarkTeacher.service";
import {AdmissionMarkTeacher} from "../../../model/admission/admission-exam/admissionMarkTeacher";
import {EmployeeInformationService} from "../../../Service/employee/employeeInformation.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-teacher-assign',
  templateUrl: './admission-mark-teacher.component.html',
  styleUrls: ['./admission-mark-teacher.component.css']
})
export class AdmissionMarkTeacherComponent implements OnInit{
  @ViewChild('admissionMarkTeacherForm') form: NgForm | undefined;
  admissionExam:any=new AdmissionExam();
  admissionMarkTeacher:any = new AdmissionMarkTeacher();
  isAdmissionMarkTeacherView:boolean = false;
  admission_mark_teachers:any=[];
  admission_mark_distributions:any=[];
  employees:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(private admissionMarkTemplateService: AdmissionMarkTemplateService,
              private admissionMarkDistributionService: AdmissionMarkDistributionService,
              private admissionMarkHeadService:AdmissionMarkHeadService,
              private admissionExamService: AdmissionExamService,
              private admissionMarkTeacherService:AdmissionMarkTeacherService,
              private employeeInformationService: EmployeeInformationService,
              private toastr: ToastrService, private route: ActivatedRoute,
              private router: Router,
  ) {
  }
  ngOnInit() {
    this.getAdmissionExamView();
    this.getEmployee();
  }
  getAdmissionExamView(){
    this.route.params.subscribe((params)=>{
      const admissionExamId = +params['id'];
      this.admissionExamService.getViewAdmissionExam(admissionExamId).subscribe((response:any)=>{
        this.admissionExam = response.data;
        this.getAdmissionMarkTeacher(this.admissionExam.id)
        console.log(this.admissionExam.admissionMarkTemplate.id)
        this.getAdmissionMarkDistribution(this.admissionExam.admissionMarkTemplate.id)
      });
    })
  }

  admissionMarkTeacherView() {
    this.isAdmissionMarkTeacherView = !this.isAdmissionMarkTeacherView;
  }
  getEmployee(){
    this.employeeInformationService.getEmployeeInformationActive().subscribe((response:any)=>{
      this.employees = response.data;
    })
  }
  getAdmissionMarkDistribution(admissionMarkTemplateId:any){
    this.admissionMarkDistributionService.getAdmissionMarkDistributionActive(admissionMarkTemplateId).subscribe((response:any)=>{
      this.admission_mark_distributions = response.data;
    })
  }
  getAdmissionMarkTeacher(admissionExamId:any){
    this.admissionMarkTeacherService.getAdmissionMarkTeacher(admissionExamId).subscribe((response:any)=>{
      this.admission_mark_teachers = response.data;
    })
  }

  editAdmissionMarkTeacher(admission_mark_teacher: any) {
    this.isAdmissionMarkTeacherView  = true;
    this.admissionMarkTeacher = admission_mark_teacher;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.admissionMarkTeacher.employeeInfoId = admission_mark_teacher.employeeInfo.id;
    this.admissionMarkTeacher.admissionMarkDistributionId = admission_mark_teacher.admissionMarkDistribution.id;

  }

  deleteAdmissionMarkTeacher(admission_mark_teacher: any) {
    Swal.fire({
      title: 'Admission Mark Teacher Delete',
      text: 'Are you want to delete this Admission Mark Teacher.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionMarkTeacherService.deleteAdmissionMarkTeacher(admission_mark_teacher.id).subscribe((response:any) => {
          if(response.status){
            this.admission_mark_teachers = this.admission_mark_teachers.filter((item: any)  => item !== admission_mark_teacher);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  postAdmissionMarkTeacher() {
    this.admissionMarkTeacher.admissionExamId = this.admissionExam.id;
    this.admissionMarkTeacher.admissionMarkTemplateId = this.admissionExam.admissionMarkTemplate.id;
    this.admissionMarkTeacher.active = true;
    this.admissionMarkTeacherService.postAdmissionMarkTeacher(this.admissionMarkTeacher).subscribe((response:any)=>{
      if(response.status){
        this.admissionMarkTeacher = new AdmissionMarkTeacher();
        this.form?.resetForm(this.admissionMarkTeacher);
        this.toastr.success(response.message);
        this.admission_mark_teachers.push(response.data);
        this.isAdmissionMarkTeacherView = false;
      }
    })
  }

  putAdmissionMarkTeacher() {
    this.admissionMarkTeacher.admissionExamId = this.admissionExam.id;
    this.admissionMarkTeacher.admissionMarkTemplateId = this.admissionExam.admissionMarkTemplate.id;
    this.admissionMarkTeacherService.putAdmissionMarkTeacher(this.admissionMarkTeacher, this.admissionMarkTeacher.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_mark_teachers.findIndex((item: AdmissionMarkTeacher) => item.id === this.admissionMarkTeacher.id);
        this.admission_mark_teachers[indexToUpdate] = response.data;
        this.admissionMarkTeacher = new AdmissionMarkTeacher();
        this.form?.resetForm(this.admissionMarkTeacher);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionMarkTeacherView = false;
      }
    })
  }

  cancelAdmissionMarkTeacher() {
    this.isAdmissionMarkTeacherView = !this.isAdmissionMarkTeacherView;
    this.isUpdateButton = false;
    this.isSaveButton = true;
    this.admissionMarkTeacher = new AdmissionMarkTeacher();
  }

  getBack() {
    this.router.navigate(['/admission-exam']);
  }
}
