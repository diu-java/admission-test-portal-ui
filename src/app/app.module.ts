import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ToastrModule} from "ngx-toastr";
import {initializeKeycloak} from "./utility/app.init";
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { PersonCreateComponent } from './student/person-create/person-create.component';
import { StudentLookUpComponent } from './student/student-look-up/student-look-up.component';
import {
  StudentAddressInformationComponent
} from "./student/information-tab/student-address-information/student-address-information.component";
import {
  StudentEmergencyContactComponent
} from "./student/information-tab/student-emergency-contact/student-emergency-contact.component";
import {
  StudentVisaInformationComponent
} from "./student/information-tab/student-visa-information/student-visa-information.component";
import {
  StudentPassportInformationComponent
} from "./student/information-tab/student-passport-information/student-passport-information.component";
import {
  StudentBankInformationComponent
} from "./student/information-tab/student-bank-information/student-bank-information.component";
import {
  StudentEducationalInformationComponent
} from "./student/information-tab/student-educational-information/student-educational-information.component";
import {StudentSkillComponent} from "./student/information-tab/student-skill/student-skill.component";
import {
  StudentJobExperienceComponent
} from "./student/information-tab/student-job-experience/student-job-experience.component";
import {StudentFamilyComponent} from "./student/information-tab/student-family/student-family.component";
import {StudentPublicationComponent} from "./student/information-tab/student-publication/student-publication.component";
import {StudentAwardComponent} from "./student/information-tab/student-award/student-award.component";
import {StudentResearchComponent} from "./student/information-tab/student-research/student-research.component";
import {StudentAcademicComponent} from "./student/information-tab/student-academic/student-academic.component";
import { AdmissionApplicationTypeComponent } from './admission/admission-setup/admission-application-type/admission-application-type.component';
import { AdmissionApplicationComponent } from './admission/admission-application/admission-application.component';
import { AdmissionMembershipOrganizationComponent } from './admission/admission-setup/admission-membership-organization/admission-membership-organization.component';
import { AdmissionChooseOptionComponent } from './admission/admission-setup/admission-choose-option/admission-choose-option.component';
import { AdmissionMembershipUserTypeComponent } from './admission/admission-setup/admission-membership-user-type/admission-membership-user-type.component';
import { AdmissionMembershipComponent } from './admission/admission-setup/admission-membership/admission-membership.component';
import { AdmissionAffiliateOrganizationComponent } from './admission/admission-setup/admission-affiliate-organization/admission-affiliate-organization.component';
import { AdmissionAffiliateUserTypeComponent } from './admission/admission-setup/admission-affiliate-user-type/admission-affiliate-user-type.component';
import { AdmissionAffiliateTypeComponent } from './admission/admission-setup/admission-affiliate-type/admission-affiliate-type.component';
import { AdmissionWaiverTypeComponent } from './admission/admission-setup/admission-waiver-type/admission-waiver-type.component';
import { AdmissionTestVenueComponent } from './admission/admission-setup/admission-test-venue/admission-test-venue.component';
import { AdmissionCircularComponent } from './admission/admission-circular/admission-circular/admission-circular.component';
import { AdmissionUserComponent } from './admission/admission-user/admission-user.component';
import { AdmissionCircularProgramComponent } from './admission/admission-circular/admission-circular-program/admission-circular-program.component';
import { AdmissionApplicationFormComponent } from './admission/application/admission-application-form/admission-application-form.component';
import { AdmissionPersonInformationComponent } from './admission/application/step-two/admission-person-information/admission-person-information.component';
import { AdmissionAddressInformationComponent } from './admission/application/step-two/admission-address-information/admission-address-information.component';
import { ApplicantSkillComponent } from './admission/application/step-three/applicant-skill/applicant-skill.component';
import { ApplicantProfessionalExperienceComponent } from './admission/application/step-three/applicant-professional-experience/applicant-professional-experience.component';
import { ApplicantEducationComponent } from './admission/application/step-three/applicant-education/applicant-education.component';
import { ApplicantAwardComponent } from './admission/application/step-three/applicant-award/applicant-award.component';
import { ApplicantAdmissionInformationComponent } from './admission/application/step-one/applicant-admission-information/applicant-admission-information.component';
import { ApplicantPassportComponent } from './admission/application/step-two/applicant-passport/applicant-passport.component';
import { ApplicantFamilyComponent } from './admission/application/step-two/applicant-family/applicant-family.component';
import { ApplicantLocalGuardianComponent } from './admission/application/step-two/applicant-local-guardian/applicant-local-guardian.component';
import { ApplicantOtherInformationComponent } from './admission/application/step-four/applicant-other-information/applicant-other-information.component';
import { AdmissionFormReviewComponent } from './admission/application/step-five/admission-form-review/admission-form-review.component';
import { AdmissionApplicationSubmittedUnderReviewComponent } from './admission/application-review/admission-application-submitted-under-review/admission-application-submitted-under-review.component';
import { AdmissionApplicationEnrollmentReviewComponent } from './admission/application-review/admission-application-enrollment-review/admission-application-enrollment-review.component';
import { AdmissionApplicationSelectedTestComponent } from './admission/admission-application-selected-test/admission-application-selected-test.component';
import { AdmissionApplicationSelectedApplicantComponent } from './admission/admission-application-selected-applicant/admission-application-selected-applicant.component';
import { AdmissionApplicationDocumentReviewComponent } from './admission/application-review/admission-application-document-review/admission-application-document-review.component';
import { AdmissionApplicationAdmittedApplicantComponent } from './admission/admission-application-admitted-applicant/admission-application-admitted-applicant.component';
import { AdmissionApplicationCreateComponent } from './admission/admission-application-create/admission-application-create.component';
import { AdmissionApplyComponent } from './admission/admission-apply/admission-apply.component';
import { AdmissionApplicationDocumentVerifyTypeComponent } from './admission/admission-setup/admission-application-document-verify-type/admission-application-document-verify-type.component';
import {NgxPaginationModule} from "ngx-pagination";
import { AdmissionFeeComponent } from './admission/admission-setup/admission-fee/admission-fee.component';
import { AdmissionFeeDetailComponent } from './admission/admission-setup/admission-fee-detail/admission-fee-detail.component';
import { AdmissionEnrollmentTypeComponent } from './admission/admission-setup/admission-enrollment-type/admission-enrollment-type.component';
import { AdmissionApplicationNotSubmittedReviewComponent } from './admission/application-review/admission-application-not-submitted-review/admission-application-not-submitted-review.component';
import { AdmissionMarkTemplateComponent } from './admission/admission-exam/admission-mark-template/admission-mark-template.component';
import { AdmissionMarkDistributionComponent } from './admission/admission-exam/admission-mark-distribution/admission-mark-distribution.component';
import { AdmissionExamComponent } from './admission/admission-exam/admission-exam/admission-exam.component';
import { AdmissionMarkHeadComponent } from './admission/admission-exam/admission-mark-head/admission-mark-head.component';
import { AdmissionMarkTeacherComponent } from './admission/admission-exam/admission-mark-teacher/admission-mark-teacher.component';
import { BatchComponent } from './admission/admission-setup/batch/batch.component';
import { AdmissionMarkEntryComponent } from './admission/admission-exam/admission-mark-entry/admission-mark-entry.component';
import { AdmissionMarkSubmissionComponent } from './admission/admission-exam/admission-mark-submission/admission-mark-submission.component';
import { AdmissionMarkApplicantComponent } from './admission/admission-exam/admission-mark-applicant/admission-mark-applicant.component';
import { AdmissionAttendanceComponent } from './admission/admission-exam/admission-attendance/admission-attendance.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { AdmissionFaqComponent } from './admission/admission-setup/admission-faq/admission-faq.component';
import { AdmissionProgramSeatComponent } from './admission/admission-setup/admission-program-seat/admission-program-seat.component';
import { AdmissionIntakeComponent } from './admission/admission-setup/admission-intake/admission-intake.component';
import {FilterPipeModule} from "ngx-filter-pipe";
import { AdmissionStudyCampusComponent } from './admission/admission-setup/admission-study-campus/admission-study-campus.component';
import { AdmissionCircularIntakeComponent } from './admission/admission-circular/admission-circular-intake/admission-circular-intake.component';
import {CustomProgramFilterPipe} from "./pipe/custom-program-filter.pipe";
import { AdmissionEmailTemplateComponent } from './admission/admission-setup/admission-email-template/admission-email-template.component';
import {DwtComponent} from "./components/dwt.component";
import {SafeurlPipe} from "./pipe/dwt/safeurl.pipe";
import {CallbackPipe} from "./pipe/dwt/callback.pipe";
import {DocumentComponent} from "./document-scan/document.component";
import { AdmissionStageComponent } from './admission/admission-stage/admission-stage.component';
import { EducationExpanseBarrierComponent } from './admission/application/step-two/education-expanse-barrier/education-expanse-barrier.component';
import { PersonalInformationComponent } from './admission/application/step-two/personal-information/personal-information.component';
import { EducationInformationComponent } from './admission/application/step-three/education-information/education-information.component';
import { ApplicantCreditTransferComponent } from './admission/application/step-four/applicant-credit-transfer/applicant-credit-transfer.component';
import { ApplicantReferenceComponent } from './admission/application/step-four/applicant-reference/applicant-reference.component';
import { ApplicantSpecialQuotaComponent } from './admission/application/step-four/applicant-special-quota/applicant-special-quota.component';
import { AdmissionEnrollmentComponent } from './admission/application/step-one/admission-enrollment/admission-enrollment.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import { AdmissionAdmitCardComponent } from './admission/application/step-one/admission-admit-card/admission-admit-card.component';
import { AdmissionReviewDocumentComponent } from './admission/application/step-one/admission-review-document/admission-review-document.component';
import { MembershipComponent } from './admission/application/step-one/membership/membership.component';
import {NgxSummernoteModule} from "ngx-summernote";
import { AdmissionLogComponent } from './admission/application/admission-log/admission-log.component';
import { PostOfficeComponent } from './admission/admission-setup/post-office/post-office.component';
import { NationalityComponent } from './admission/admission-setup/nationality/nationality.component';
import { EducationInstituteTypeComponent } from './admission/admission-setup/education-institute-type/education-institute-type.component';
import { EducationInstituteComponent } from './admission/admission-setup/education-institute/education-institute.component';
import { EducationMajorComponent } from './admission/admission-setup/education-major/education-major.component';
import { EducationSubjectComponent } from './admission/admission-setup/education-subject/education-subject.component';
import { EducationBoardComponent } from './admission/admission-setup/education-board/education-board.component';
import { ReferenceComponent } from './admission/admission-setup/add-reference/reference/reference.component';
import { ReferenceUnitComponent } from './admission/admission-setup/reference-unit/reference-unit.component';
import { ReferenceSubUnitComponent } from './admission/admission-setup/reference-sub-unit/reference-sub-unit.component';
import { AdmissionOfferComponent } from './admission/application/step-one/admission-offer/admission-offer.component';
import { AddReferenceUnitComponent } from './admission/admission-setup/add-reference/add-reference-unit/add-reference-unit.component';
import { DegreeComponent } from './admission/admission-setup/degree/degree.component';
import { AddReferenceSubUnitComponent } from './admission/admission-setup/add-reference/add-reference-sub-unit/add-reference-sub-unit.component';
import { StudentInformationComponent } from './student-information/student-information/student-information.component';
import { StudentAcademicInformationComponent } from './student-information/student-academic-information/student-academic-information.component';
import {
  AdmissionTestScheduleComponent
} from "./admission/admission-circular/admission-test-schedule/admission-test-schedule.component";
import {SumPipeModule} from "./pipe/sum.pipe";
import { AdmissionReportComponent } from './admission/admission-report/admission-report/admission-report.component';
import { AdmissionReportDateWiseComponent } from './admission/admission-report/admission-report-date-wise/admission-report-date-wise.component';
import { AdmissionReportFormFeeComponent } from './admission/admission-report/admission-report-form-fee/admission-report-form-fee.component';
import { AdmissionReportFormFeeSummeryComponent } from './admission/admission-report/admission-report-form-fee-summery/admission-report-form-fee-summery.component';
import { AdmissionWaiverCategoryComponent } from './admission/admission-setup/admission-waiver-category/admission-waiver-category.component';
import { AdmissionReportAdmitCardComponent } from './admission/admission-report/admission-report-admit-card/admission-report-admit-card.component';
import { AdmissionPersonWaiverComponent } from './admission/application/step-one/admission-person-waiver/admission-person-waiver.component';
import { StudentAddressComponent } from './student-information/student-address/student-address.component';
import { StudentPersonInformationComponent } from './student-information/student-person-information/student-person-information.component';
import { StudentEmergencyContactInformationComponent } from './student-information/student-emergency-contact-information/student-emergency-contact-information.component';
import { StudentVisaComponent } from './student-information/student-visa/student-visa.component';
import { StudentPassportComponent } from './student-information/student-passport/student-passport.component';
import { StudentEducationComponent } from './student-information/student-education/student-education.component';
import { StudentFamilyInformationComponent } from './student-information/student-family-information/student-family-information.component';
import { StudentBankComponent } from './student-information/student-bank/student-bank.component';
import { StudentSkillInformationComponent } from './student-information/student-skill-information/student-skill-information.component';
import { StudentJobExperienceInformationComponent } from './student-information/student-job-experience-information/student-job-experience-information.component';
import { StudentPublicationInformationComponent } from './student-information/student-publication-information/student-publication-information.component';
import { StudentAwardInformationComponent } from './student-information/student-award-information/student-award-information.component';
import { StudentResearchInformationComponent } from './student-information/student-research-information/student-research-information.component';
import { AdmissionTagTypeComponent } from './admission/admission-setup/admission-tag-type/admission-tag-type.component';
import { AdmissionTagComponent } from './admission/application/step-one/admission-tag/admission-tag.component';
import { AdmissionTestTemplateComponent } from './admission/admission-test/admission-test-template/admission-test-template.component';
import { AdmissionTestCategoryComponent } from './admission/admission-test/admission-test-category/admission-test-category.component';
import { AdmissionTestCommitteeComponent } from './admission/admission-test/admission-test-committee/admission-test-committee.component';
import { AdmissionTestApprovalRoleComponent } from './admission/admission-test/admission-test-approval-role/admission-test-approval-role.component';
import {
  AdmissionTestCommitteeRoleComponent
} from "./admission/admission-test/admission-test-committee-role/admission-test-committee-role.component";
import { AdmissionTestComponent } from './admission/admission-test/admission-test/admission-test.component';
import { AdmissionTestSubjectComponent } from './admission/admission-test/admission-test-subject/admission-test-subject.component';
import { AdmissionTestTemplateViewComponent } from './admission/admission-test/admission-test-template-view/admission-test-template-view.component';
import { AdmissionTemplateCategoryComponent } from './admission/admission-test/admission-template-category/admission-template-category.component';
import {
  AdmissionTemplateCategorySubjectComponent
} from "./admission/admission-test/admission-template-category-subject/admission-template-category-subject.component";
import { AdmissionTestTeacherComponent } from './admission/admission-test/admission-test-teacher/admission-test-teacher.component';
import { AdmissionTestCommitteeMemberComponent } from './admission/admission-test/admission-test-committee-member/admission-test-committee-member.component';
import { AdmissionTestApprovalMemberComponent } from './admission/admission-test/admission-test-approval-member/admission-test-approval-member.component';
import { AdmissionTestCommitteeViewComponent } from './admission/admission-test/admission-test-committee-view/admission-test-committee-view.component';
import { AdmissionTemplateCategoryViewComponent } from './admission/admission-test/admission-template-category-view/admission-template-category-view.component';
import { AdmissionTestViewComponent } from './admission/admission-test/admission-test-view/admission-test-view.component';
import { AdmissionTestApplicantEnrollComponent } from './admission/admission-test/admission-test-applicant-enroll/admission-test-applicant-enroll.component';
import { AdmissionTestMarkEntryComponent } from './admission/admission-test/admission-test-mark-entry/admission-test-mark-entry.component';


