import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionCircularService} from "../../../Service/admission/admission-circular/admissionCircular.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";
import {AdmissionCircularProgram} from "../../../model/admission/admission-circular/admissionCircularProgram";
import {ProgramService} from "../../../Service/academic/institute/program.service";
import {
  AdmissionCircularProgramService
} from "../../../Service/admission/admission-circular/admissionCircularProgram.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {AdmissionCircularTestSchedule} from "../../../model/admission/admission-circular/admissionCircularTestSchedule";
import {
  AdmissionCircularTestScheduleService
} from "../../../Service/admission/admission-circular/admissionCircularTestSchedule.service";
import {
  AdmissionCircularEducationLevel
} from "../../../model/admission/admission-circular/admissionCircularEducationLevel";
import {LevelOfEducationService} from "../../../Service/common-setup/levelOfEducation.service";
import {
  AdmissionCircularEducationLevelService
} from "../../../Service/admission/admission-circular/admissionCircularEducationLevel.service";
import {
  AdmissionApplicationTypeService
} from "../../../Service/admission/admission-setup/admissionApplicationType.service";
import {ProgramTypeService} from "../../../Service/academic/configuration/programType.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {SemesterTypeService} from "../../../Service/academic/configuration/semesterType.service";
import {FacultyService} from "../../../Service/academic/institute/faculty.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
declare var $: any;
@Component({
  selector: 'app-admission-circular-program',
  templateUrl: './admission-circular-program.component.html',
  styleUrls: ['./admission-circular-program.component.css']
})
export class AdmissionCircularProgramComponent implements OnInit{
  @ViewChild('admissionCircularProgramForm') form: NgForm | undefined;
  @ViewChild('admissionCircularTestScheduleForm') testScheduleForm: NgForm | undefined;
  @ViewChild('admissionCircularEducationLevelForm') educationLevelForm: NgForm | undefined;
  @ViewChild('admissionCircularIntakeForm') intakeForm: NgForm | undefined;
  public Editor:any = ClassicEditor;
  admissionCircular:any=new AdmissionCircular();
  admissionCircularProgram:any = new AdmissionCircularProgram();
  isUpdateButton:boolean = false;
  isSaveButton: boolean = true;
  isAdmissionCircularProgram: boolean = false;
  isAdmissionCircularTestSchedule: boolean = false;
  isAdmissionCircularEducationLevel: boolean = false;
  isAdmissionCircularView: boolean = false;
  programs:any=[];
  application_types:any=[];
  program_types:any=[];
  semesters:any=[];
  semester_types:any=[];
  faculties:any=[];
  admission_circular_programs:any=[];
  test_schedules:any=[];
  level_of_educations:any=[];
  circular_education_levels:any=[];
  admissionAdnCircularTestSchedule:any = new AdmissionCircularTestSchedule();
  admissionCircularEducationLevel:any = new AdmissionCircularEducationLevel();
  loading:boolean = false;
  constructor(private service: AdmissionCircularProgramService, private admissionCircularService: AdmissionCircularService, private route: ActivatedRoute,
              private levelOfEducationService: LevelOfEducationService,
              private admissionAdnCircularTestScheduleService: AdmissionCircularTestScheduleService,
              private admissionCircularEducationLevelService: AdmissionCircularEducationLevelService,
              private toastr: ToastrService,
              private programService: ProgramService,
              private admissionApplicationTypeService: AdmissionApplicationTypeService,
              private programTypeService: ProgramTypeService,
              private semesterService: SemesterService,
              private semesterTypeService: SemesterTypeService,
              private facultyService: FacultyService,
              private titleService: Title) {
    this.titleService.setTitle('Admission Circular')
  }
  ngOnInit() {
    this.getViewAdmissionCircular();
    this.getEducationLevel();
    this.getApplicationType();
    this.getProgramType();
    this.getSemester();
    this.getSemesterType();
    this.getFaculty();
  }
  getViewAdmissionCircular(){
    this.route.params.subscribe((params)=>{
      const admissionCircularId = +params['id'];
      this.admissionCircularService.getViewAdmissionCircular(admissionCircularId).subscribe((response:any)=>{
        this.admissionCircular = response.data;
        this.getProgram(this.admissionCircular.faculty.id);
        this.getAdmissionCircularProgram(this.admissionCircular?.admissionCircularPrograms);
        this.getCircularEducationLevel(this.admissionCircular?.admissionCircularEducationLevels);
        this.getAdmissionCircularTestSchedule(this.admissionCircular?.admissionCircularTestSchedules);
      });
    })
  }
  getProgram(facultyId:any){
    this.programService.getProgramFaculty(facultyId).subscribe((response:any)=>{
      this.programs = response.data;
    })
  }
  getAdmissionCircularProgram(admissionCircular_program:any){
    this.admission_circular_programs = admissionCircular_program;
  }

