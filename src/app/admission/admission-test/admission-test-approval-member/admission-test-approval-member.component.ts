import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestApprovalMember} from "../../../model/admission/admission-test/admissionTestApprovalMember";
import {
  AdmissionTestApprovalMemberService
} from "../../../Service/admission/admission-test/admissionTestApprovalMember.service";
import {AdmissionTestCategoryService} from "../../../Service/admission/admission-test/admissionTestCategory.service";
import {EmployeeInformationService} from "../../../Service/employee/employeeInformation.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import Swal from "sweetalert2";
import {
  AdmissionTestApprovalRoleService
} from "../../../Service/admission/admission-test/admissionTestApprovalRole.service";
import {AdmissionTestCommittee} from "../../../model/admission/admission-test/admissionTestCommittee";

@Component({
  selector: 'app-admission-test-approval-member',
  templateUrl: './admission-test-approval-member.component.html',
  styleUrls: ['./admission-test-approval-member.component.css']
})
export class AdmissionTestApprovalMemberComponent implements OnInit{
  @Input() admissionTestCommittee:any=new AdmissionTestCommittee();
  @ViewChild('form') form: NgForm | undefined;
  admissionTestApprovalMember:any = new AdmissionTestApprovalMember();
  admission_test_approval_members:any=[]
  admission_test_categories:any=[]
  admission_test_approval_roles:any=[]
  employees:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTestApprovalMemberView:boolean = false;
  constructor(private admissionTestApprovalMemberService: AdmissionTestApprovalMemberService,
              private admissionTestCategoryService: AdmissionTestCategoryService,
              private admissionTestApprovalRoleService: AdmissionTestApprovalRoleService,
              private employeeInformationService: EmployeeInformationService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTestApprovalMember();
    this.getAdmissionTestCategory();
    this.getEmployee();
    this.getAdmissionTestApprovalRole()
  }
  getAdmissionTestApprovalMember() {
    this.admissionTestApprovalMemberService.getAdmissionTestApprovalMember().subscribe((response:any)=>{
      this.admission_test_approval_members = response.data;
    })
  }
  getAdmissionTestCategory(){
    this.admissionTestCategoryService.getAdmissionTestCategoryActive().subscribe((response:any)=>{
      this.admission_test_categories = response.data;
    })
  }
  getEmployee(){
    this.employeeInformationService.getEmployeeInformationActive().subscribe((respose:any)=>{
      this.employees = respose.data;
    })
  }
  getAdmissionTestApprovalRole() {
    this.admissionTestApprovalRoleService.getAdmissionTestApprovalRole().subscribe((response:any)=>{
      this.admission_test_approval_roles = response.data;
    })
  }
  admissionTestApprovalMemberView() {
    this.isTestApprovalMemberView = !this.isTestApprovalMemberView;
  }
  postAdmissionTestApprovalMember() {
    this.admissionTestApprovalMember.active = true;
    this.admissionTestApprovalMember.admissionTestCommitteeId = this.admissionTestCommittee.id;
    this.admissionTestApprovalMember.status = 0;
    this.admissionTestApprovalMemberService.postAdmissionTestApprovalMember(this.admissionTestApprovalMember).subscribe((response:any)=>{
      if (response.status){
        this.admissionTestApprovalMember = new AdmissionTestApprovalMember();
        this.form?.resetForm(this.admissionTestApprovalMember);
        this.toastr.success(response.message);
        this.admission_test_approval_members.push(response.data);
        this.admissionTestApprovalMember.active = false;
        this.isTestApprovalMemberView = false;
      }
    })
  }

  cancelAdmissionTestApprovalMember() {
    this.admissionTestApprovalMember = new AdmissionTestApprovalMember();
    this.form?.resetForm(this.admissionTestApprovalMember);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTestApprovalMemberView = !this.isTestApprovalMemberView;
  }
  editAdmissionTestApprovalMember(admission_test_approval_member: any) {
    this.admissionTestApprovalMember = admission_test_approval_member;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isTestApprovalMemberView = true;
  }
  putAdmissionTestApprovalMember() {
    this.admissionTestApprovalMember.admissionTestCommitteeId = this.admissionTestCommittee.id;
    this.admissionTestApprovalMemberService.putAdmissionTestApprovalMember(this.admissionTestApprovalMember, this.admissionTestApprovalMember.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_test_approval_members.findIndex((item: AdmissionTestApprovalMember) => item.id === this.admissionTestApprovalMember.id);
        this.admission_test_approval_members[indexToUpdate] = response.data;
        this.admissionTestApprovalMember = new AdmissionAffiliateType();
        this.form?.resetForm(this.admissionTestApprovalMember);
        this.admissionTestApprovalMember.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isTestApprovalMemberView = false;
      }
    })
  }

  deleteAdmissionTestApprovalMember(admission_test_approval_member: any) {
    Swal.fire({
      title: 'Admission Template Category Delete',
      text: 'Are you want to delete this Admission Template Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTestApprovalMemberService.deleteAdmissionTestApprovalMember(admission_test_approval_member.id).subscribe((response:any) => {
          if(response.status){
            this.admission_test_approval_members = this.admission_test_approval_members.filter((item: any)  => item !== admission_test_approval_member);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
