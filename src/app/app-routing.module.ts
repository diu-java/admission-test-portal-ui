import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard/dashboard.component";
import {StudentProfileComponent} from "./student/student-profile/student-profile.component";
import {AuthGuard} from "./utility/app.guard";
import {StudentListComponent} from "./student/student-list/student-list.component";
import {PersonCreateComponent} from "./student/person-create/person-create.component";
import {StudentLookUpComponent} from "./student/student-look-up/student-look-up.component";
import {AdmissionApplicationTypeComponent} from "./admission/admission-setup/admission-application-type/admission-application-type.component";
import {
  AdmissionMembershipOrganizationComponent
} from "./admission/admission-setup/admission-membership-organization/admission-membership-organization.component";
import {
  AdmissionChooseOptionComponent
} from "./admission/admission-setup/admission-choose-option/admission-choose-option.component";
import {
  AdmissionMembershipUserTypeComponent
} from "./admission/admission-setup/admission-membership-user-type/admission-membership-user-type.component";
import {
  AdmissionMembershipComponent
} from "./admission/admission-setup/admission-membership/admission-membership.component";
import {
  AdmissionAffiliateOrganizationComponent
} from "./admission/admission-setup/admission-affiliate-organization/admission-affiliate-organization.component";
import {
  AdmissionAffiliateUserTypeComponent
} from "./admission/admission-setup/admission-affiliate-user-type/admission-affiliate-user-type.component";
import {
  AdmissionAffiliateTypeComponent
} from "./admission/admission-setup/admission-affiliate-type/admission-affiliate-type.component";
import {
  AdmissionWaiverTypeComponent
} from "./admission/admission-setup/admission-waiver-type/admission-waiver-type.component";
import {
  AdmissionTestVenueComponent
} from "./admission/admission-setup/admission-test-venue/admission-test-venue.component";
import {
  AdmissionCircularComponent
} from "./admission/admission-circular/admission-circular/admission-circular.component";
import {AdmissionApplicationComponent} from "./admission/admission-application/admission-application.component";
import {AdmissionUserComponent} from "./admission/admission-user/admission-user.component";
import {
  AdmissionCircularProgramComponent
} from "./admission/admission-circular/admission-circular-program/admission-circular-program.component";
import {
  AdmissionApplicationFormComponent
} from "./admission/application/admission-application-form/admission-application-form.component";
import {
  AdmissionApplicationSubmittedUnderReviewComponent
} from "./admission/application-review/admission-application-submitted-under-review/admission-application-submitted-under-review.component";
import {
  AdmissionApplicationEnrollmentReviewComponent
} from "./admission/application-review/admission-application-enrollment-review/admission-application-enrollment-review.component";
import {
  AdmissionApplicationSelectedTestComponent
} from "./admission/admission-application-selected-test/admission-application-selected-test.component";
import {
  AdmissionApplicationSelectedApplicantComponent
} from "./admission/admission-application-selected-applicant/admission-application-selected-applicant.component";
import {
  AdmissionApplicationDocumentReviewComponent
} from "./admission/application-review/admission-application-document-review/admission-application-document-review.component";
import {
  AdmissionApplicationAdmittedApplicantComponent
} from "./admission/admission-application-admitted-applicant/admission-application-admitted-applicant.component";
import {
  AdmissionApplicationCreateComponent
} from "./admission/admission-application-create/admission-application-create.component";
import {AdmissionApplyComponent} from "./admission/admission-apply/admission-apply.component";
import {AdmissionFeeComponent} from "./admission/admission-setup/admission-fee/admission-fee.component";
import {
  AdmissionApplicationDocumentVerifyTypeComponent
} from "./admission/admission-setup/admission-application-document-verify-type/admission-application-document-verify-type.component";
import {
  AdmissionFeeDetailComponent
} from "./admission/admission-setup/admission-fee-detail/admission-fee-detail.component";
import {
  AdmissionEnrollmentTypeComponent
} from "./admission/admission-setup/admission-enrollment-type/admission-enrollment-type.component";
import {
  AdmissionApplicationNotSubmittedReviewComponent
} from "./admission/application-review/admission-application-not-submitted-review/admission-application-not-submitted-review.component";
import {
  AdmissionMarkTemplateComponent
} from "./admission/admission-exam/admission-mark-template/admission-mark-template.component";
import {
  AdmissionMarkDistributionComponent
} from "./admission/admission-exam/admission-mark-distribution/admission-mark-distribution.component";
import {AdmissionMarkHeadComponent} from "./admission/admission-exam/admission-mark-head/admission-mark-head.component";
import {AdmissionExamComponent} from "./admission/admission-exam/admission-exam/admission-exam.component";
import {BatchComponent} from "./admission/admission-setup/batch/batch.component";
import {
  AdmissionMarkTeacherComponent
} from "./admission/admission-exam/admission-mark-teacher/admission-mark-teacher.component";
import {
  AdmissionMarkEntryComponent
} from "./admission/admission-exam/admission-mark-entry/admission-mark-entry.component";
import {
  AdmissionMarkSubmissionComponent
} from "./admission/admission-exam/admission-mark-submission/admission-mark-submission.component";
import {
  AdmissionMarkApplicantComponent
} from "./admission/admission-exam/admission-mark-applicant/admission-mark-applicant.component";
import {
  AdmissionAttendanceComponent
} from "./admission/admission-exam/admission-attendance/admission-attendance.component";
import {AdmissionFaqComponent} from "./admission/admission-setup/admission-faq/admission-faq.component";
import {
  AdmissionProgramSeatComponent
} from "./admission/admission-setup/admission-program-seat/admission-program-seat.component";
import {AdmissionIntakeComponent} from "./admission/admission-setup/admission-intake/admission-intake.component";
import {
  AdmissionStudyCampusComponent
} from "./admission/admission-setup/admission-study-campus/admission-study-campus.component";
import {
  AdmissionEmailTemplateComponent
} from "./admission/admission-setup/admission-email-template/admission-email-template.component";
import {DwtComponent} from "./components/dwt.component";
import {DocumentComponent} from "./document-scan/document.component";

