import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestCommitteeMember} from "../../../model/admission/admission-test/admissionTestCommitteeMember";
import {
  AdmissionTestCommitteeMemberService
} from "../../../Service/admission/admission-test/admissionTestCommitteeMember.service";
import {AdmissionTestCategoryService} from "../../../Service/admission/admission-test/admissionTestCategory.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";
import Swal from "sweetalert2";
import {
  AdmissionTestCommitteeRoleService
} from "../../../Service/admission/admission-test/admissionTestCommitteeRole.service";
import {EmployeeInformationService} from "../../../Service/employee/employeeInformation.service";
import {AdmissionTestTemplate} from "../../../model/admission/admission-test/admissionTestTemplate";
import {AdmissionTestCommittee} from "../../../model/admission/admission-test/admissionTestCommittee";

@Component({
  selector: 'app-admission-test-committee-member',
  templateUrl: './admission-test-committee-member.component.html',
  styleUrls: ['./admission-test-committee-member.component.css']
})
export class AdmissionTestCommitteeMemberComponent implements OnInit{
  @Input() admissionTestCommittee:any=new AdmissionTestCommittee();
  @ViewChild('form') form: NgForm | undefined;
  admissionTestCommitteeMember:any = new AdmissionTestCommitteeMember();
  admission_template_committee_members:any=[]
  admission_test_categories:any=[]
  admission_test_committee_roles:any=[]
  employees:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTestCommitteeMemberView:boolean = false;
  constructor(private admissionTestCommitteeMemberService: AdmissionTestCommitteeMemberService,
              private admissionTestCategoryService: AdmissionTestCategoryService,
              private admissionTestCommitteeRoleService: AdmissionTestCommitteeRoleService,
              private employeeInformationService: EmployeeInformationService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTestCommitteeMember();
    this.getAdmissionTestCategory();
    this.getEmployee();
    this.getAdmissionTestCommitteeRole()
  }
  getAdmissionTestCommitteeMember() {
    this.admissionTestCommitteeMemberService.getAdmissionTestCommitteeMember().subscribe((response:any)=>{
      this.admission_template_committee_members = response.data;
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
  getAdmissionTestCommitteeRole() {
    this.admissionTestCommitteeRoleService.getAdmissionTestCommitteeRole().subscribe((response:any)=>{
      this.admission_test_committee_roles = response.data;
    })
  }
  admissionTestCommitteeMemberView() {
    this.isTestCommitteeMemberView = !this.isTestCommitteeMemberView;
  }
  postAdmissionTestCommitteeMember() {
    this.admissionTestCommitteeMember.active = true;
    this.admissionTestCommitteeMember.admissionTestCommitteeId = this.admissionTestCommittee.id;
    this.admissionTestCommitteeMemberService.postAdmissionTestCommitteeMember(this.admissionTestCommitteeMember).subscribe((response:any)=>{
      if (response.status){
        this.admissionTestCommitteeMember = new AdmissionTestCommitteeMember();
        this.form?.resetForm(this.admissionTestCommitteeMember);
        this.toastr.success(response.message);
        this.admission_template_committee_members.push(response.data);
        this.admissionTestCommitteeMember.active = false;
        this.isTestCommitteeMemberView = false;
      }
    })
  }

  cancelAdmissionTestCommitteeMember() {
    this.admissionTestCommitteeMember = new AdmissionTestCommitteeMember();
    this.form?.resetForm(this.admissionTestCommitteeMember);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTestCommitteeMemberView = !this.isTestCommitteeMemberView;
  }
  editAdmissionTestCommitteeMember(admission_template_category: any) {
    this.admissionTestCommitteeMember = admission_template_category;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isTestCommitteeMemberView = true;
    this.admissionTestCommitteeMember.admissionTestCommitteeId = admission_template_category.admissionTestCommittee.id;
    this.admissionTestCommitteeMember.admissionTestCommitteeRoleId = admission_template_category.admissionTestCommitteeRole.id;
    this.admissionTestCommitteeMember.employeeInfoId = admission_template_category.employeeInfo.id;
  }
  putAdmissionTestCommitteeMember() {
    this.admissionTestCommitteeMemberService.putAdmissionTestCommitteeMember(this.admissionTestCommitteeMember, this.admissionTestCommitteeMember.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_template_committee_members.findIndex((item: AdmissionTestCommitteeMember) => item.id === this.admissionTestCommitteeMember.id);
        this.admission_template_committee_members[indexToUpdate] = response.data;
        this.admissionTestCommitteeMember = new AdmissionAffiliateType();
        this.form?.resetForm(this.admissionTestCommitteeMember);
        this.admissionTestCommitteeMember.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isTestCommitteeMemberView = false;
      }
    })
  }

  deleteAdmissionTestCommitteeMember(admission_template_category: any) {
    Swal.fire({
      title: 'Admission Template Category Delete',
      text: 'Are you want to delete this Admission Template Category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTestCommitteeMemberService.deleteAdmissionTestCommitteeMember(admission_template_category.id).subscribe((response:any) => {
          if(response.status){
            this.admission_template_committee_members = this.admission_template_committee_members.filter((item: any)  => item !== admission_template_category);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
