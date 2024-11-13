import {Component, OnInit, ViewChild} from '@angular/core';
import {ProgramService} from "../../../Service/academic/institute/program.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {SemesterTypeService} from "../../../Service/academic/configuration/semesterType.service";
import {AdmissionFee} from "../../../model/admission/admission-setup/admissionFee";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AdmissionFeeService} from "../../../Service/admission/admission-setup/admissionFee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admission-fee',
  templateUrl: './admission-fee.component.html',
  styleUrls: ['./admission-fee.component.css']
})
export class AdmissionFeeComponent implements OnInit{
  @ViewChild('admissionFeeForm') form: NgForm | undefined;
  admission_fees:any=[];
  programs:any=[];
  semesters:any=[];
  semester_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAdmissionFeeView:boolean = false;
  admissionFee:any = new AdmissionFee();
  constructor(private programService: ProgramService, private admissionFeeService: AdmissionFeeService,
              private semesterService: SemesterService, private router: Router,
              private semesterTypeService: SemesterTypeService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getProgram();
    this.getSemester();
    this.getSemesterType();
    this.getAdmissionFee();
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

  admissionFeeView() {
    this.isAdmissionFeeView = !this.isAdmissionFeeView;
  }
  getAdmissionFee(){
    this.admissionFeeService.getAdmissionFee().subscribe((response:any)=>{
      this.admission_fees = response.data;
    })
  }

  postAdmissionFee() {
    this.admissionFee.active = true;
    this.admissionFeeService.postAdmissionFee(this.admissionFee).subscribe((response:any)=>{
      if (response.status){
        this.admissionFee = new AdmissionFee();
        this.form?.resetForm(this.admissionFee);
        this.toastr.success(response.message);
        this.admission_fees.push(response.data);
        this.isAdmissionFeeView = false;
      }
    })
  }

  putAdmissionFee() {

  }

  cancelAdmissionFee() {
    this.admissionFee = new AdmissionFee();
    this.form?.resetForm(this.admissionFee);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionFeeView = !this.isAdmissionFeeView;
  }

  viewAdmissionFee(admission_fee: any) {
    this.router.navigate(['/admission-fee-detail', admission_fee.id]);
  }
}
