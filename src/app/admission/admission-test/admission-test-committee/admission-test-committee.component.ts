import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestCommittee} from "../../../model/admission/admission-test/admissionTestCommittee";
import {AdmissionTestCommitteeService} from "../../../Service/admission/admission-test/admissionTestCommittee.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-test-committee',
  templateUrl: './admission-test-committee.component.html',
  styleUrls: ['./admission-test-committee.component.css']
})
export class AdmissionTestCommitteeComponent implements OnInit{
  @ViewChild('form') form: NgForm | undefined;
  admissionTestCommittee:any = new AdmissionTestCommittee();
  admission_test_committees:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTestCommitteeView:boolean = false;
  constructor(private admissionTestCommitteeService: AdmissionTestCommitteeService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTestCommittee();
  }
  getAdmissionTestCommittee() {
    this.admissionTestCommitteeService.getAdmissionTestCommittee().subscribe((response:any)=>{
      this.admission_test_committees = response.data;
    })
  }
  admissionTestCommitteeView() {
    this.isTestCommitteeView = !this.isTestCommitteeView;
  }
  postAdmissionTestCommittee() {
    this.admissionTestCommittee.active = true;
    this.admissionTestCommitteeService.postAdmissionTestCommittee(this.admissionTestCommittee).subscribe((response:any)=>{
      if (response.status){
        this.admissionTestCommittee = new AdmissionTestCommittee();
        this.form?.resetForm(this.admissionTestCommittee);
        this.toastr.success(response.message);
        this.admission_test_committees.push(response.data);
        this.admissionTestCommittee.active = false;
        this.isTestCommitteeView = false;
      }
    })
  }

  cancelAdmissionTestCommittee() {
    this.admissionTestCommittee = new AdmissionTestCommittee();
    this.form?.resetForm(this.admissionTestCommittee);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTestCommitteeView = !this.isTestCommitteeView;
  }
  editAdmissionTestCommittee(admission_test_committee: any) {
    this.admissionTestCommittee = admission_test_committee;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }
  putAdmissionTestCommittee() {
    this.admissionTestCommitteeService.putAdmissionTestCommittee(this.admissionTestCommittee, this.admissionTestCommittee.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_test_committees.findIndex((item: AdmissionTestCommittee) => item.id === this.admissionTestCommittee.id);
        this.admission_test_committees[indexToUpdate] = response.data;
        this.admissionTestCommittee = new AdmissionAffiliateType();
        this.form?.resetForm(this.admissionTestCommittee);
        this.admissionTestCommittee.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  deleteAdmissionTestCommittee(admission_test_committee: any) {
    Swal.fire({
      title: 'Admission Test Category Delete',
      text: 'Are you want to delete this Admission Test Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTestCommitteeService.deleteAdmissionTestCommittee(admission_test_committee.id).subscribe((response:any) => {
          if(response.status){
            this.admission_test_committees = this.admission_test_committees.filter((item: any)  => item !== admission_test_committee);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  viewAdmissionTestCommittee(admission_test_committee: any) {
    this.router.navigate(['/admission-test-committee', admission_test_committee.id]);
  }
}