@NgModule({
  declarations: [
    AppComponent,
    DwtComponent,
    DocumentComponent,
    CallbackPipe,
    SafeurlPipe,
    LoginComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    DashboardComponent,
    StudentProfileComponent,
    StudentListComponent,
    PersonCreateComponent,
    // information tab
    StudentAddressInformationComponent,
    StudentEmergencyContactComponent,
    StudentVisaInformationComponent,
    StudentPassportInformationComponent,
    StudentBankInformationComponent,
    StudentEducationalInformationComponent,
    StudentSkillComponent,
    StudentJobExperienceComponent,
    StudentFamilyComponent,
    StudentPublicationComponent,
    StudentAwardComponent,
    StudentResearchComponent,
    StudentAcademicComponent,
    StudentLookUpComponent,
    AdmissionApplicationTypeComponent,
    AdmissionApplicationComponent,
    AdmissionMembershipOrganizationComponent,
    AdmissionChooseOptionComponent,
    AdmissionMembershipUserTypeComponent,
    AdmissionMembershipComponent,
    AdmissionAffiliateOrganizationComponent,
    AdmissionAffiliateUserTypeComponent,
    AdmissionAffiliateTypeComponent,
    AdmissionWaiverTypeComponent,
    AdmissionTestVenueComponent,
    AdmissionCircularComponent,
    AdmissionUserComponent,
    AdmissionCircularProgramComponent,
    AdmissionApplicationFormComponent,
    AdmissionPersonInformationComponent,
    AdmissionAddressInformationComponent,
    ApplicantSkillComponent,
    ApplicantProfessionalExperienceComponent,
    ApplicantEducationComponent,
    ApplicantAwardComponent,
    ApplicantAdmissionInformationComponent,
    ApplicantPassportComponent,
    ApplicantFamilyComponent,
    ApplicantLocalGuardianComponent,
    ApplicantOtherInformationComponent,
    AdmissionFormReviewComponent,
    AdmissionApplicationSubmittedUnderReviewComponent,
    AdmissionApplicationEnrollmentReviewComponent,
    AdmissionApplicationSelectedTestComponent,
    AdmissionApplicationSelectedApplicantComponent,
    AdmissionApplicationDocumentReviewComponent,
    AdmissionApplicationAdmittedApplicantComponent,
    AdmissionApplicationCreateComponent,
    AdmissionApplyComponent,
    AdmissionApplicationDocumentVerifyTypeComponent,
    AdmissionFeeComponent,
    AdmissionFeeDetailComponent,
    AdmissionEnrollmentTypeComponent,
    AdmissionApplicationNotSubmittedReviewComponent,
    AdmissionMarkTemplateComponent,
    AdmissionMarkDistributionComponent,
    AdmissionExamComponent,
    AdmissionMarkHeadComponent,
    AdmissionMarkTeacherComponent,
    BatchComponent,
    AdmissionMarkEntryComponent,
    AdmissionMarkSubmissionComponent,
    AdmissionMarkApplicantComponent,
    AdmissionAttendanceComponent,
    AdmissionFaqComponent,
    AdmissionProgramSeatComponent,
    AdmissionIntakeComponent,
    AdmissionStudyCampusComponent,
    AdmissionCircularIntakeComponent,
    AdmissionEmailTemplateComponent,
    AdmissionStageComponent,
    EducationExpanseBarrierComponent,
    PersonalInformationComponent,
    EducationInformationComponent,
    ApplicantCreditTransferComponent,
    ApplicantReferenceComponent,
    ApplicantSpecialQuotaComponent,
    AdmissionEnrollmentComponent,
    AdmissionAdmitCardComponent,
    AdmissionReviewDocumentComponent,
    MembershipComponent,
    AdmissionLogComponent,
    PostOfficeComponent,
    NationalityComponent,
    EducationInstituteTypeComponent,
    EducationInstituteComponent,
    EducationMajorComponent,
    EducationSubjectComponent,
    EducationBoardComponent,
    ReferenceComponent,
    ReferenceUnitComponent,
    ReferenceSubUnitComponent,
    AdmissionOfferComponent,
    AddReferenceUnitComponent,
    DegreeComponent,
    AddReferenceSubUnitComponent,
    StudentInformationComponent,
    StudentAcademicInformationComponent,
    AdmissionTestScheduleComponent,
    AdmissionReportComponent,
    AdmissionReportDateWiseComponent,
    AdmissionReportFormFeeComponent,
    AdmissionReportFormFeeSummeryComponent,
    AdmissionWaiverCategoryComponent,
    AdmissionReportAdmitCardComponent,
    AdmissionPersonWaiverComponent,
    StudentAddressComponent,
    StudentPersonInformationComponent,
    StudentEmergencyContactInformationComponent,
    StudentVisaComponent,
    StudentPassportComponent,
    StudentEducationComponent,
    StudentFamilyInformationComponent,
    StudentBankComponent,
    StudentSkillInformationComponent,
    StudentJobExperienceInformationComponent,
    StudentPublicationInformationComponent,
    StudentAwardInformationComponent,
    StudentResearchInformationComponent,
    AdmissionTagTypeComponent,
    AdmissionTagComponent,
    AdmissionTestTemplateComponent,
    AdmissionTestCategoryComponent,
    AdmissionTestCommitteeComponent,
    AdmissionTestApprovalRoleComponent,
    AdmissionTestCommitteeRoleComponent,
    AdmissionTestComponent,
    AdmissionTestSubjectComponent,
    AdmissionTestTemplateViewComponent,
    AdmissionTemplateCategoryComponent,
    AdmissionTemplateCategorySubjectComponent,
    AdmissionTestTeacherComponent,
    AdmissionTestCommitteeMemberComponent,
    AdmissionTestApprovalMemberComponent,
    AdmissionTestCommitteeViewComponent,
    AdmissionTemplateCategoryViewComponent,
    AdmissionTestViewComponent,
    AdmissionTestApplicantEnrollComponent,
    AdmissionTestMarkEntryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    EditorModule,
    NgxSummernoteModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    AppRoutingModule,
    FilterPipeModule,
    CustomProgramFilterPipe,
    SumPipeModule,

  ],
  providers: [{provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],}],
  bootstrap: [AppComponent]
})
export class AppModule { }
