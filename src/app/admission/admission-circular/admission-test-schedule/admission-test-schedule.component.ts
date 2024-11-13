import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";
import {NgForm} from "@angular/forms";
import {AdmissionCircularTestSchedule} from "../../../model/admission/admission-circular/admissionCircularTestSchedule";
import {
  AdmissionCircularTestScheduleService
} from "../../../Service/admission/admission-circular/admissionCircularTestSchedule.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-test-schedule',
  templateUrl: './admission-test-schedule.component.html',
  styleUrls: ['./admission-test-schedule.component.css']
})
export class AdmissionTestScheduleComponent implements OnInit{
  @Input() admissionCircular:any=new AdmissionCircular();
  @ViewChild('admissionCircularTestScheduleForm') testScheduleForm: NgForm | undefined;
  admissionAdnCircularTestSchedule:any = new AdmissionCircularTestSchedule();
  isAdmissionCircularTestSchedule:boolean=false;
  isUpdateButton:boolean = false;
  isSaveButton: boolean = true;
  loading:boolean = false;
  test_schedules:any=[];

  constructor(private admissionAdnCircularTestScheduleService: AdmissionCircularTestScheduleService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getAdmissionCircularTestSchedule();
  }
  admissionCircularTestScheduleView() {
    this.isAdmissionCircularTestSchedule = !this.isAdmissionCircularTestSchedule;
  }
  getAdmissionCircularTestSchedule(){
    this.test_schedules = this.admissionCircular.admissionCircularTestSchedules;
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
        let indexToUpdate = this.test_schedules.findIndex((item: AdmissionCircularTestSchedule) => item.id === this.admissionAdnCircularTestSchedule.id);
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
}
