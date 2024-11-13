import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {Batch} from "../../../model/admission/admission-setup/batch";
import {BatchService} from "../../../Service/academic/batch.service";
import {Title} from "@angular/platform-browser";
import {ProgramService} from "../../../Service/academic/institute/program.service";
import {SemesterService} from "../../../Service/academic/institute/semester.service";
import {ShiftService} from "../../../Service/academic/shift.service";
import {SyllabusTemplateService} from "../../../Service/academic/syllabusTemplate.service";
import {PaymentSchemeTemplateService} from "../../../Service/academic/paymentSchemeTemplate.service";
import {LevelTernTemplateService} from "../../../Service/academic/levelTernTemplate.service";
import {RoleService} from "../../../utility/role.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SyllabusTemplate} from "../../../model/academic/syllabus/syllabusTemplate";


@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  @ViewChild('batchForm') form: NgForm | undefined;
  batch: any = new Batch();
  isSaveButton: boolean = true;
  isUpdateButton: boolean = false;
  isBatchView: boolean = false;
  batches: any = [];
  programs: any = [];
  semesters: any = [];
  syllabusTemplates: any = [];
  shifts: any = [];
  paymentSchemeTemplates: any = [];
  levelTermTemplates: any = [];
  batchDetail: any;
  semesterCode: any = '';
  programCode: any = '';

  errorMessage: any = {
    name: '',
    code: '',
    program: '',
    semester: '',
    syllabusTemplate: '',
    shift: '',
    paymentSchemeTemplate: '',
    levelTermTemplate: ''
  }
  programId: any;
  page: number = 0;
  total: number = 0;
  size: number = 10;

  constructor(private titleService: Title,
              private service: BatchService,
              private programService: ProgramService,
              private semesterService: SemesterService,
              private shiftService: ShiftService,
              private syllabusTemplateService: SyllabusTemplateService,
              private paymentSchemeTemplateService: PaymentSchemeTemplateService,
              private levelTermTemplateService: LevelTernTemplateService,
              private roleService: RoleService,
              private router: Router,
              private toastr: ToastrService) {
    this.titleService.setTitle('Batch');
  }

  ngOnInit() {
    this.getProgram();
    this.getSemester();
    this.getShift();
    this.getBatchPagination();
  }

  menuRoleAccess(role: any) {
    return this.roleService.hasRole(role);
  }

  getBatchPagination() {
    this.batches = [];
    this.total = 0;
    if(this.programCode === 'undefined' || this.programCode === null){
      this.programCode = '';
    }
    if(this.semesterCode === 'undefined' || this.semesterCode === null){
      this.semesterCode = '';
    }
    this.service.getBatchPagination(this.programCode, this.semesterCode, this.size, this.page).subscribe((response: any) => {
      this.batches = response.data.content;
      this.total = response.data.totalElements;
      if (!response.data.content.length) {
        this.toastr.warning('No data Found')
      }
    })
  }

  pageChangeEvent(event: number) {
    this.page = event - 1;
    this.getBatchPagination();
  }

  getProgram() {
    this.programService.getProgramActive().subscribe((response: any) => {
      this.programs = response.data;
    })
  }

  getLevelTermTemplate(programId: any) {
    this.levelTermTemplates = [];
    this.batch.levelTermTemplateId = undefined;
    this.batch.paymentSchemeTemplateId = undefined;
    if (this.batch.programId) {
      this.levelTermTemplateService.getLevelTermTemplate(programId).subscribe((response: any) => {
        this.levelTermTemplates = response.data;
      })
    } else {
      this.toastr.warning('Invalid Program');
    }
  }

  getSemester() {
    this.semesterService.getSemesterActive().subscribe((response: any) => {
      this.semesters = response.data;
    })
  }

  getSyllabusTemplate(programId: any, levelTermTemplateId: any) {
    this.syllabusTemplates = [];
    this.batch.syllabusTemplateId = undefined;
    if (this.batch.programId && this.batch.levelTermTemplateId) {
      this.syllabusTemplateService.getSyllabusTemplateActive(programId).subscribe((response: any) => {
        this.syllabusTemplates = response.data.filter((item: SyllabusTemplate) => item.levelTermTemplate.id === levelTermTemplateId);
        console.log(this.syllabusTemplates)
        if (!response.data.length) {
          this.toastr.warning('No Data Found');
        }
      })
    } else {
      this.toastr.warning('Invalid Program or Level Term Template');
    }
  }

  getShift() {
    this.shiftService.getShiftActive().subscribe((response: any) => {
      this.shifts = response.data;
    })
  }

  getPaymentSchemeTemplate(programId: any) {
    this.paymentSchemeTemplates = [];
    this.batch.paymentSchemeTemplateId = undefined;
    if (this.batch.programId) {
      this.paymentSchemeTemplateService.getPaymentSchemeTemplateActive(programId).subscribe((response: any) => {
        this.paymentSchemeTemplates = response.data;
      })
    } else {
      this.toastr.warning('Invalid Program or Level Term Template');
    }
  }

  postBatch() {
    this.batch.active = true;
    this.service.postBatch(this.batch).subscribe((response: any) => {
      if (response.status) {
        this.toastr.success(response.message);
        this.batch = new Batch();
        this.batches.push(response.data);
        this.form?.resetForm(this.batch);
        this.isBatchView = false;
      }
      // else {
      //   for (let i = 0; i < response.errors.length; i++) {
      //     if(response.errors[i].field === 'name'){
      //       this.errorMessage.name = response.errors[i].errorMessage;
      //     }else if(response.errors[i].field === 'code'){
      //       this.errorMessage.code = response.errors[i].errorMessage;
      //     }else if(response.errors[i].field === 'programId'){
      //       this.errorMessage.program = response.errors[i].errorMessage;
      //     }else if(response.errors[i].field === 'semesterId'){
      //       this.errorMessage.semester = response.errors[i].errorMessage;
      //     }else if(response.errors[i].field === 'syllabusTemplateId'){
      //       this.errorMessage.syllabusTemplate = response.errors[i].errorMessage;
      //     }else if(response.errors[i].field === 'paymentSchemeTemplateId'){
      //       this.errorMessage.paymentSchemeTemplate = response.errors[i].errorMessage;
      //     }else if(response.errors[i].field === 'paymentSchemeTemplateId'){
      //       this.errorMessage.paymentSchemeTemplate = response.errors[i].errorMessage;
      //     }else if(response.errors[i].field === 'levelTermTemplateId'){
      //       this.errorMessage.levelTermTemplate = response.errors[i].errorMessage;
      //     }
      //   }
      // }
    })
  }

  getEditViewBatch(batch: any) {
    console.log(batch)
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isBatchView = true;
    this.batch = batch;
    this.batch.programId = batch.program.id;
    this.getLevelTermTemplate(batch.program.id);
    if (batch.levelTermTemplate) {
      this.batch.levelTermTemplateId = batch.levelTermTemplate.id;
    }
    this.batch.semesterId = batch.semester.id;
    this.getSyllabusTemplate(batch.program?.id, batch.levelTermTemplate?.id);
    if (batch.syllabusTemplate) {
      this.batch.syllabusTemplateId = batch.syllabusTemplate.id;
    }
    this.batch.shiftId = batch.shift.id;
    this.getPaymentSchemeTemplate(batch.program?.id);
    if (batch.paymentSchemeTemplate) {
      this.batch.paymentSchemeTemplateId = batch.paymentSchemeTemplate.id;
    }


  }

  deleteBatch(batch: any) {
    Swal.fire({
      title: 'Batch Delete',
      text: 'Are you want to delete this Batch.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteBatch(batch.id).subscribe((response: any) => {
          if (response.status) {
            this.batches = this.batches.filter((item: any) => item !== batch);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning("Cancel");
      }
    });
  }

  putBatch() {
    this.service.putBatch(this.batch, this.batch.id).subscribe((response: any) => {
      if (response.status) {
        this.toastr.success(response.message)
        let indexToUpdate = this.batches.findIndex((item: Batch) => item.id === this.batch.id);
        this.batches[indexToUpdate] = response.data;
        this.batch = new Batch();
        this.form?.resetForm(this.batch);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isBatchView = false;
      }
    })
  }

  cancelBatch() {
    this.batch = new Batch();
    this.form?.resetForm(this.batch);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isBatchView = !this.isBatchView;
  }

  batchView() {
    this.isBatchView = !this.isBatchView;
  }
}