import {
  ApplicantOtherInformationComponent
} from "./admission/application/step-four/applicant-other-information/applicant-other-information.component";
import {
  AdmissionFormReviewComponent
} from "./admission/application/step-five/admission-form-review/admission-form-review.component";
import {
  PersonalInformationComponent
} from "./admission/application/step-two/personal-information/personal-information.component";
import {
  EducationInformationComponent
} from "./admission/application/step-three/education-information/education-information.component";
import {PostOfficeComponent} from "./admission/admission-setup/post-office/post-office.component";
import {NationalityComponent} from "./admission/admission-setup/nationality/nationality.component";
import {
  EducationInstituteTypeComponent
} from "./admission/admission-setup/education-institute-type/education-institute-type.component";
import {EducationMajorComponent} from "./admission/admission-setup/education-major/education-major.component";
import {EducationSubjectComponent} from "./admission/admission-setup/education-subject/education-subject.component";
import {EducationBoardComponent} from "./admission/admission-setup/education-board/education-board.component";
import {
  EducationInstituteComponent
} from "./admission/admission-setup/education-institute/education-institute.component";
import {ReferenceComponent} from "./admission/admission-setup/add-reference/reference/reference.component";
import {ReferenceUnitComponent} from "./admission/admission-setup/reference-unit/reference-unit.component";
import {ReferenceSubUnitComponent} from "./admission/admission-setup/reference-sub-unit/reference-sub-unit.component";
import {DegreeComponent} from "./admission/admission-setup/degree/degree.component";
import {
  AddReferenceUnitComponent
} from "./admission/admission-setup/add-reference/add-reference-unit/add-reference-unit.component";
import {
  AddReferenceSubUnitComponent
} from "./admission/admission-setup/add-reference/add-reference-sub-unit/add-reference-sub-unit.component";
import {StudentInformationComponent} from "./student-information/student-information/student-information.component";
import {AdmissionReportComponent} from "./admission/admission-report/admission-report/admission-report.component";
import {
  AdmissionReportDateWiseComponent
} from "./admission/admission-report/admission-report-date-wise/admission-report-date-wise.component";
import {
  AdmissionReportFormFeeComponent
} from "./admission/admission-report/admission-report-form-fee/admission-report-form-fee.component";
import {
  AdmissionReportFormFeeSummeryComponent
} from "./admission/admission-report/admission-report-form-fee-summery/admission-report-form-fee-summery.component";
import {
  AdmissionWaiverCategoryComponent
} from "./admission/admission-setup/admission-waiver-category/admission-waiver-category.component";
import {
  AdmissionReportAdmitCardComponent
} from "./admission/admission-report/admission-report-admit-card/admission-report-admit-card.component";
import {AdmissionTagTypeComponent} from "./admission/admission-setup/admission-tag-type/admission-tag-type.component";
import {
  AdmissionTestTemplateComponent
} from "./admission/admission-test/admission-test-template/admission-test-template.component";
import {
  AdmissionTestCategoryComponent
} from "./admission/admission-test/admission-test-category/admission-test-category.component";
import {
  AdmissionTestCommitteeRoleComponent
} from "./admission/admission-test/admission-test-committee-role/admission-test-committee-role.component";
import {
  AdmissionTestCommitteeComponent
} from "./admission/admission-test/admission-test-committee/admission-test-committee.component";
import {AdmissionTestComponent} from "./admission/admission-test/admission-test/admission-test.component";
import {
  AdmissionTestSubjectComponent
} from "./admission/admission-test/admission-test-subject/admission-test-subject.component";
import {
  AdmissionTestTemplateViewComponent
} from "./admission/admission-test/admission-test-template-view/admission-test-template-view.component";
import {AdmissionTest} from "./model/admission/admission-test/admissionTest";
import {
  AdmissionTestCommitteeViewComponent
} from "./admission/admission-test/admission-test-committee-view/admission-test-committee-view.component";
import {AdmissionTestApprovalRoleService} from "./Service/admission/admission-test/admissionTestApprovalRole.service";
import {AdmissionTestApprovalRole} from "./model/admission/admission-test/admissionTestApprovalRole";
import {
  AdmissionTestApprovalRoleComponent
} from "./admission/admission-test/admission-test-approval-role/admission-test-approval-role.component";
import {
  AdmissionTemplateCategoryViewComponent
} from "./admission/admission-test/admission-template-category-view/admission-template-category-view.component";
import {AdmissionTestViewComponent} from "./admission/admission-test/admission-test-view/admission-test-view.component";
import {
  AdmissionTestMarkEntryComponent
} from "./admission/admission-test/admission-test-mark-entry/admission-test-mark-entry.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student-profile/:id',
    component: StudentProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student-look-up',
    component: StudentLookUpComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student-information',
    component: StudentInformationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student-list',
    component: StudentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'person-create',
    component: PersonCreateComponent,
    canActivate: [AuthGuard],
  },
  //Application
  {
    path: 'admission-application-create/:id',
    component: AdmissionApplicationCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application',
    component: AdmissionApplicationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-submitted-under-review',
    component: AdmissionApplicationSubmittedUnderReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-not-submitted-review',
    component: AdmissionApplicationNotSubmittedReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-selected-admission',
    component: AdmissionApplicationEnrollmentReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-selected-test',
    component: AdmissionApplicationSelectedTestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-selected-applicant',
    component: AdmissionApplicationSelectedApplicantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-document-review',
    component: AdmissionApplicationDocumentReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-admitted-applicant',
    component: AdmissionApplicationAdmittedApplicantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-form/:id',
    component: AdmissionApplicationFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admission-application-form-step-two/:id',
    component: PersonalInformationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-form-step-three/:id',
    component: EducationInformationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-form-step-four/:id',
    component: ApplicantOtherInformationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-application-form-step-five/:id',
    component: AdmissionFormReviewComponent,
    canActivate: [AuthGuard],
  },
  //Application TYpe
  {
    path: 'application-type',
    component: AdmissionApplicationTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'enrollment-type',
    component: AdmissionEnrollmentTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tag-type',
    component: AdmissionTagTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'document-verify-type',
    component: AdmissionApplicationDocumentVerifyTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-fee',
    component: AdmissionFeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-fee-detail/:id',
    component: AdmissionFeeDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'membership-organization',
    component: AdmissionMembershipOrganizationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-choose-option',
    component: AdmissionChooseOptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'membership-user-type',
    component: AdmissionMembershipUserTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'membership',
    component: AdmissionMembershipComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'affiliate-organization',
    component: AdmissionAffiliateOrganizationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'affiliate-user-type',
    component: AdmissionAffiliateUserTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'affiliate-type',
    component: AdmissionAffiliateTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'waiver-type',
    component: AdmissionWaiverTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'waiver-category',
    component: AdmissionWaiverCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test-venue',
    component: AdmissionTestVenueComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-faq',
    component: AdmissionFaqComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-study-campus',
    component: AdmissionStudyCampusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-program-seat',
    component: AdmissionProgramSeatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-intake',
    component: AdmissionIntakeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-circular',
    component: AdmissionCircularComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-apply',
    component: AdmissionApplyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-circular-program/:id',
    component: AdmissionCircularProgramComponent,
    canActivate: [AuthGuard],
  },

  //Application User
  {
    path: 'admission-user',
    component: AdmissionUserComponent,
    canActivate: [AuthGuard],
  },

  //Admission Exam
  {
    path: 'admission-mark-template',
    component: AdmissionMarkTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-mark-distribution-detail/:id',
    component: AdmissionMarkDistributionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-mark-head',
    component: AdmissionMarkHeadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-exam',
    component: AdmissionExamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-exam/:id',
    component: AdmissionMarkTeacherComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-mark-entry',
    component: AdmissionMarkEntryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-mark-entry/:id',
    component: AdmissionMarkSubmissionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-mark-applicant',
    component: AdmissionMarkApplicantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-attendance',
    component: AdmissionAttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'batch',
    component: BatchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-email-template',
    component: AdmissionEmailTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'scan',
    component: DwtComponent
  },
  // {
  //   path: 'document-scan/:id/:refName/:recordName/:recordId/:name/:moduleName/:fileExtension',
  //   component: DocumentComponent,
  //   canActivate: [AuthGuard],
  // },

  {
    path: 'document-scan/:id/:recordId/:name/:moduleName/:fileExtension',
    component: DocumentComponent,
    canActivate: [AuthGuard],
  },

  //
  {
    path: 'post-office',
    component: PostOfficeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nationality',
    component: NationalityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'education-institute-type',
    component: EducationInstituteTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'education-institute',
    component: EducationInstituteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'education-major',
    component: EducationMajorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'education-subject',
    component: EducationSubjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'education-board',
    component: EducationBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reference',
    component: ReferenceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-reference-unit/:id',
    component: AddReferenceUnitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-reference-sub-unit/:id',
    component: AddReferenceSubUnitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reference-unit',
    component: ReferenceUnitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reference-sub-unit',
    component: ReferenceSubUnitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'degree',
    component: DegreeComponent,
    canActivate: [AuthGuard],
  },

  // Admission Report
  {
    path: 'admission-report-semester-wise',
    component: AdmissionReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-report-date-wise',
    component: AdmissionReportDateWiseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-report-form-fee',
    component: AdmissionReportFormFeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-report-form-fee-summery',
    component: AdmissionReportFormFeeSummeryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-report-admit-card',
    component: AdmissionReportAdmitCardComponent,
    canActivate: [AuthGuard],
  },

  // Admission Test
  {
    path: 'admission-test-template',
    component: AdmissionTestTemplateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test-template/:id',
    component: AdmissionTestTemplateViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test-category',
    component: AdmissionTestCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test-committee',
    component: AdmissionTestCommitteeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test-committee/:id',
    component: AdmissionTestCommitteeViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-template-category/:id',
    component: AdmissionTemplateCategoryViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test-committee-role',
    component: AdmissionTestCommitteeRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test-subject',
    component: AdmissionTestSubjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test',
    component: AdmissionTestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test/:id',
    component: AdmissionTestViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test-approval-role',
    component: AdmissionTestApprovalRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-test-mark-entry',
    component: AdmissionTestMarkEntryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
