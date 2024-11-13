import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {AdmissionTestCommitteeRole} from "../../../model/admission/admission-test/admissionTestCommitteeRole";
import {AdmissionTestCommitteeRoleService} from "../../../Service/admission/admission-test/admissionTestCommitteeRole.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-test-committee-role',
  templateUrl: './admission-test-committee-role.component.html',
  styleUrls: ['./admission-test-committee-role.component.css']
})
export class AdmissionTestCommitteeRoleComponent implements OnInit{
  @ViewChild('form') form: NgForm | undefined;
  admissionTestCommitteeRole:any = new AdmissionTestCommitteeRole();
  admission_test_committee_roles:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTestCommitteeRoleView:boolean = false;
  constructor(private admissionTestCommitteeRoleService: AdmissionTestCommitteeRoleService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTestCommitteeRole();
  }
  getAdmissionTestCommitteeRole() {
    this.admissionTestCommitteeRoleService.getAdmissionTestCommitteeRole().subscribe((response:any)=>{
      this.admission_test_committee_roles = response.data;
    })
  }
  admissionTestCommitteeRoleView() {
    this.isTestCommitteeRoleView = !this.isTestCommitteeRoleView;
  }
  postAdmissionTestCommitteeRole() {
    this.admissionTestCommitteeRole.active = true;
    this.admissionTestCommitteeRoleService.postAdmissionTestCommitteeRole(this.admissionTestCommitteeRole).subscribe((response:any)=>{
      if (response.status){
        this.admissionTestCommitteeRole = new AdmissionTestCommitteeRole();
        this.form?.resetForm(this.admissionTestCommitteeRole);
        this.toastr.success(response.message);
        this.admission_test_committee_roles.push(response.data);
        this.admissionTestCommitteeRole.active = false;
        this.isTestCommitteeRoleView = false;
      }
    })
  }

  cancelAdmissionTestCommitteeRole() {
    this.admissionTestCommitteeRole = new AdmissionTestCommitteeRole();
    this.form?.resetForm(this.admissionTestCommitteeRole);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTestCommitteeRoleView = !this.isTestCommitteeRoleView;
  }
  editAdmissionTestCommitteeRole(admission_test_committee_role: any) {
    this.admissionTestCommitteeRole = admission_test_committee_role;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isTestCommitteeRoleView = true;
  }
  putAdmissionTestCommitteeRole() {
    this.admissionTestCommitteeRoleService.putAdmissionTestCommitteeRole(this.admissionTestCommitteeRole, this.admissionTestCommitteeRole.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_test_committee_roles.findIndex((item: AdmissionTestCommitteeRole) => item.id === this.admissionTestCommitteeRole.id);
        this.admission_test_committee_roles[indexToUpdate] = response.data;
        this.admissionTestCommitteeRole = new AdmissionTestCommitteeRole();
        this.form?.resetForm(this.admissionTestCommitteeRole);
        this.admissionTestCommitteeRole.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isTestCommitteeRoleView = false;
      }
    })
  }

  deleteAdmissionTestCommitteeRole(admission_test_committee_role: any) {
    Swal.fire({
      title: 'Admission Test Category Delete',
      text: 'Are you want to delete this Admission Test Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTestCommitteeRoleService.deleteAdmissionTestCommitteeRole(admission_test_committee_role.id).subscribe((response:any) => {
          if(response.status){
            this.admission_test_committee_roles = this.admission_test_committee_roles.filter((item: any)  => item !== admission_test_committee_role);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
