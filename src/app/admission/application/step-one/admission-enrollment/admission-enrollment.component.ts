import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionEnrollment} from "../../../../model/admission/applicantInformation/admissionEnrollment";
import {AdmissionStudyCampusService} from "../../../../Service/admission/admission-setup/admissionStudyCampus.service";
import {BatchService} from "../../../../Service/academic/batch.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionFeeService} from "../../../../Service/admission/admission-setup/admissionFee.service";
import {AdmissionEnrollmentService} from "../../../../Service/admission/application/admissionEnrollment.service";
import {SemesterService} from "../../../../Service/academic/institute/semester.service";
import {SemesterTypeService} from "../../../../Service/academic/configuration/semesterType.service";
import {ProgramService} from "../../../../Service/academic/institute/program.service";
import {FacultyService} from "../../../../Service/academic/institute/faculty.service";
import {
  AdmissionEnrollmentTypeService
} from "../../../../Service/admission/admission-setup/admissionEnrollmentType.service";
import {AdmissionFeePayment} from "../../../../model/admission/applicantInformation/admissionFeePayment";
import {
  AdmissionApplicationPayment
} from "../../../../model/admission/applicantInformation/admissionApplicationPayment";
import Swal from "sweetalert2";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {AdmissionFeePaymentService} from "../../../../Service/admission/application/admissionFeePayment.service";
import {
  ApplicantAdmissionInformationComponent
} from "../applicant-admission-information/applicant-admission-information.component";

@Component({
  selector: 'app-admission-enrollment',
  templateUrl: './admission-enrollment.component.html',
  styleUrls: ['./admission-enrollment.component.css']
})
export class AdmissionEnrollmentComponent implements OnInit {
  @Input() admissionApplication:any = new AdmissionApplication();
  @Output() notifyParent: EventEmitter<void> = new EventEmitter();

  admissionEnrollment:any=new AdmissionEnrollment();
  admissionFeePayment:any=new AdmissionFeePayment();
  admissionApplicationPayment:any=new AdmissionApplicationPayment();
  admissionPerson:any = new AdmissionPerson();
  enableAdmissionPayment:boolean = false;
  enableAdmission:boolean = true;
  isEnrollmentView:boolean = false;
  enablePayment:boolean = false;
  loading:boolean = false;
  study_campuses:any=[];
  batches:any=[];
  semesters:any=[];
  semester_types:any=[];
  programs:any=[];
  faculties:any=[];
  enrollment_types:any=[];
  admission_fee_payment:any=[];

  constructor(private studyCampusService: AdmissionStudyCampusService, private batchService: BatchService,
              private admissionFeeService: AdmissionFeeService, private admissionEnrollmentService: AdmissionEnrollmentService,
              private semesterService: SemesterService, private semesterTypeService: SemesterTypeService, private programService: ProgramService, private facultyService: FacultyService,
              private admissionEnrollmentTypeService: AdmissionEnrollmentTypeService, private admissionFeePaymentService: AdmissionFeePaymentService,
              private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationViewOne();
    this.getFaculty();
    this.getSemester();
    this.getSemesterType();
    this.getStudyCampus();
    this.setCurrentDateTime();
    // this.admissionApplication.admissionEnrollments.sort((a:any, b:any) => Number(b.id) - Number(a.id));
  }

