import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonInformation} from "../../model/student/personInformation";
import {StudentInformation} from "../../model/student/studentInformation";
import {PersonInformationService} from "../../Service/student/personInformation.service";
import {ProgramService} from "../../Service/academic/institute/program.service";
import {BatchService} from "../../Service/academic/batch.service";
import {FacultyService} from "../../Service/academic/institute/faculty.service";
import {DepartmentService} from "../../Service/academic/institute/department.service";
import {CampusService} from "../../Service/academic/institute/campus.service";
import {ShiftService} from "../../Service/academic/shift.service";
import {SemesterService} from "../../Service/academic/institute/semester.service";
import {SyllabusTemplateService} from "../../Service/academic/syllabusTemplate.service";
import {PaymentSchemeTemplateService} from "../../Service/academic/paymentSchemeTemplate.service";
import {LevelTernTemplateService} from "../../Service/academic/levelTernTemplate.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {StudentInformationService} from "../../Service/student/studentInformation.service";
import {AddressInformation} from "../../model/student/addressInformation";
import Swal from "sweetalert2";

@Component({
  selector: 'app-student-academic-information',
  templateUrl: './student-academic-information.component.html',
  styleUrls: ['./student-academic-information.component.css']
})
export class StudentAcademicInformationComponent implements OnInit{
  @Input() studentInformation:any = new StudentInformation();
  @ViewChild('academicForm') form: NgForm | undefined;
  personInformation:any = new PersonInformation();
  student_informations:any=[];
  programs:any=[];
  batches:any=[];
  faculties:any=[];
  departments:any=[];
  campuses:any=[];
  shifts:any=[];
  semesters:any=[];
  syllabus_templates:any=[];
  payment_scheme_templates:any=[];
  level_term_templates:any=[];
  isAcademicInfoView:boolean=false;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(private service: PersonInformationService, private programService: ProgramService,
              private batchService: BatchService, private facultyService: FacultyService,
              private departmentService: DepartmentService, private campusService: CampusService, private shiftService: ShiftService, private semesterService: SemesterService,
              private syllabusTemplateService: SyllabusTemplateService, private paymentSchemeTemplateService: PaymentSchemeTemplateService,
              private levelTermTemplateService: LevelTernTemplateService, private toastr: ToastrService,
              private route: ActivatedRoute, private studentInformationService: StudentInformationService) {
  }
  ngOnInit() {
    this.getPersonInformationView();
    this.getCampus();
    this.getSemester();
    this.getShift();
    this.getFaculty();
  }
  getPersonInformationView(){
    console.log(this.studentInformation)
    this.getStudentInformation(this.studentInformation.studentPerson.id);
    // this.route.params.subscribe((params)=>{
    //   const personId = +params['id'];
    //   this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
    //     this.personInformation = response.data;
    //     this.getStudentInformation(this.personInformation.id);
    //     this.studentInformation.email = this.personInformation.email;
    //   });
    // });
  }
  getStudentInformation(personId:any){
    this.studentInformationService.getStudentInformation(personId).subscribe((response:any)=>{
      this.student_informations = response.data;
    })
  }
  getProgram(departmentId:any){
    this.programs=[];
    this.studentInformation.programId=undefined;
    if(departmentId){
      this.programService.getProgramDepartment(departmentId).subscribe((response:any)=>{
        this.programs = response.data;
      })
    }else {
      this.toastr.warning('Invalid Department');
    }

  }
  getBatch(programId:any){
    this.batches=[];
    this.studentInformation.batchId = undefined;
    if(programId){
      this.batchService.getBatch(programId).subscribe((response:any)=>{
        this.batches = response.data;
      })
    }else {
      this.toastr.warning('Invalid Program');
    }

  }
  getFaculty(){
    this.facultyService.getFaculty().subscribe((response:any)=>{
      this.faculties = response.data;
    })
  }
  getDepartment(facultyId:any){
    this.departments=[];
    this.studentInformation.departmentId = undefined;
    if(facultyId){
      this.departmentService.getDepartmentSearch(facultyId).subscribe((response:any)=>{
        this.departments = response.data;
      })
    }else {
      this.toastr.warning('Invalid Department')
    }

  }
  getCampus(){
    this.campusService.getCampusActive().subscribe((response:any)=>{
      this.campuses = response.data;
    })
  }
  getShift(){
    this.shiftService.getShiftActive().subscribe((response:any)=>{
      this.shifts = response.data;
    })
  }
  getSemester(){
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
    })
  }
  getSyllabusTemplate(programId:any){
    this.syllabus_templates=[];
    this.studentInformation.syllabusTemplateId=undefined;
    if(programId){
      this.syllabusTemplateService.getSyllabusTemplate(programId).subscribe((response:any)=>{
        this.syllabus_templates = response.data;
      })
    }else {
      this.toastr.warning('Invalid Department')
    }
  }

  getLevelTermTemplate(programId:any){
    this.level_term_templates = [];
    this.studentInformation.levelTermTemplateId = undefined;
    if(programId){
      this.levelTermTemplateService.getLevelTermTemplate(programId).subscribe((response:any)=>{
        this.level_term_templates = response.data;
      })
    }else {
      this.toastr.warning('Invalid Department')
    }

  }
  getPaymentSchemeTemplate(){
    this.payment_scheme_templates=[];
    this.studentInformation.paymentSchemeTemplateId=undefined;
    if(this.studentInformation.programId && this.studentInformation.levelTermTemplateId){
      this.paymentSchemeTemplateService.getPaymentSchemeTemplate(this.studentInformation.programId, this.studentInformation.levelTermTemplateId).subscribe((response:any)=>{
        this.payment_scheme_templates = response.data;
      })
    }else {
      this.toastr.warning('Invalid Program or Level Term Template');
    }

  }


  academicInfoView() {
    this.isAcademicInfoView = !this.isAcademicInfoView;
    this.studentInformation = new StudentInformation();
    this.studentInformation.email = this.personInformation.email;
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  postAcademic() {
    this.studentInformation.studentPersonId = this.studentInformation.studentPerson.id;
    this.studentInformationService.postStudentInformation(this.studentInformation).subscribe((response:any)=>{
      if (response.status){
        this.studentInformation = new StudentInformation();
        this.form?.resetForm(this.studentInformation);
        this.toastr.success(response.message);
        this.student_informations.push(response.data);
      }
    })
  }

  putAcademic() {
    this.studentInformation.studentPersonId = this.studentInformation.studentPerson.id;
    this.studentInformationService.putStudentInformation(this.studentInformation, this.studentInformation.id).subscribe((response:any)=>{
      if (response.status){
        this.studentInformation = new StudentInformation();
        this.form?.resetForm(this.studentInformation);
        this.toastr.success(response.message);
        let indexToUpdate = this.student_informations.findIndex((item: StudentInformation) => item.id === this.studentInformation.id);
        this.student_informations[indexToUpdate] = response.data;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAcademicInfoView = false;
      }
    })
  }

  cancelAcademic() {
    this.studentInformation = new StudentInformation();
    this.form?.resetForm(this.studentInformation);
    this.studentInformation.email = this.personInformation.email;
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAcademicInfoView = false;
  }

  editAcademic(student_information: any) {
    this.studentInformation = student_information;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAcademicInfoView = true;
    this.studentInformation.facultyId = student_information.faculty.id;
    this.getDepartment(student_information.faculty.id);
    this.studentInformation.departmentId = student_information.department.id;
    this.getProgram(student_information.department.id);
    this.studentInformation.programId = student_information.program.id;
    this.getBatch(student_information.program.id);
    this.studentInformation.batchId = student_information.batch.id;
    this.studentInformation.campusId = student_information.campus.id;
    this.studentInformation.shiftId = student_information.shift.id;
    this.studentInformation.semesterId = student_information.semester.id;
    this.getSyllabusTemplate(student_information.program.id);
    if(student_information.syllabusTemplate){
      this.studentInformation.syllabusTemplateId = student_information.syllabusTemplate.id;
    }
    if(student_information.levelTermTemplate){
      this.studentInformation.levelTermTemplateId = student_information.levelTermTemplate.id;
    }
    this.getPaymentSchemeTemplate();
    if(student_information.paymentSchemeTemplate){
      this.studentInformation.paymentSchemeTemplateId = student_information.paymentSchemeTemplate.id;
    }


  }

  deleteAcademic(student_information: any) {
    Swal.fire({
      title: 'Academic Delete',
      text: 'Are you want to delete this Academic.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.studentInformationService.deleteStudentInformation(student_information.id).subscribe((response:any) => {
          if(response.status){
            this.student_informations = this.student_informations.filter((item: any)  => item !== student_information);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
