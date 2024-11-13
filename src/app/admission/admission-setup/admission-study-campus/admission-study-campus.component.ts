import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestVenue} from "../../../model/admission/admission-setup/admissionTestVenue";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {AdmissionStudyCampusService} from "../../../Service/admission/admission-setup/admissionStudyCampus.service";
import {AdmissionStudyCampus} from "../../../model/admission/admission-setup/admissionStudyCampus";
import {InstituteService} from "../../../Service/academic/institute/institute.service";

@Component({
  selector: 'app-admission-study-campus',
  templateUrl: './admission-study-campus.component.html',
  styleUrls: ['./admission-study-campus.component.css']
})
export class AdmissionStudyCampusComponent implements OnInit{
  @ViewChild('studyCampusForm') form: NgForm | undefined;
  admissionStudyCampus:any  = new AdmissionStudyCampus();
  study_campuses:any=[];
  institutes:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor( private service: AdmissionStudyCampusService, private instituteService: InstituteService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Admission Test Venue')
  }
  ngOnInit() {
    this.getStudyCampus();
    this.getInstitute();
  }

  getStudyCampus(){
    this.service.getStudyCampus().subscribe((response:any)=>{
      this.study_campuses = response.data;
    })
  }
  getInstitute(){
    this.instituteService.getInstituteActive().subscribe((response:any)=>{
      this.institutes = response.data;
    })
  }

  postStudyCampus() {
    this.admissionStudyCampus.active = true;
    this.service.postStudyCampus(this.admissionStudyCampus).subscribe((response:any)=>{
      if (response.status){
        this.admissionStudyCampus = new AdmissionStudyCampus();
        this.form?.resetForm(this.admissionStudyCampus);
        this.toastr.success(response.message);
        this.study_campuses.push(response.data);
      }
    })
  }

  putStudyCampus() {
    this.service.putStudyCampus(this.admissionStudyCampus, this.admissionStudyCampus.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.study_campuses.findIndex((item: AdmissionStudyCampus) => item.id === this.admissionStudyCampus.id);
        this.study_campuses[indexToUpdate] = response.data;
        this.admissionStudyCampus = new AdmissionStudyCampus();
        this.form?.resetForm(this.admissionStudyCampus);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelStudyCampus() {
    this.admissionStudyCampus = new AdmissionStudyCampus();
    this.form?.resetForm(this.admissionStudyCampus);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editStudyCampus(study_campus: any) {
    this.admissionStudyCampus = study_campus;
    this.admissionStudyCampus.instituteId = study_campus.institute.id;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteStudyCampus(study_campus: any) {
    Swal.fire({
      title: 'Test Venue Delete',
      text: 'Are you want to delete this Test Venue.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteStudyCampus(study_campus.id).subscribe((response:any) => {
          if(response.status){
            this.study_campuses = this.study_campuses.filter((item: any)  => item !== study_campus);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
}
