import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {AdmissionMarkHead} from "../../../model/admission/admission-exam/admissionMarkHead";
import {AdmissionMarkHeadService} from "../../../Service/admission/admission-exam/admissionMarkHead.service";

@Component({
  selector: 'app-admission-mark',
  templateUrl: './admission-mark-head.component.html',
  styleUrls: ['./admission-mark-head.component.css']
})
export class AdmissionMarkHeadComponent implements OnInit{
  @ViewChild('applicationTypeForm') form: NgForm | undefined;
  admissionMarkHead:any  = new AdmissionMarkHead();
  admission_mark_heads:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;

  constructor(private service: AdmissionMarkHeadService,
              private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Admission Mark Head')
  }
  ngOnInit() {
    this.getAdmissionMarkHead();
  }

  getAdmissionMarkHead() {
    this.service.getAdmissionMarkHead().subscribe((response:any)=>{
      this.admission_mark_heads = response.data;
    })
  }


  postAdmissionMarkHead() {
    this.admissionMarkHead.active = true;
    this.service.postAdmissionMarkHead(this.admissionMarkHead).subscribe((response:any)=>{
      if(response.status){
        this.admissionMarkHead = new AdmissionMarkHead();
        this.form?.resetForm(this.admissionMarkHead);
        this.toastr.success(response.message);
        this.admission_mark_heads.push(response.data);
      }
    })
  }

  putAdmissionMarkHead() {

    this.service.putAdmissionMarkHead(this.admissionMarkHead, this.admissionMarkHead.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_mark_heads.findIndex((item: AdmissionMarkHead) => item.id === this.admissionMarkHead.id);
        this.admission_mark_heads[indexToUpdate] = response.data;
        this.admissionMarkHead = new AdmissionMarkHead();
        this.form?.resetForm(this.admissionMarkHead);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAdmissionMarkHead() {
    this.admissionMarkHead = new AdmissionMarkHead();
    this.form?.resetForm(this.admissionMarkHead);
    this.isSaveButton = true;
    this.isUpdateButton = false;

  }

  editAdmissionMarkHead(application_type: any) {
    this.admissionMarkHead = application_type;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteAdmissionMarkHead(application_type: any) {
    Swal.fire({
      title: 'Application Type Delete',
      text: 'Are you want to delete this Application Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAdmissionMarkHead(application_type.id).subscribe((response:any) => {
          if(response.status){
            this.admission_mark_heads = this.admission_mark_heads.filter((item: any)  => item !== application_type);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