  postAdmissionCircularProgram() {
    this.loading = true;
    this.admissionCircularProgram.admissionCircularId = this.admissionCircular.id;
    this.admissionCircularProgram.facultyId = this.admissionCircular.faculty.id;
    this.admissionCircularProgram.active = true;
    this.service.postAdmissionCircularProgram(this.admissionCircularProgram).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.admissionCircularProgram = new AdmissionCircularProgram();
        this.form?.resetForm(this.admissionCircularProgram);
        this.toastr.success(response.message);
        this.admission_circular_programs.push(response.data);
        this.isAdmissionCircularProgram = false;
      }
    })
  }

  putAdmissionCircularProgram() {
    this.loading = true;
    this.admissionCircularProgram.admissionCircularId = this.admissionCircular.id;
    this.admissionCircularProgram.facultyId = this.admissionCircular.faculty.id;
    console.log(this.admissionCircularProgram)
    this.service.putAdmissionCircularProgram(this.admissionCircularProgram, this.admissionCircularProgram.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_circular_programs.findIndex((item: AdmissionCircularProgram) => item.id === this.admissionCircularProgram.id);
        this.admission_circular_programs[indexToUpdate] = response.data;
        this.admissionCircularProgram = new AdmissionCircularProgram();
        this.form?.resetForm(this.admissionCircularProgram);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionCircularProgram = false;
      }
    })
  }

  cancelAdmissionCircularProgram() {
    this.admissionCircularProgram = new AdmissionCircularProgram();
    this.form?.resetForm(this.admissionCircularProgram);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionCircularProgram = !this.admissionCircularProgram;
  }

  editAdmissionCircularProgram(admission_circular_program: any) {
    this.admissionCircularProgram = admission_circular_program;
    this.admissionCircularProgram.admissionCircularId = admission_circular_program.admissionCircular.id;
    this.admissionCircularProgram.facultyId = admission_circular_program.faculty.id;
    this.getProgram(admission_circular_program.faculty.id);
    if(admission_circular_program.program){
      this.admissionCircularProgram.programId = admission_circular_program.program.id;
    }
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionCircularProgram = true;
  }

  deleteAdmissionCircularProgram(admission_circular_program: any) {
    Swal.fire({
      title: 'Admission Circular Program Delete',
      text: 'Are you want to delete this Admission Circular Program.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAdmissionCircularProgram(admission_circular_program.id).subscribe((response:any) => {
          if(response.status){
            this.admission_circular_programs = this.admission_circular_programs.filter((item: any)  => item !== admission_circular_program);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }

  admissionCircularProgramView() {
    this.isAdmissionCircularProgram = !this.isAdmissionCircularProgram;
    $('body,html').animate({ scrollTop: 0 }, 1000);
  }

  admissionCircularTestScheduleView() {
    this.isAdmissionCircularTestSchedule = !this.isAdmissionCircularTestSchedule;
    $('body,html').animate({ scrollTop: 0 }, 1000);
  }

  getAdmissionCircularTestSchedule(test_schedule:any){
    this.test_schedules = test_schedule;
  }

  postAdmissionCircularTestSchedule() {
    this.loading = true;
    this.admissionAdnCircularTestSchedule.admissionCircularId = this.admissionCircular.id;
    this.admissionAdnCircularTestSchedule.active = true;
    this.admissionAdnCircularTestScheduleService.postAdmissionCircularTestSchedule(this.admissionAdnCircularTestSchedule).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.admissionAdnCircularTestSchedule = new AdmissionCircularTestSchedule();
        this.testScheduleForm?.resetForm(this.admissionAdnCircularTestSchedule);
        this.toastr.success(response.message);
        this.test_schedules.push(response.data);
        this.isAdmissionCircularTestSchedule = false;
      }
    })
  }

  putAdmissionCircularTestSchedule() {
    this.loading = true;
    this.admissionAdnCircularTestSchedule.admissionCircularId = this.admissionCircular.id;
    this.admissionAdnCircularTestScheduleService.putAdmissionCircularTestSchedule(this.admissionAdnCircularTestSchedule, this.admissionAdnCircularTestSchedule.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.test_schedules.findIndex((item: AdmissionCircularTestSchedule) => item.id === this.admissionCircularProgram.id);
        this.test_schedules[indexToUpdate] = response.data;
        this.admissionAdnCircularTestSchedule = new AdmissionCircularTestSchedule();
        this.testScheduleForm?.resetForm(this.admissionAdnCircularTestSchedule);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionCircularTestSchedule = false;
      }
    })
  }

  cancelAdmissionCircularTestSchedule() {
    this.admissionAdnCircularTestSchedule = new AdmissionCircularTestSchedule();
    this.testScheduleForm?.resetForm(this.admissionAdnCircularTestSchedule);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionCircularTestSchedule = !this.isAdmissionCircularTestSchedule;
  }

  editAdmissionCircularTestSchedule(test_schedule: any) {
    this.admissionAdnCircularTestSchedule = test_schedule;
    this.admissionAdnCircularTestSchedule.admissionCircularId = test_schedule.admissionCircular.id;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionCircularTestSchedule = true;
  }

  deleteAdmissionCircularTestSchedule(test_schedule: any) {
    Swal.fire({
      title: 'Admission Circular Test Schedule Delete',
      text: 'Are you want to delete this Admission Circular Test Schedule.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionAdnCircularTestScheduleService.deleteAdmissionCircularTestSchedule(test_schedule.id).subscribe((response:any) => {
          if(response.status){
            this.test_schedules = this.test_schedules.filter((item: any)  => item !== test_schedule);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }

  admissionCircularEducationLevelView() {
    this.isAdmissionCircularEducationLevel = !this.isAdmissionCircularEducationLevel;
    $('body,html').animate({ scrollTop: 0 }, 1000);
  }
  getEducationLevel(){
    this.levelOfEducationService.getLevelOfEducation().subscribe((response:any)=>{
      this.level_of_educations = response.data;
    })
  }
  getCircularEducationLevel(circular_education_level:any){
    this.circular_education_levels = circular_education_level;
  }

  postAdmissionCircularEducationLevel() {
    this.loading = true;
    this.admissionCircularEducationLevel.admissionCircularId = this.admissionCircular.id;
    this.admissionCircularEducationLevel.active = true;
    if(this.admissionCircularEducationLevel.isMandatory === null){
      this.admissionCircularEducationLevel.isMandatory = false;
    }
    this.admissionCircularEducationLevelService.postAdmissionCircularEducationLevel(this.admissionCircularEducationLevel).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.admissionCircularEducationLevel = new AdmissionCircularEducationLevel();
        this.educationLevelForm?.resetForm(this.admissionCircularEducationLevel);
        this.toastr.success(response.message);
        this.circular_education_levels.push(response.data);
        this.isAdmissionCircularEducationLevel = false;
      }
    })
  }

  putAdmissionCircularEducationLevel() {
    this.loading = true;
    this.admissionCircularEducationLevel.admissionCircularId = this.admissionCircular.id;
    this.admissionCircularEducationLevelService.putAdmissionCircularEducationLevel(this.admissionCircularEducationLevel, this.admissionCircularEducationLevel.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.circular_education_levels.findIndex((item: AdmissionCircularEducationLevel) => item.id === this.admissionCircularEducationLevel.id);
        this.circular_education_levels[indexToUpdate] = response.data;
        this.admissionCircularEducationLevel = new AdmissionCircularEducationLevel();
        this.educationLevelForm?.resetForm(this.admissionCircularEducationLevel);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionCircularEducationLevel = false;
      }
    })
  }

  cancelAdmissionCircularEducationLevel() {
    this.admissionCircularEducationLevel = new AdmissionCircularEducationLevel();
    this.educationLevelForm?.resetForm(this.admissionCircularEducationLevel);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionCircularEducationLevel = !this.isAdmissionCircularEducationLevel;
  }

  editAdmissionCircularEducationLevel(circular_education_level: any) {
    this.admissionCircularEducationLevel = circular_education_level;
    this.admissionCircularEducationLevel.admissionCircularId = circular_education_level.admissionCircular.id;
    this.admissionCircularEducationLevel.levelOfEducationId = circular_education_level.levelOfEducation.id;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionCircularEducationLevel = true;
  }

  deleteAdmissionCircularEducationLevel(circular_education_level: any) {
    Swal.fire({
      title: 'Admission Circular Leve of Education Delete',
      text: 'Are you want to delete this Admission Circular Leve of Education.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionCircularEducationLevelService.deleteAdmissionCircularEducationLevel(circular_education_level.id).subscribe((response:any) => {
          if(response.status){
            this.circular_education_levels = this.circular_education_levels.filter((item: any)  => item !== circular_education_level);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }

  putAdmissionCircular() {
    this.loading = true;
    this.admissionCircularService.putAdmissionCircular(this.admissionCircular, this.admissionCircular.id).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
        // let indexToUpdate = this.admission_circulars.findIndex((item: AdmissionCircular) => item.id === this.admissionCircular.id);
        // this.admission_circulars[indexToUpdate] = response.data;
        // this.admissionCircular = new AdmissionCircular();
        // this.form?.resetForm(this.admissionCircular);
        this.getViewAdmissionCircular();
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionCircularView = false;
      }
    })
  }

  cancelAdmissionCircular() {
    // this.admissionCircular = new AdmissionCircular();
    // this.form?.resetForm(this.admissionCircular);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionCircularView = !this.isAdmissionCircularView;
  }

  editAdmissionCircular(admissionCircular:any) {
    this.admissionCircular = admissionCircular;
    this.admissionCircular.admissionApplicationTypeId = admissionCircular.admissionApplicationType?.id;
    this.admissionCircular.programTypeId = admissionCircular.programType.id;
    this.admissionCircular.semesterId = admissionCircular.semester.id;
    this.admissionCircular.semesterTypeId = admissionCircular.semesterType.id;
    this.admissionCircular.facultyId = admissionCircular.faculty.id;
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
        this.admissionCircularService.deleteAdmissionCircular(admission_circular.id).subscribe((response:any) => {
          if(response.status){
            // this.admissionCircular = this.admission_circulars.filter((item: any)  => item !== admission_circular);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
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


}
