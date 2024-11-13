import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdmissionCircularIntake} from "../../../model/admission/admission-circular/admissionCircularIntake";
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";
import Swal from "sweetalert2";
import {AdmissionIntakeService} from "../../../Service/admission/admission-setup/admissionIntake.service";
import {
  AdmissionCircularIntakeService
} from "../../../Service/admission/admission-circular/admissionCircularIntake.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admission-circular-intake',
  templateUrl: './admission-circular-intake.component.html',
  styleUrls: ['./admission-circular-intake.component.css']
})
export class AdmissionCircularIntakeComponent implements OnInit{
  @Input() admissionCircular:any=new AdmissionCircular();
  @ViewChild('admissionCircularIntakeForm') intakeForm: NgForm | undefined;

  admissionCircularIntake:any = new AdmissionCircularIntake();
  admission_circular_intakes:any=[];
  admission_intakes:any=[];
  isAdmissionCircularIntakeView:boolean = false;
  loading:boolean = false;
  isUpdateButton:boolean = false;
  isSaveButton: boolean = true;
  constructor(private admissionIntakeService: AdmissionIntakeService, private admissionCircularIntakeService: AdmissionCircularIntakeService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getViewAdmissionCircular();
    this.getAdmissionIntake();
  }

  getViewAdmissionCircular(){
    this.getAdmissionCircularIntake();
  }
  getAdmissionIntake(){
    this.admissionIntakeService.getAdmissionIntakeActive().subscribe((response:any)=>{
      this.admission_intakes = response.data;
    })
  }

  getAdmissionCircularIntake(){
    // this.admissionCircularIntakeService.getAdmissionCircularIntakeActive(admissionCircularId).subscribe((response:any)=>{
    //   this.admission_circular_intakes = response.data;
    // })
    this.admission_circular_intakes = this.admissionCircular.admissionCircularIntakes;
  }
  postAdmissionCircularIntake() {
    this.loading = true;
    this.admissionCircularIntake.admissionCircularId = this.admissionCircular.id;
    this.admissionCircularIntakeService.postAdmissionCircularIntake(this.admissionCircularIntake).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.admissionCircularIntake = new AdmissionCircularIntake();
        this.intakeForm?.resetForm(this.admissionCircularIntake);
        this.toastr.success(response.message);
        this.admission_circular_intakes.push(response.data);
        this.isAdmissionCircularIntakeView = false;
      }
    })
  }

  putAdmissionCircularIntake() {
    this.loading = true;
    this.admissionCircularIntake.admissionCircularId = this.admissionCircular.id;
    this.admissionCircularIntakeService.putAdmissionCircularIntake(this.admissionCircularIntake, this.admissionCircularIntake.id).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_circular_intakes.findIndex((item: AdmissionCircularIntake) => item.id === this.admissionCircularIntake.id);
        this.admission_circular_intakes[indexToUpdate] = response.data;
        this.admissionCircularIntake = new AdmissionCircularIntake();
        this.intakeForm?.resetForm(this.admissionCircularIntake);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionCircularIntakeView = false;
      }
    })
  }

  cancelAdmissionCircularIntake() {
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionCircularIntakeView = !this.isAdmissionCircularIntakeView;
  }
  editAdmissionCircularIntake(admission_circular_intake: any) {
    this.admissionCircularIntake = admission_circular_intake;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionCircularIntakeView = true;
    this.admissionCircularIntake.admissionIntakeId = admission_circular_intake?.id;
  }

  deleteAdmissionCircularIntake(admission_circular_intake: any) {
    Swal.fire({
      title: 'Admission Circular Intake Delete',
      text: 'Are you want to delete this Admission Circular Intake.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionCircularIntakeService.deleteAdmissionCircularIntake(admission_circular_intake.id).subscribe((response:any) => {
          if(response.status){
            this.admission_circular_intakes = this.admission_circular_intakes.filter((item: any)  => item !== admission_circular_intake);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }

  admissionCircularIntakeView() {
    this.isAdmissionCircularIntakeView = !this.isAdmissionCircularIntakeView;
    this.admissionCircularIntake = new AdmissionCircularIntake();
  }
}
