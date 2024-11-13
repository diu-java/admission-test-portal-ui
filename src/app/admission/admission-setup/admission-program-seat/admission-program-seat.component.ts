import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionProgramSeat} from "../../../model/admission/admission-setup/admissionProgramSeat";
import {NgForm} from "@angular/forms";
import {ProgramService} from "../../../Service/academic/institute/program.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {Router} from "@angular/router";
import {SemesterTypeService} from "../../../Service/academic/configuration/semesterType.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionProgramSeatService} from "../../../Service/admission/admission-setup/admissionProgramSeat.service";
import {AdmissionFaq} from "../../../model/admission/admission-setup/admissionFaq";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-program-seat',
  templateUrl: './admission-program-seat.component.html',
  styleUrls: ['./admission-program-seat.component.css']
})
export class AdmissionProgramSeatComponent implements OnInit{
  @ViewChild('admissionFeeForm') form: NgForm | undefined;
  admissionProgramSeat:any = new AdmissionProgramSeat()
  admission_program_seats:any=[];
  programs:any=[];
  semesters:any=[];
  semester_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAdmissionProgramSeatView:boolean = false;
  programId:any;
  semesterId:any;
  constructor(private programService: ProgramService, private admissionProgramSeatService: AdmissionProgramSeatService,
              private semesterService: SemesterService, private router: Router,
              private semesterTypeService: SemesterTypeService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getProgram();
    this.getSemester();
    this.getSemesterType();
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

  admissionProgramSeatView() {
    this.isAdmissionProgramSeatView = !this.isAdmissionProgramSeatView;
    this.admissionProgramSeat.studyCampusId = 1;
  }
  getAdmissionProgramSeat(){
    this.admission_program_seats=[];
    if(this.semesterId){
      this.admissionProgramSeatService.getProgramSeat(this.semesterId).subscribe((response:any)=>{
        this.admission_program_seats = response.data;
      })
    }else {
      this.toastr.error('Invalid Semester')
    }

  }

  postAdmissionProgramSeat() {
    this.admissionProgramSeat.active = true;
    this.admissionProgramSeatService.postProgramSeat(this.admissionProgramSeat).subscribe((response:any)=>{
      if (response.status){
        this.admissionProgramSeat = new AdmissionProgramSeat();
        this.form?.resetForm(this.admissionProgramSeat);
        this.toastr.success(response.message);
        this.admission_program_seats.push(response.data);
        this.isAdmissionProgramSeatView = false;
      }
    })
  }

  putAdmissionProgramSeat() {
    this.admissionProgramSeatService.putProgramSeat(this.admissionProgramSeat, this.admissionProgramSeat.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_program_seats.findIndex((item: AdmissionProgramSeat) => item.id === this.admissionProgramSeat.id);
        this.admission_program_seats[indexToUpdate] = response.data;
        this.admissionProgramSeat = new AdmissionFaq();
        this.form?.resetForm(this.admissionProgramSeat);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionProgramSeatView = false;
      }
    })
  }

  cancelAdmissionProgramSeat() {
    this.admissionProgramSeat = new AdmissionProgramSeat();
    this.form?.resetForm(this.admissionProgramSeat);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionProgramSeatView = !this.isAdmissionProgramSeatView;
  }

  editProgramSeat(admission_program_seat: any) {
    this.admissionProgramSeat = admission_program_seat;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionProgramSeatView = true;
    this.admissionProgramSeat.semesterId = admission_program_seat.semester?.id;
    this.admissionProgramSeat.semesterTypeId = admission_program_seat.semesterType?.id;
    this.admissionProgramSeat.programId = admission_program_seat.program?.id;
    this.admissionProgramSeat.studyCampusId = admission_program_seat.studyCampus?.id;
  }

  deleteProgramSeat(admission_program_seat: any) {
    Swal.fire({
      title: 'Program Seat Delete',
      text: 'Are you want to delete this Program Seat.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionProgramSeatService.deleteProgramSeat(admission_program_seat.id).subscribe((response:any) => {
          if(response.status){
            this.admission_program_seats = this.admission_program_seats.filter((item: any)  => item !== admission_program_seat);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
