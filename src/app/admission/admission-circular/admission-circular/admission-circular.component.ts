import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";
import {Title} from "@angular/platform-browser";
import {AdmissionCircularService} from "../../../Service/admission/admission-circular/admissionCircular.service";
import {
  AdmissionApplicationTypeService
} from "../../../Service/admission/admission-setup/admissionApplicationType.service";
import {ProgramTypeService} from "../../../Service/academic/configuration/programType.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {SemesterTypeService} from "../../../Service/academic/configuration/semesterType.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {FacultyService} from "../../../Service/academic/institute/faculty.service";
import {Router} from "@angular/router";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-admission-circular',
  templateUrl: './admission-circular.component.html',
  styleUrls: ['./admission-circular.component.css']
})
export class AdmissionCircularComponent implements OnInit{
  @ViewChild('admissionCircularForm') form: NgForm | undefined;
  admissionCircular  = new AdmissionCircular();
  admission_circulars:any=[];
  application_types:any=[];
  program_types:any=[];
  semesters:any=[];
  semester_types:any=[];
  faculties:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAdmissionCircularView:boolean = false;
  loading:boolean = false;
  agreementDetail:string='';
  public Editor: any = ClassicEditor;

  constructor( private service: AdmissionCircularService,
               private admissionApplicationTypeService: AdmissionApplicationTypeService,
               private programTypeService: ProgramTypeService,
               private semesterService: SemesterService,
               private semesterTypeService: SemesterTypeService,
               private facultyService: FacultyService,
               private toastr: ToastrService,
               private titleService: Title,private router: Router) {
    this.titleService.setTitle('Admission Circular')
  }
  ngOnInit() {
    this.getAdmissionCircular();
    this.getApplicationType();
    this.getProgramType();
    this.getSemester();
    this.getSemesterType();
    this.getFaculty();
  }

  getAdmissionCircular() {
    this.service.getAdmissionCircular().subscribe((response:any)=>{
      this.admission_circulars = response.data;
    })
  }
  getApplicationType(){
    this.admissionApplicationTypeService.getApplicationType().subscribe((response:any)=>{
      this.application_types = response.data;
    })
  }
  getProgramType(){
    this.programTypeService.getProgramTypeActive().subscribe((response:any)=>{
      this.program_types = response.data;
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
  getFaculty(){
    this.facultyService.getFacultyActive().subscribe((response:any)=>{
      this.faculties = response.data;
    })
  }

  postAdmissionCircular() {
    this.loading = true;
    this.admissionCircular.active = true;
    this.service.postAdmissionCircular(this.admissionCircular).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.admissionCircular = new AdmissionCircular();
        this.form?.resetForm(this.admissionCircular);
        this.toastr.success(response.message);
        this.admission_circulars.push(response.data);
        this.isAdmissionCircularView = false;
      }
    })
  }

  putAdmissionCircular() {
    this.loading = true;
    this.service.putAdmissionCircular(this.admissionCircular, this.admissionCircular.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_circulars.findIndex((item: AdmissionCircular) => item.id === this.admissionCircular.id);
        this.admission_circulars[indexToUpdate] = response.data;
        this.admissionCircular = new AdmissionCircular();
        this.form?.resetForm(this.admissionCircular);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionCircularView = false;
      }
    })
  }

  cancelAdmissionCircular() {
    this.admissionCircular = new AdmissionCircular();
    this.form?.resetForm(this.admissionCircular);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionCircularView = !this.isAdmissionCircularView;
  }

  editAdmissionCircular(admission_circular: any) {
    this.admissionCircular = admission_circular;
    this.admissionCircular.admissionApplicationTypeId = admission_circular.admissionApplicationType.id;
    this.admissionCircular.programTypeId = admission_circular.programType.id;
    this.admissionCircular.semesterId = admission_circular.semester.id;
    this.admissionCircular.semesterTypeId = admission_circular.semesterType.id;
    this.admissionCircular.facultyId = admission_circular.faculty.id;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionCircularView = true;
  }


  deleteAdmissionCircular(admission_circular: any) {
    Swal.fire({
      title: 'Admission Circular Delete',
      text: 'Are you want to delete this Admission Circular.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAdmissionCircular(admission_circular.id).subscribe((response:any) => {
          if(response.status){
            this.admission_circulars = this.admission_circulars.filter((item: any)  => item !== admission_circular);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
  addAdmissionCircularProgram(admission_circular: any) {
      this.router.navigate(['/admission-circular-program', admission_circular.id]);
  }

  admissionCircularView() {
    this.isAdmissionCircularView = !this.isAdmissionCircularView;
  }

  createAdmissionApplication(admission_circular: any) {
    this.router.navigate(['/admission-application-create', admission_circular.id]);
  }
}