  getAdmissionApplicationViewOne(){
    this.openDirectAdmission();
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
    });
  }
  openDirectAdmission() {
    this.isEnrollmentView = true;
    this.admissionEnrollment.admissionEnrollmentTypeId = this.enrollment_types[0]?.id;
    this.admissionEnrollment.semesterId = this.admissionApplication.semester.id;
    this.admissionEnrollment.semesterTypeId = this.admissionApplication.semesterType.id;
    this.admissionEnrollment.facultyId = this.admissionApplication.admissionCircular.faculty.id;
    this.admissionEnrollment.studyCampusId = 1;
    this.admissionApplication.admissionApplicationProgramChooses.forEach((item:any)=>{
      this.admissionEnrollment.programId = item.admissionCircularProgram.program.id;
    })
    this.getProgram(this.admissionEnrollment.facultyId);
    // this.getAdmissionFee(this.admissionEnrollment.semesterId, this.admissionEnrollment.semesterTypeId, this.admissionEnrollment.programId)
    this.getBatchSearch(this.admissionEnrollment.semesterId, this.admissionEnrollment.programId);
    this.getAdmissionFee(this.admissionEnrollment.semesterId, this.admissionEnrollment.semesterTypeId, this.admissionEnrollment.programId)
    this.enableAdmission = false;
  }
  getEnrollmentType(){
    this.admissionEnrollmentTypeService.getAdmissionEnrollmentTypeActive().subscribe((response:any)=>{
      this.enrollment_types = response.data;
    })
  }

  getFaculty(){
    this.facultyService.getFacultyActive().subscribe((response:any)=>{
      this.faculties = response.data;
    })
  }
  getSemester(){
    this.batches=[];
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
    })
  }
  getSemesterType(){
    this.semesterTypeService.getSemesterTypeActive().subscribe((response:any)=>{
      this.semester_types = response.data;
    })
  }
  getProgram(facultyId:any){
    this.programService.getProgramFaculty(facultyId).subscribe((response:any)=>{
      this.programs = response.data;
    })
  }
  setCurrentDateTime() {
    const now = new Date();
    now.setHours(now.getHours() + 6);
    this.admissionFeePayment.paymentDate = now.toISOString().slice(0, 16);
    this.admissionApplicationPayment.paymentDate = now.toISOString().slice(0, 16);
    this.admissionEnrollment.deadline = now.toISOString().slice(0, 10);
  }


  getStudyCampus(){
    this.studyCampusService.getStudyCampusActive().subscribe((response:any)=>{
      this.study_campuses = response.data;
    })
  }
  getBatchSearch(semesterId:any, programId:any){
    this.batches=[];
    this.admissionEnrollment.batchId = undefined;
    if(semesterId && programId){
      this.batchService.getBatchSearch(semesterId, programId).subscribe((response:any)=>{
        this.batches = response.data;
      })
    }else {
      this.toastr.warning('Invalid Program or Semester');
    }
  }
  getAdmissionFee(semesterId:any, semesterTypeId:any, programId:any){
    this.admissionFeeService.getAdmissionFeeAmount(semesterId, semesterTypeId, programId).subscribe((response:any)=>{
      // this.admission_fee = response.data;
      this.admissionEnrollment.payableAmount = response.data?.amount;
      this.admissionEnrollment.admissionFee = response.data?.amount;

    })
  }

  postAdmissionEnrollment() {
    this.loading = true;
    this.admissionEnrollment.admissionApplicationId = this.admissionApplication.id;
    this.admissionEnrollment.admissionEnrollmentTypeId = 1;
    this.admissionEnrollment.status = 0;
    this.admissionEnrollmentService.postAdmissionEnrollment(this.admissionEnrollment).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
        this.admissionApplication.admissionEnrollments.push(response.data);
        this.admissionApplication.admissionEnrollments.sort((a:any, b:any) => Number(b.id) - Number(a.id));
        this.isEnrollmentView = false;
      }
    })
  }

  cancelAdmissionEnrollment() {
    this.isEnrollmentView = false;
    this.enableAdmission = true;
    this.admissionEnrollment = new AdmissionEnrollment();
  }
  cancelEnrollment(enrollmentId: any) {
    Swal.fire({
      title: 'Withdraw Admission Enrollment',
      text: 'Are you want to Withdraw Admission Enrollment.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.loading = true;
        this.admissionEnrollment.admissionApplicationId = this.admissionApplication.id;
        this.admissionEnrollment.admissionEnrollmentTypeId = enrollmentId?.admissionEnrollmentType.id;
        this.admissionEnrollment.semesterId = enrollmentId?.semester.id;
        this.admissionEnrollment.semesterTypeId = enrollmentId?.semesterType.id;
        this.admissionEnrollment.facultyId = enrollmentId?.faculty.id;
        this.admissionEnrollment.programId = enrollmentId?.program.id;
        this.admissionEnrollment.batchId = enrollmentId?.batch.id;
        this.admissionEnrollment.studyCampusId = enrollmentId?.studyCampus.id;
        this.admissionEnrollment.deadline = enrollmentId?.deadline;
        this.admissionEnrollment.payableAmount = enrollmentId?.payableAmount;
        this.admissionEnrollment.active = true;
        this.admissionEnrollment.status = 2;
        this.admissionEnrollmentService.putAdmissionEnrollment(this.admissionEnrollment, enrollmentId.id).subscribe((response:any) => {
          this.loading = false;
          if(response.status){
            let indexToUpdate = this.admissionApplication.admissionEnrollments.findIndex((item: AdmissionEnrollment) => item.id === enrollmentId.id);
            this.admissionApplication.admissionEnrollments[indexToUpdate] = response.data;
            this.toastr.success(response.message);
            this.isEnrollmentView = true;
            this.admissionApplication.isAdmission = false;
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  sendAdmissionEnrollment(enrollmentId:any) {
    Swal.fire({
      title: 'Send Email',
      text: 'Are you want to send Email.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.loading = true;
        this.admissionEnrollmentService.sendAdmissionEnrollment(enrollmentId).subscribe((response:any) => {
          this.loading = false;
          if(response.status){
            this.toastr.success(response.message);
          }else {
            this.loading = false;
            this.toastr.warning(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  makeAdmissionFee(admission_enrollment:any) {
    console.log(admission_enrollment)
    this.admissionFeePayment.amount = admission_enrollment?.payableAmount;
    this.admissionFeePayment.payableAmount = admission_enrollment?.payableAmount;
    this.admissionFeePayment.paymentStatus = admission_enrollment?.paymentStatus;
    this.admissionFeePayment.admissionFee = admission_enrollment?.admissionFee;
    this.enableAdmissionPayment = true;
    this.enableAdmission = false;
  }
  cancelAdmissionApplicationPayment() {
    this.enableAdmissionPayment = false;
    this.enablePayment = false;
    this.admissionApplicationPayment = new AdmissionApplicationPayment();
    this.enableAdmission = true;
  }
  postAdmissionFeePayment() {
    this.loading = true;
    this.admissionFeePayment.admissionApplicationId = this.admissionApplication.id;
    this.admissionFeePayment.paymentTypeId = 2;
    this.admissionFeePayment.paymentGatewayId = 2;
    this.admissionFeePayment.status = 1;
    this.admissionFeePaymentService.postAdmissionFeePayment(this.admissionFeePayment).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message)
        this.getAdmissionApplicationViewOne();
        this.enableAdmission = true;
        this.enableAdmissionPayment = false;
      }
    })
  }

  updateAdmissionPayment(admission_enrollment:any) {
    this.loading = true;
    this.admissionEnrollmentService.getAdmissionEnrollmentCheck(admission_enrollment.id).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
        this.notifyParent.emit();
      }
    })
  }
}
