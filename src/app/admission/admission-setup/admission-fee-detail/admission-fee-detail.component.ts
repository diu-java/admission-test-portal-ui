import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionFee} from "../../../model/admission/admission-setup/admissionFee";
import {AdmissionFeeService} from "../../../Service/admission/admission-setup/admissionFee.service";
import {ActivatedRoute} from "@angular/router";
import {ProgramService} from "../../../Service/academic/institute/program.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {SemesterTypeService} from "../../../Service/academic/configuration/semesterType.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AdmissionFeeDetail} from "../../../model/admission/admission-setup/admissionFeeDetail";
import {AdmissionFeeDetailService} from "../../../Service/admission/admission-setup/admissionFeeDetail.service";
import {AdmissionApplicationType} from "../../../model/admission/admission-setup/admissionApplicationType";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-fee-detail',
  templateUrl: './admission-fee-detail.component.html',
  styleUrls: ['./admission-fee-detail.component.css']
})
export class AdmissionFeeDetailComponent implements OnInit{
  @ViewChild('admissionFeeForm') form: NgForm | undefined;
  @ViewChild('admissionFeeDetailForm') admissionFeeDetailForm: NgForm | undefined;
  admissionFee:any=new AdmissionFee();
  isAdmissionFeeDetail:boolean = false;
  isAdmissionFeeDetailView:boolean = false;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  programs:any=[];
  semesters:any=[];
  semester_types:any=[];
  admission_fees:any=[];
  admission_fee_details:any=[];
  admissionFeeDetail:any = new AdmissionFeeDetail();
  constructor(private admissionFeeService: AdmissionFeeService, private programService: ProgramService,
              private semesterService: SemesterService, private semesterTypeService: SemesterTypeService,
              private toastr: ToastrService, private admissionFeeDetailService: AdmissionFeeDetailService,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.getViewAdmissionFee();
    this.getProgram();
    this.getSemester();
    this.getSemesterType();
    this.getAdmissionFee();
  }

  getViewAdmissionFee(){
    this.route.params.subscribe((params)=>{
      const admissionFeeId = +params['id'];
      this.admissionFeeService.getViewAdmissionFee(admissionFeeId).subscribe((response:any)=>{
        this.admissionFee = response.data;
        this.getAdmissionFeeDetail(this.admissionFee.id);
      });
    })
  }

  getProgram(){
    this.programService.getProgramActive().subscribe((response:any)=>{
      this.programs = response.data;
    })
  }
  getSemester(){
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
    })
  }
  getSemesterType(){
    this.semesterTypeService.getSemesterTypeActive().subscribe((response:any)=>{
      this.semester_types = response.data;
    })
  }

  deleteAdmissionFee(admissionFee: any) {
    Swal.fire({
      title: 'Admission Fee Delete',
      text: 'Are you want to delete this Admission Fee.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionFeeService.deleteAdmissionFee(admissionFee.id).subscribe((response:any) => {
          if(response.status){
            // this.choose_options = this.choose_options.filter((item: any)  => item !== choose_option);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  editAdmissionFee(admissionFee: any) {
    this.admissionFee = admissionFee;
    this.admissionFee.semesterId = admissionFee.semester.id;
    this.admissionFee.semesterTypeId = admissionFee.semesterType.id;
    this.admissionFee.programId = admissionFee.program.id;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionFeeDetail = true;
  }


  getAdmissionFee(){
    this.admissionFeeService.getAdmissionFeeActive().subscribe((response:any)=>{
      this.admission_fees = response.data;
    })
  }

  putAdmissionFee() {
    this.admissionFeeService.putAdmissionFee(this.admissionFee, this.admissionFee.id).subscribe((response:any)=>{

      if(response.status){
        this.toastr.success(response.message);
        this.getViewAdmissionFee();
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionFeeDetail = false;
      }
    })
  }

  cancelAdmissionFee() {
    this.isAdmissionFeeDetail = !this.isAdmissionFeeDetail;
  }
  getAdmissionFeeDetail(admissionFeeId:any){
    this.admissionFeeDetailService.getAdmissionFeeDetail(admissionFeeId).subscribe((response:any)=>{
      this.admission_fee_details = response.data;
    })
  }

  postAdmissionFeeDetail() {
    this.admissionFeeDetail.admissionFeeId = this.admissionFee.id;
    this.admissionFeeDetail.active = true;
    this.admissionFeeDetailService.postAdmissionFeeDetail(this.admissionFeeDetail).subscribe((response:any)=>{
      if (response.status){
        this.admissionFeeDetail = new AdmissionFeeDetail();
        this.admissionFeeDetailForm?.resetForm(this.admissionFeeDetail);
        this.toastr.success(response.message);
        this.admission_fee_details.push(response.data);
        this.isAdmissionFeeDetailView = false;
        this.getViewAdmissionFee();
      }
    })
  }

  putAdmissionFeeDetail() {
    this.admissionFeeDetail.admissionFeeId = this.admissionFee.id;
    this.admissionFeeDetailService.putAdmissionFeeDetail(this.admissionFeeDetail, this.admissionFeeDetail.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_fee_details.findIndex((item: AdmissionFeeDetail) => item.id === this.admissionFeeDetail.id);
        this.admission_fee_details[indexToUpdate] = response.data;
        this.admissionFeeDetail = new AdmissionFeeDetail();
        this.admissionFeeDetailForm?.resetForm(this.admissionFeeDetail);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionFeeDetailView = false;
      }
    })
  }

  cancelAdmissionFeeDetail() {
    this.isAdmissionFeeDetailView = !this.isAdmissionFeeDetailView;
  }

  admissionFeeDetailView() {
    this.isAdmissionFeeDetailView = !this.isAdmissionFeeDetailView;
  }

  editAdmissionFeeDetail(admission_fee_detail: any) {
    this.admissionFeeDetail = admission_fee_detail;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionFeeDetailView = true;
  }

  deleteAdmissionFeeDetail(admission_fee_detail: any) {
    Swal.fire({
      title: 'Admission Fee Detail Delete',
      text: 'Are you want to delete this Admission Fee Detail.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionFeeDetailService.deleteAdmissionFeeDetail(admission_fee_detail.id).subscribe((response:any) => {
          if(response.status){
            this.admission_fee_details = this.admission_fee_details.filter((item: any)  => item !== admission_fee_detail);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
