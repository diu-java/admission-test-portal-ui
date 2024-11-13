import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionCircular} from "../../model/admission/admission-circular/admissionCircular";
import {AdmissionCircularService} from "../../Service/admission/admission-circular/admissionCircular.service";

import {SemesterService} from "../../Service/academic/institute/semester.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ProgramService} from "../../Service/academic/institute/program.service";
import {FacultyService} from "../../Service/academic/institute/faculty.service";
import {ProgramTypeService} from "../../Service/academic/configuration/programType.service";

@Component({
  selector: 'app-admission-apply',
  templateUrl: './admission-apply.component.html',
  styleUrls: ['./admission-apply.component.css']
})
export class AdmissionApplyComponent implements OnInit{
  @ViewChild('admissionCircularForm') form: NgForm | undefined;
  admissionCircular  = new AdmissionCircular();
  admission_circulars:any=[];
  semesters:any=[];
  programs:any=[];
  faculties:any=[];
  program_types:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  searchProgram:any;
  searchCode:any;
  searchSemester:any;

  constructor( private service: AdmissionCircularService,
               private semesterService: SemesterService,
               private programService: ProgramService, private facultyService: FacultyService,
               private toastr: ToastrService, private programTypeService: ProgramTypeService,
               private titleService: Title,private router: Router) {
    this.titleService.setTitle('Admission Apply')
  }
  ngOnInit() {
    this.getAdmissionCircular();
    this.getSemester();
    this.getProgram();
    this.getProgramType();
    this.getFaculty();
  }

  getAdmissionCircular() {
    this.service.getAdmissionCircularActive().subscribe((response:any)=>{
      this.admission_circulars = response.data;
    })
  }

  getProgramType(){
    this.programTypeService.getProgramTypeActive().subscribe((response:any)=>{
      this.program_types = response.data;
    })
  }
  getProgramTypeAdmissionCircular(items:any[], value: String){
    return items.filter((item:any)=>item.programType.code === value)
  }
  getFaculty(){
    this.facultyService.getFacultyActive().subscribe((response:any)=>{
      this.faculties = response.data.filter((item:any)=>item.facultyType.code === 'AC');
    })
  }

  getFacultyAdmissionCircular(items:any[], value: String, value2: String){
    return items.filter((item:any)=>item.faculty.code === value && item.programType.code === value2)
  }
  getSemester(){
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
    })
  }
  getProgram(){
    this.programService.getProgramActive().subscribe((response:any)=>{
      this.programs = response.data;
    })
  }

  createAdmissionApplication(admission_circular: any) {
    if(admission_circular.enableAgreement){
      let programs:any ='';
      admission_circular.admissionCircularPrograms.forEach((item:any)=>{
        programs = programs+item.program.name+'\n';
      })
      Swal.fire({
        width: 600,
        title:programs,
        html: admission_circular.agreementDetail,
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/admission-application-create', admission_circular.id]);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Do something on cancel
          Swal.fire('Cancelled', 'Your action was cancelled.', 'error');
        }
      });
    }else {
      this.router.navigate(['/admission-application-create', admission_circular.id]);
    }
  }
}
