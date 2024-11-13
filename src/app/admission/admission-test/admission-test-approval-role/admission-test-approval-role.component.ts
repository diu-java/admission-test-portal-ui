import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestApprovalRole} from "../../../model/admission/admission-test/admissionTestApprovalRole";
import {
  AdmissionTestApprovalRoleService
} from "../../../Service/admission/admission-test/admissionTestApprovalRole.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-test-approval-role',
  templateUrl: './admission-test-approval-role.component.html',
  styleUrls: ['./admission-test-approval-role.component.css']
})
export class AdmissionTestApprovalRoleComponent implements OnInit{
  @ViewChild('form') form: NgForm | undefined;
  admissionTestApprovalRole:any = new AdmissionTestApprovalRole();
  admission_test_approval_roles:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTestApprovalRoleView:boolean = false;
  constructor(private admissionTestApprovalRoleService: AdmissionTestApprovalRoleService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTestApprovalRole();
  }
  getAdmissionTestApprovalRole() {
    this.admissionTestApprovalRoleService.getAdmissionTestApprovalRole().subscribe((response:any)=>{
      this.admission_test_approval_roles = response.data;
    })
  }
  admissionTestApprovalRoleView() {
    this.isTestApprovalRoleView = !this.isTestApprovalRoleView;
  }
  postAdmissionTestApprovalRole() {
    this.admissionTestApprovalRole.active = true;
    this.admissionTestApprovalRoleService.postAdmissionTestApprovalRole(this.admissionTestApprovalRole).subscribe((response:any)=>{
      if (response.status){
        this.admissionTestApprovalRole = new AdmissionTestApprovalRole();
        this.form?.resetForm(this.admissionTestApprovalRole);
        this.toastr.success(response.message);
        this.admission_test_approval_roles.push(response.data);
        this.admissionTestApprovalRole.active = false;
        this.isTestApprovalRoleView = false;
      }
    })
  }

  cancelAdmissionTestApprovalRole() {
    this.admissionTestApprovalRole = new AdmissionTestApprovalRole();
    this.form?.resetForm(this.admissionTestApprovalRole);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTestApprovalRoleView = !this.isTestApprovalRoleView;
  }
  editAdmissionTestApprovalRole(admission_test_committee_role: any) {
    this.admissionTestApprovalRole = admission_test_committee_role;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isTestApprovalRoleView = true;
  }
  putAdmissionTestApprovalRole() {
    this.admissionTestApprovalRoleService.putAdmissionTestApprovalRole(this.admissionTestApprovalRole, this.admissionTestApprovalRole.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_test_approval_roles.findIndex((item: AdmissionTestApprovalRole) => item.id === this.admissionTestApprovalRole.id);
        this.admission_test_approval_roles[indexToUpdate] = response.data;
        this.admissionTestApprovalRole = new AdmissionTestApprovalRole();
        this.form?.resetForm(this.admissionTestApprovalRole);
        this.admissionTestApprovalRole.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isTestApprovalRoleView = false;
      }
    })
  }

  deleteAdmissionTestApprovalRole(admission_test_committee_role: any) {
    Swal.fire({
      title: 'Admission Test Category Delete',
      text: 'Are you want to delete this Admission Test Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTestApprovalRoleService.deleteAdmissionTestApprovalRole(admission_test_committee_role.id).subscribe((response:any) => {
          if(response.status){
            this.admission_test_approval_roles = this.admission_test_approval_roles.filter((item: any)  => item !== admission_test_committee_role);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
