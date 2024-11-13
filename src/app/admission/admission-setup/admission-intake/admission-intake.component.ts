import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {AdmissionIntake} from "../../../model/admission/admission-setup/admissionIntake";
import {AdmissionIntakeService} from "../../../Service/admission/admission-setup/admissionIntake.service";

@Component({
  selector: 'app-admission-intake',
  templateUrl: './admission-intake.component.html',
  styleUrls: ['./admission-intake.component.css']
})
export class AdmissionIntakeComponent implements OnInit{
  @ViewChild('intakeForm') form: NgForm | undefined;
  admissionIntake  = new AdmissionIntake();
  admission_intakes:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor( private service: AdmissionIntakeService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Admission Intake')
  }
  ngOnInit() {
    this.getAdmissionIntake();
  }
  getAdmissionIntake() {
    this.service.getAdmissionIntake().subscribe((response:any)=>{
      this.admission_intakes = response.data;
    })
  }
  postAdmissionIntake() {
    this.admissionIntake.active = true;
    this.service.postAdmissionIntake(this.admissionIntake).subscribe((response:any)=>{
      if (response.status){
        this.admissionIntake = new AdmissionIntake();
        this.form?.resetForm(this.admissionIntake);
        this.toastr.success(response.message);
        this.admission_intakes.push(response.data);
      }
    })
  }

  putAdmissionIntake() {
    this.service.putAdmissionIntake(this.admissionIntake, this.admissionIntake.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_intakes.findIndex((item: AdmissionIntake) => item.id === this.admissionIntake.id);
        this.admission_intakes[indexToUpdate] = response.data;
        this.admissionIntake = new AdmissionIntake();
        this.form?.resetForm(this.admissionIntake);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAdmissionIntake() {
    this.admissionIntake = new AdmissionIntake();
    this.form?.resetForm(this.admissionIntake);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAdmissionIntake(admission_intake: any) {
    this.admissionIntake = admission_intake;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAdmissionIntake(admission_intake: any) {
    Swal.fire({
      title: 'Admission Intake Delete',
      text: 'Are you want to delete this Admission Intake.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAdmissionIntake(admission_intake.id).subscribe((response:any) => {
          if(response.status){
            this.admission_intakes = this.admission_intakes.filter((item: any)  => item !== admission_intake);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
