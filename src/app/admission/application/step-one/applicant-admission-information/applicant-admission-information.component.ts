import {ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionCircular} from "../../../../model/admission/admission-circular/admissionCircular";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {ApplicationMembership} from "../../../../model/admission/applicantInformation/applicationMembership";
import {
  AdmissionApplicationPayment
} from "../../../../model/admission/applicantInformation/admissionApplicationPayment";
import {ActivatedRoute, Router} from "@angular/router";
import {AdmissionApplicationService} from "../../../../Service/admission/admission/admissionApplication.service";
import {
  AdmissionCircularProgramService
} from "../../../../Service/admission/admission-circular/admissionCircularProgram.service";
import {FacultyService} from "../../../../Service/academic/institute/faculty.service";
import {
  AdmissionAffiliateTypeService
} from "../../../../Service/admission/admission-setup/admissionAffiliateType.service";
import {
  AdmissionApplicationTypeService
} from "../../../../Service/admission/admission-setup/admissionApplicationType.service";
import {
  AdmissionMembershipOrganizationService
} from "../../../../Service/admission/admission-setup/admissionMembershipOrganization.service";
import {LevelOfEducationService} from "../../../../Service/common-setup/levelOfEducation.service";
import {
  ApplicationProgramChooseService
} from "../../../../Service/admission/application/applicationProgramChoose.service";
import {
  AdmissionMembershipUserTypeService
} from "../../../../Service/admission/admission-setup/admissionMembershipUserType.service";
import {
  ApplicantMembershipInformationService
} from "../../../../Service/admission/application/applicantMembershipInformation.service";
import {
  AdmissionApplicationPaymentService
} from "../../../../Service/admission/application/admissionApplicationPayment.service";
import {ProgramTypeService} from "../../../../Service/academic/configuration/programType.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionTestVenueService} from "../../../../Service/admission/admission-setup/admissionTestVenue.service";
import {AdmissionAdmitCard} from "../../../../model/admission/applicantInformation/admissionAdmitCard";
import {SemesterTypeService} from "../../../../Service/academic/configuration/semesterType.service";
import {SemesterService} from "../../../../Service/academic/institute/semester.service";
import {AdmissionEnrollment} from "../../../../model/admission/applicantInformation/admissionEnrollment";
import {ProgramService} from "../../../../Service/academic/institute/program.service";
import {BatchService} from "../../../../Service/academic/batch.service";
import {AdmissionEnrollmentService} from "../../../../Service/admission/application/admissionEnrollment.service";
import {AdmissionAdmitCardService} from "../../../../Service/admission/application/admissionAdmitCard.service";
import {
  AdmissionApplicationDocumentVerifyTypeService
} from "../../../../Service/admission/admission-setup/admissionApplicationDocumentVerifyType.service";
import {
  AdmissionApplicationDocumentVerifyService
} from "../../../../Service/admission/application/admissionApplicationDocumentVerify.service";
import {
  AdmissionApplicationDocumentVerify
} from "../../../../model/admission/applicantInformation/admissionApplicationDocumentVerify";
import {
  AdmissionEnrollmentTypeService
} from "../../../../Service/admission/admission-setup/admissionEnrollmentType.service";
import {AdmissionFeeService} from "../../../../Service/admission/admission-setup/admissionFee.service";
import {AdmissionFeePayment} from "../../../../model/admission/applicantInformation/admissionFeePayment";
import {AdmissionFeePaymentService} from "../../../../Service/admission/application/admissionFeePayment.service";
import Swal from "sweetalert2";
import {ApplicantDocumentService} from "../../../../Service/admission/application/applicantDocument.service";
import {AdmissionStudyCampusService} from "../../../../Service/admission/admission-setup/admissionStudyCampus.service";
import {Gender} from "../../../../model/common-setup/gender";
import {Religion} from "../../../../model/common-setup/religion";
import {BloodGroup} from "../../../../model/common-setup/bloodGroup";
import {MaritalStatus} from "../../../../model/common-setup/maritalStatus";
import {Country} from "../../../../model/common-setup/country";
import {AddressType} from "../../../../model/common-setup/addressType";
import {Nationality} from "../../../../model/common-setup/nationality";
import {AdmissionCircularService} from "../../../../Service/admission/admission-circular/admissionCircular.service";

@Component({
  selector: 'app-applicant-admission-information',
  templateUrl: './applicant-admission-information.component.html',
  styleUrls: ['./applicant-admission-information.component.css']
})
export class ApplicantAdmissionInformationComponent implements OnInit {
  @ViewChild('membershipInformationForm') form: NgForm | undefined;
  @ViewChild('admissionPaymentForm') paymentForm: NgForm | undefined;
  @ViewChild('admissionFeePaymentForm') feeForm: NgForm | undefined;
  @ViewChild('admissionAdmitCardForm') admitCardForm: NgForm | undefined;
  @ViewChild('admissionDirectFrom') directAdmissionForm: NgForm | undefined;
  isDIU:boolean=false;
  admission_application_types:any=[];
  program_types:any=[];
  faculties:any=[];
  admission_membership_organizations:any=[];
  admission_affiliate_types:any=[];
  level_of_educations:any=[];
  years: number[] = [];
  admissionCircular:any=new AdmissionCircular();
  admission_circular_programs:any=[];
  admissionApplicationChooseOptionId:any;
  admissionApplication:any=new AdmissionApplication();
  admissionPerson:any=new AdmissionPerson();
  //education
  levelOfEducationId:any;
  isMajor:boolean =false;
  isBoard:boolean =false;
  isRegistration:boolean =false;
  isRoll:boolean =false;
  isMark:boolean =false;
  isCgpa:boolean =false;
  degreeId:any;
  application_payment:any;
  // Applicant Membership
  applicantMembership:any = new ApplicationMembership();
  admissionApplicationPayment:any = new AdmissionApplicationPayment();
  membership_types:any=[]
  membership:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  loading:boolean = false;
  enableChooseProgram:boolean = false;
  enablePayment:boolean = false;
  enableMembership:boolean = false;
  enableAdmission:boolean = true;
  enableAdmitCard:boolean = false;
  enableDirectAdmission:boolean = false;
  enableReviewDocument:boolean = false;
  enableAdmissionPayment:boolean = false;
  payment:any=[];
  test_venues:any=[];
  semesters:any=[];
  semester_types:any=[];
  programs:any=[];
  batches:any=[];
  application_document_verify_types:any=[];
  admission_application_document_verifies:any=[];
  enrollment_types:any=[];
  admission_fee_payment:any=[];
  admissionAdmitCard:any=new AdmissionAdmitCard();
  //Admission Enrollment
  admissionEnrollment:any = new AdmissionEnrollment();
  admissionApplicationDocumentVerify:any = new AdmissionApplicationDocumentVerify();
  admissionFeePayment:any = new AdmissionFeePayment();
  study_campuses:any=[];
  isAddressView:boolean = false;
  isApplicationInformation:boolean = true;
  notEligible:boolean = false;
  activeTab: number = 1;
  isAdmissionCircularView:boolean = false;
  admission_circulars:any=[];
  constructor(private route: ActivatedRoute, private service: AdmissionApplicationService, private admissionTestVenueService: AdmissionTestVenueService,
              private admissionCircularProgramService: AdmissionCircularProgramService, private admissionApplicationTypeService: AdmissionApplicationTypeService,
              private facultyService: FacultyService, private admissionMembershipOrganizationService: AdmissionMembershipOrganizationService,
              private admissionAffiliateTypeService: AdmissionAffiliateTypeService, private levelOfEducationService: LevelOfEducationService,
              private applicationProgramChooseService:ApplicationProgramChooseService,
              private admissionCircularService: AdmissionCircularService,
              private membershipTypeService: AdmissionMembershipUserTypeService, private batchService: BatchService,
              private applicantMembershipService: ApplicantMembershipInformationService, private admissionAdmitCardService: AdmissionAdmitCardService,
              private paymentService: AdmissionApplicationPaymentService, private programTypeService: ProgramTypeService, private toastr: ToastrService,
              private semesterTypeService: SemesterTypeService, private semesterService: SemesterService, private documentService: ApplicantDocumentService,
              private admissionApplicationDocumentVerifyTypeService: AdmissionApplicationDocumentVerifyTypeService, private admissionApplicationDocumentVerifyService: AdmissionApplicationDocumentVerifyService,
              private programService: ProgramService, private admissionEnrollmentService: AdmissionEnrollmentService, private admissionFeePaymentService: AdmissionFeePaymentService,
              private admissionFeeService: AdmissionFeeService, private admissionEnrollmentTypeService: AdmissionEnrollmentTypeService, private studyCampusService: AdmissionStudyCampusService,
  ) {
  }
  ngOnInit() {
    this.getAdmissionApplicationType();
    this.getProgramType();
    this.getFaculty();
    this.getMembershipOrganization();
    this.getAffiliateType();
    this.getYear();
    this.getMembershipType();
    this.getAdmissionTestVenue();
    this.getSemester();
    this.getSemesterType();
    this.getAdmissionApplicationDocumentVerifyType();
    this.getEnrollmentType();
    this.setCurrentDateTime();
    this.getAdmissionApplicationView();
    this.getStudyCampus();
    this.getAdmissionCircular();
    const savedTab = sessionStorage.getItem('activeTab');
    if (savedTab) {
      this.activeTab = parseInt(savedTab, 10);
    }
  }
  getAdmissionApplicationView(){
    this.loading = true;
    this.route.params.subscribe((params)=>{
      const admissionApplicationId = +params['id'];
      this.service.getViewAdmissionApplication(admissionApplicationId).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.admissionApplication = response.data;
          this.getApplicationProgramChoose();
          this.getAdmissionApplicationDocumentVerify(this.admissionApplication?.admissionApplicationDocumentVerifies);
          this.getAdmissionCircularProgram(this.admissionApplication.admissionCircular.id);
          this.getLevelOfEducation();
          this.getAdmissionFeePayment(this.admissionApplication.id);
          this.admissionApplication.admissionEnrollments.sort((a:any, b:any) => Number(b.id) - Number(a.id));
          this.admissionApplication.admissionPersons.forEach((person:any)=>{
            this.admissionPerson = person;
            this.getPersonInfo(person);
            this.getApplicantMembership(person?.admissionMemberships)
            if(person.photoAttachment){
              person.photoAttachment.file = this.getDocumentPhoto(person.photoAttachment);
            }
          })
        }else {
          this.loading = false;
        }
      });
    })
  }
  activateTab(tabName: number) {
    this.getAdmissionApplicationView();
    this.activeTab = tabName;
    sessionStorage.setItem('activeTab', tabName.toString());
  }
  getPersonInfo(person:any){
    person.gender = person.gender? person.gender: new Gender();
    person.religion = person.religion? person.religion: new Religion();
    person.bloodGroup = person.bloodGroup? person.bloodGroup: new BloodGroup();
    person.maritalStatus = person.maritalStatus? person.maritalStatus: new MaritalStatus();
    person.countryOfBirth = person.countryOfBirth? person.countryOfBirth: new Country();
    person.nationality = person.nationality? person.nationality: new Nationality();
    person.mailingAddress = person.mailingAddress? person.mailingAddress: new AddressType();
    // this.selectMaritalStatus(person.maritalStatus?.id);
    if(person.photoAttachment){
      person.photoAttachment.file = this.getDocumentPhoto(person.photoAttachment);
    }
    if(person.signatureAttachment){
      person.signatureAttachment.file = this.getDocumentPhoto(person.signatureAttachment);
    }
  }
  getProgressPercentage() {
    const totalSteps = 8;
    let completedSteps = 0;
    if (this.admissionApplication && this.admissionApplication.admissionPersons?.length > 0) {
      completedSteps += this.admissionApplication.status === 1 ? 1 : 0;
      completedSteps += this.admissionApplication.isAdmission ? 1 : 0;
      const person = this.admissionApplication.admissionPersons[0];
      completedSteps += person?.photoAttachment ? 1 : 0;
      completedSteps += person?.addressInformations.length > 0 ? 1 : 0;
      completedSteps += person?.admissionFamilies.length > 0 ? 1 : 0;
      completedSteps += person?.admissionEmergencyContacts.length > 0 ? 1 : 0;
      completedSteps += person?.admissionGroupInsurances.length > 0 ? 1 : 0;
      completedSteps += person?.admissionEducationalInformations.length > 0 ? 1 : 0;

    }
    return (completedSteps / totalSteps) * 110;
  }

  getStudyCampus(){
    this.studyCampusService.getStudyCampusActive().subscribe((response:any)=>{
      this.study_campuses = response.data;
    })
  }
  getDocumentPhoto(attachment:any){
    return this.documentService.getDocumentPhoto(attachment.code).subscribe((response:any)=>{
      attachment.file = response;
    })
  }
  getAdmissionCircularProgram(admissionCircularId:any){
    this.admissionCircularProgramService.getAdmissionCircularProgramCircular(admissionCircularId).subscribe((response:any)=>{
      this.admission_circular_programs = response.data;
    })
  }
  getApplicationPayment(admissionApplicationId: any){
    this.paymentService.getAdmissionApplicationPayment(admissionApplicationId).subscribe((response:any)=>{
      this.payment = response.data;
    })
  }
  getYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear+1; i > currentYear - 50; i--) {
      this.years.push(i);
    }
  }

  addAdmissionChooseOption(){
    if(this.admissionApplicationChooseOptionId){
      let agreement = this.admissionApplication.admissionCircular.admissionCircularPrograms.find((item: any) => item.id === this.admissionApplicationChooseOptionId);
      if(agreement.enableAgreement){
        Swal.fire({
          width: 600,
          title: agreement.program.name,
          html: agreement.agreementDetail,
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            let indexToUpdate = this.admissionApplication.admissionCircular.admissionCircularPrograms.findIndex((item: any) => item.id === this.admissionApplicationChooseOptionId);
            if(indexToUpdate !== -1){
              console.log(this.admissionApplication.admissionCircular.admissionCircularPrograms[indexToUpdate]);
              this.admissionApplication.admissionApplicationProgramChooses.push({admissionCircularProgram:this.admissionApplication.admissionCircular.admissionCircularPrograms[indexToUpdate]});
              console.log(this.admissionApplication.admissionApplicationProgramChooses);

              this.admissionApplication.admissionCircular.admissionCircularPrograms = this.admissionApplication.admissionCircular.admissionCircularPrograms.filter((item: any)  => item.id !== this.admissionApplicationChooseOptionId);
              console.log(this.admissionApplication.admissionApplicationProgramChooses);
              this.admissionApplicationChooseOptionId="";
              // this.toastr.success('Successfully Added');
            }
            // Do something on confirm
            Swal.fire('Confirmed!', 'Your action was successful.', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Do something on cancel
            Swal.fire('Cancelled', 'Your action was cancelled.', 'error');
          }
        });
      }else {
        let indexToUpdate = this.admissionApplication.admissionCircular.admissionCircularPrograms.findIndex((item: any) => item.id === this.admissionApplicationChooseOptionId);
        if(indexToUpdate !== -1){
          console.log(this.admissionApplication.admissionCircular.admissionCircularPrograms[indexToUpdate]);
          this.admissionApplication.admissionApplicationProgramChooses.push({admissionCircularProgram:this.admissionApplication.admissionCircular.admissionCircularPrograms[indexToUpdate]});
          console.log(this.admissionApplication.admissionApplicationProgramChooses);

          this.admissionApplication.admissionCircular.admissionCircularPrograms = this.admissionApplication.admissionCircular.admissionCircularPrograms.filter((item: any)  => item.id !== this.admissionApplicationChooseOptionId);
          console.log(this.admissionApplication.admissionApplicationProgramChooses);
          this.admissionApplicationChooseOptionId="";
          // this.toastr.success('Successfully Added');
        }
      }
    }else {
      this.toastr.error('Please Select Program First');
    }
  }

  deleteAdmissionChooseOption(admission_application_choose_option:any){
    this.admissionApplication.admissionCircular.admissionCircularPrograms.push(admission_application_choose_option.admissionCircularProgram);
    console.log(this.admissionApplication.admissionApplicationProgramChooses)
    this.admissionApplication.admissionApplicationProgramChooses = this.admissionApplication.admissionApplicationProgramChooses.filter((item: any)  => item.id !== admission_application_choose_option.id);
    // this.toastr.success('Successfully Deleted');
    console.log(this.admissionApplication.admissionApplicationProgramChooses);
  }
  getAdmissionApplicationType(){
    this.admissionApplicationTypeService.getApplicationType().subscribe((response:any)=>{
      this.admission_application_types = response.data;
    })
  }
  getProgramType(){
    this.programTypeService.getProgramTypeActive().subscribe((response:any)=>{
      this.program_types = response.data;
    })
  }
  getFaculty(){
    this.facultyService.getFacultyActive().subscribe((response:any)=>{
      this.faculties = response.data;
    })
  }
  getMembershipOrganization(){
    this.admissionMembershipOrganizationService.getMembershipOrganizationActive().subscribe((response:any)=>{
      this.admission_membership_organizations = response.data;
    })
  }
  getMembershipType(){
    this.membershipTypeService.getMembershipUserTypeActive().subscribe((response:any)=>{
      this.membership_types = response.data;
    })
  }
  getAffiliateType(){
    this.admissionAffiliateTypeService.getAffiliateTypeActive().subscribe((response:any)=>{
      this.admission_affiliate_types = response.data;
    })
  }
  getLevelOfEducation(){
    this.levelOfEducationService.getLevelOfEducation().subscribe((response:any)=>{
      this.level_of_educations=response.data;
    })
  }

  prepareDataForServer() {
    const preparedData = this.admissionApplication.admissionApplicationProgramChooses.map((option:any, index:any) => {
      return {
        admissionCircularProgramId: option.admissionCircularProgram.id,
        serialNumber: index + 1
      };
    });
    return preparedData;
  }
  postApplicationProgramChoose(){
    this.loading = true;
    const data:any = {
      admissionApplicationId : this.admissionApplication.id,
      active: true,
      programChooses: this.prepareDataForServer()
    }
    // this.admissionApplicationChooseOption = this.prepareDataForServer();
    this.applicationProgramChooseService.postApplicationProgramChoose(data).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
        this.getAdmissionApplicationView();
        this.enableChooseProgram = false;
        this.enableAdmission = true;
      }
    })
  }
  getApplicationProgramChoose(){
    this.admissionApplication.admissionApplicationProgramChooses.forEach((res:any)=>{
      this.admissionApplication.admissionCircular.admissionCircularPrograms = this.admissionApplication.admissionCircular.admissionCircularPrograms.filter((item:any) => item.id !== res.admissionCircularProgram.id)
    })
  }
  getApplicantMembership(applicant_membership:any){
    this.membership = applicant_membership;
    if(applicant_membership.length){
      this.applicantMembership.id = applicant_membership[0].id;
      this.applicantMembership.admissionMembershipOrganizationId = applicant_membership[0].admissionMembershipOrganization.id;
      this.applicantMembership.admissionMembershipUserTypeId = applicant_membership[0].admissionMembershipUserType.id;
      this.applicantMembership.code = applicant_membership[0].code;
      this.isUpdateButton = true;
      this.isSaveButton = false;
      this.isDIU = true;
    }
  }

  postApplicantMembership() {
    this.loading = true;
    this.applicantMembership.admissionPersonId = this.admissionPerson.id;
    this.applicantMembership.active = true;
    this.applicantMembershipService.postMembershipInformation(this.applicantMembership).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.isUpdateButton = true;
        this.isSaveButton = false;
        this.isDIU = true;
        this.toastr.success(response.message);
        this.getAdmissionApplicationView();
        this.enableMembership = false;
      }
    })
  }

  putApplicantMembership(id:any) {
    this.loading = true;
    this.applicantMembership.admissionPersonId = this.admissionPerson.id;
    this.applicantMembership.active = true;
    this.applicantMembershipService.putMembershipInformation(this.applicantMembership, id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.toastr.success(response.message);
        this.enableMembership = false;
        this.getAdmissionApplicationView();
      }
    })
  }

  setCurrentDateTime() {
    const now = new Date();
    now.setHours(now.getHours() + 6);
    this.admissionFeePayment.paymentDate = now.toISOString().slice(0, 16);
    this.admissionApplicationPayment.paymentDate = now.toISOString().slice(0, 16);
    this.admissionEnrollment.deadline = now.toISOString().slice(0, 10);
  }
  getAdmissionFeePayment(admissionApplicationId:any){
    this.admissionFeePaymentService.getAdmissionFeePayment(admissionApplicationId).subscribe((response:any)=>{
      this.admission_fee_payment = response.data;
    })
  }
  postAdmissionFeePayment() {
    this.loading = true;
    this.admissionFeePayment.admissionApplicationId = this.admissionApplication.id;
    this.admissionFeePayment.paymentTypeId = 2;
    this.admissionFeePayment.paymentGatewayId = 2;
    this.admissionFeePayment.status = 1;
    this.admissionFeePaymentService.postAdmissionFeePayment(this.admissionFeePayment).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message)
        this.getAdmissionApplicationView();
        this.enableAdmission = true;
        this.enableAdmissionPayment = false;
      }
    })
  }
  postAdmissionApplicationPayment() {
    this.loading = true;
    this.admissionApplicationPayment.admissionApplicationId = this.admissionApplication.id;
    this.admissionApplicationPayment.paymenTypeId = 2;
    this.admissionApplicationPayment.paymentGatewayId = 2;
    this.admissionApplicationPayment.status = 1;
    // this.admissionApplicationPayment.redirectUrl =currentUrl
    this.paymentService.postAdmissionApplicationPayment(this.admissionApplicationPayment).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message)
        this.getAdmissionApplicationView();
        this.enableAdmission = true;
        this.enableAdmissionPayment = false;
      }
    })
  }

  editPayment() {
    this.enablePayment = true;
    this.enableAdmission = false;
  }
  editProgramChoose() {
    this.enableChooseProgram = true;
    this.enableAdmission = false;

  }
  cancelApplicationProgramChoose() {
    this.enableChooseProgram = false;
    this.enableAdmission = true;

  }
  editMembership() {
    this.enableMembership = true;
    this.isDIU = true;
  }
  openAdmitCard() {
    this.enableAdmitCard = !this.enableAdmitCard;
    this.enableAdmission = false;
  }
  getAdmissionTestVenue(){
    this.admissionTestVenueService.getTestVenueActive().subscribe((response:any)=>{
      this.test_venues = response.data;
    })
  }
  getEnrollmentType(){
    this.admissionEnrollmentTypeService.getAdmissionEnrollmentTypeActive().subscribe((response:any)=>{
      this.enrollment_types = response.data;
    })
  }
  openDirectAdmission() {
    this.enableDirectAdmission = !this.enableDirectAdmission;
    this.admissionEnrollment.admissionEnrollmentTypeId = this.enrollment_types[0]?.id;
    this.admissionEnrollment.semesterId = this.admissionApplication.semester.id;
    this.admissionEnrollment.semesterTypeId = this.admissionApplication.semesterType.id;
    this.admissionEnrollment.facultyId = this.admissionApplication.admissionCircular.faculty.id;
    this.admissionEnrollment.studyCampusId = 1;
    this.admissionApplication.admissionApplicationProgramChooses.forEach((item:any)=>{
      this.admissionEnrollment.programId = item.admissionCircularProgram.program.id;
    })
    this.getProgram(this.admissionEnrollment.facultyId);
    // this.getAdmissionFee(this.admissionEnrollment.semesterId, this.admissionEnrollment.semesterTypeId, this.admissionEnrollment.programId)
    this.getBatchSearch(this.admissionEnrollment.semesterId, this.admissionEnrollment.programId);
    this.getAdmissionFee(this.admissionEnrollment.semesterId, this.admissionEnrollment.semesterTypeId, this.admissionEnrollment.programId)
    this.enableAdmission = false;
  }
  getSemester(){
    this.batches=[];
    this.semesterService.getSemesterActive().subscribe((response:any)=>{
      this.semesters = response.data;
    })
  }
  getSemesterType(){
    this.semesterTypeService.getSemesterTypeActive().subscribe((response:any)=>{
      this.semester_types = response.data;
    })
  }
  getProgram(facultyId:any){
    this.programService.getProgramFaculty(facultyId).subscribe((response:any)=>{
      this.programs = response.data;
    })
  }
  getBatchSearch(semesterId:any, programId:any){
    this.batches=[];
    this.admissionEnrollment.batchId = undefined;
    if(semesterId && programId){
      this.batchService.getBatchSearch(semesterId, programId).subscribe((response:any)=>{
        this.batches = response.data;
      })
    }else {
      this.toastr.warning('Invalid Program or Semester');
    }
  }

  openReviewDocument() {
    console.log(this.enableAdmitCard)
    this.enableReviewDocument = !this.enableReviewDocument;
    this.enableAdmission = false;
    this.enableAdmitCard = false;
  }

  cancelAdmissionApplicationPayment() {
    this.enableAdmissionPayment = false;
    this.enablePayment = false;
    this.admissionApplicationPayment = new AdmissionApplicationPayment();
    this.enableAdmission = true;
  }

  postAdmissionAdmitCard() {
    this.loading = true;
    this.admissionAdmitCard.admissionApplicationId = this.admissionApplication.id;
    this.admissionAdmitCardService.postAdmissionAdmitCard(this.admissionAdmitCard).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
        this.getAdmissionApplicationView();
        this.enableAdmitCard = false;
        this.enableAdmission = true;
      }
    })
  }

  cancelAdmissionAdmitCard() {
    this.enableAdmitCard = false;
    this.admissionAdmitCard = new AdmissionAdmitCard();
    this.enableAdmission = true;
  }
  getAdmissionFee(semesterId:any, semesterTypeId:any, programId:any){
    this.admissionFeeService.getAdmissionFeeAmount(semesterId, semesterTypeId, programId).subscribe((response:any)=>{
      // this.admission_fee = response.data;
      this.admissionEnrollment.payableAmount = response.data?.amount;
      this.admissionEnrollment.admissionFee = response.data?.amount;

    })
  }

  postAdmissionEnrollment() {
    this.loading = true;
    this.admissionEnrollment.admissionApplicationId = this.admissionApplication.id;
    this.admissionEnrollment.admissionEnrollmentTypeId = 1;
    this.admissionEnrollment.status = 0;
    this.admissionEnrollmentService.postAdmissionEnrollment(this.admissionEnrollment).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
        this.getAdmissionApplicationView();
        this.enableDirectAdmission = false;
        this.enableAdmission = true;
      }
    })
  }

  cancelAdmissionEnrollment() {
    this.enableDirectAdmission = false;
    this.enableAdmission = true;
    this.admissionEnrollment = new AdmissionEnrollment();
  }
  getAdmissionApplicationDocumentVerifyType(){
    this.admissionApplicationDocumentVerifyTypeService.getAdmissionApplicationDocumentVerifyType().subscribe((response:any)=>{
      this.application_document_verify_types = response.data;
      this.application_document_verify_types.forEach((item:any) => {
        const selected = this.admission_application_document_verifies.some((documentVerify: any) => documentVerify.admissionDocumentVerifyType.id === item.id);
        item.selected = selected;
      });
    })
  }
  getAdmissionApplicationDocumentVerify(admissionApplication:any){
    this.admission_application_document_verifies = admissionApplication;
    this.application_document_verify_types.forEach((item:any) => {
      const selected = this.admission_application_document_verifies.some((type: any) => type.admissionDocumentVerifyType.id === item.id);
      item.selected = selected;
    });
  }

  postAdmissionApplicationDocumentVerify(application_document_verify_type: any) {
    this.loading = true;
    const selected = this.admission_application_document_verifies.some((application_document_verify: any) => application_document_verify.admissionDocumentVerifyType.id === application_document_verify_type.id);
    console.log(selected)
    if(selected === false){
      this.admissionApplicationDocumentVerify.admissionApplicationId = this.admissionApplication.id;
      this.admissionApplicationDocumentVerify.admissionDocumentVerifyTypeId = application_document_verify_type.id;
      this.admissionApplicationDocumentVerifyService.postAdmissionApplicationDocumentVerify(this.admissionApplicationDocumentVerify).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.toastr.success(response.message);
          this.admission_application_document_verifies.push(response.data);
        }
      })
    }else if(selected === true){
      const applicationDocumentVerifyId = this.admission_application_document_verifies.find((item:any)=> item.admissionDocumentVerifyType.id === application_document_verify_type.id);
      this.admissionApplicationDocumentVerifyService.deleteAdmissionApplicationDocumentVerify(applicationDocumentVerifyId.id).subscribe((res:any)=>{
        this.loading = false;
        if(res.status){
          this.admission_application_document_verifies = this.admission_application_document_verifies.filter((item: any)  => item !== applicationDocumentVerifyId.id);
          this.admission_application_document_verifies = [];
        }
      })
    }
  }

  submitApplication(status:any) {
    Swal.fire({
      title: 'Application',
      text: 'Please Confirm',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.loading = true;
        this.admissionApplication.status = status
        this.service.submitAdmissionApplication(this.admissionApplication).subscribe((response:any) => {
          this.loading = false;
          if(response.status){
            this.toastr.success(response.message);
            this.getAdmissionApplicationView();
          }else {
            this.getAdmissionApplicationView();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  cancelApplication() {
    Swal.fire({
      title: 'Cancel Application',
      text: 'Are you want to Cancel this Application.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.cancelAdmissionApplication(this.admissionApplication.id).subscribe((response:any) => {
          if(response.status){
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  cancelDocumentReview() {
    this.enableReviewDocument = !this.enableReviewDocument;
    this.enableAdmission = true;
  }

  makeAdmissionFee(admission_enrollment:any) {
    this.admissionFeePayment.amount = admission_enrollment?.payableAmount;
    this.admissionFeePayment.payableAmount = admission_enrollment?.payableAmount;
    this.admissionFeePayment.paymentStatus = admission_enrollment?.paymentStatus;
    this.admissionFeePayment.admissionFee = admission_enrollment?.admissionFee;
    this.enableAdmissionPayment = true;
    this.enableAdmission = false;
  }

  getAdmissionFullForm2() {
    this.service.getAdmissionFullForm(this.admissionApplication.id).subscribe((response:Blob)=>{
        this.loading = false;
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'admission_form_'+this.admissionApplication.id+'.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('File download error:', error);
      }
    )
  }
  getAdmissionFullForm() {
    Swal.fire({
      title: 'Loading document...',
      text: 'Please wait...',
      didOpen: () => {
        Swal.showLoading();
      },
      showConfirmButton: false,
    });
    this.service.getAdmissionFullForm(this.admissionApplication.id).subscribe(
      (response: Blob) => {
        this.loading = false; // Stop loading
        if (!response) {
          this.toastr.error('No document retrieved.');
          return;
        }
        const contentType = response.type || 'application/octet-stream'; // Fallback to 'application/octet-stream'
        const blob = new Blob([response], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        let htmlContent: string;
        // Prepare content based on the MIME type
        if (contentType === 'application/pdf') {
          htmlContent = `<iframe src="${url}" width="100%" height="700px" frameborder="0"></iframe>`;
        } else if (contentType.startsWith('image/')) {
          htmlContent = `<img src="${url}" width="100%"/>`;
        } else {
          this.toastr.error('Unsupported file type for preview.');
          window.URL.revokeObjectURL(url); // Clean up URL if unsupported type
          return;
        }
        // Show the document in a modal
        Swal.fire({
          title: 'Full Form',
          html: htmlContent,
          width: '100%',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: 'Close',
          willClose: () => {
            // Revoke the object URL when the modal closes
            window.URL.revokeObjectURL(url);
          },
        });
      },
      (error) => {
        this.loading = false; // Stop loading
        console.error('File preview error:', error);
        this.toastr.error('Failed to preview the document.');
      }
    );
  }
  getAdmissionShortForm2() {
    this.service.getAdmissionShortForm(this.admissionApplication.id).subscribe((response:Blob)=>{
        this.loading = false;
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'admission_form_'+this.admissionApplication.id+'.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('File download error:', error);
      }
    )
  }
  getAdmissionShortForm() {
    Swal.fire({
      title: 'Loading document...',
      text: 'Please wait...',
      didOpen: () => {
        Swal.showLoading();
      },
      showConfirmButton: false,
    });
    this.service.getAdmissionShortForm(this.admissionApplication.id).subscribe(
      (response: Blob) => {
        this.loading = false; // Stop loading
        if (!response) {
          this.toastr.error('No document retrieved.');
          return;
        }
        const contentType = response.type || 'application/octet-stream'; // Fallback to 'application/octet-stream'
        const blob = new Blob([response], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        let htmlContent: string;
        // Prepare content based on the MIME type
        if (contentType === 'application/pdf') {
          htmlContent = `<iframe src="${url}" width="100%" height="700px" frameborder="0"></iframe>`;
        } else if (contentType.startsWith('image/')) {
          htmlContent = `<img src="${url}" width="100%"/>`;
        } else {
          this.toastr.error('Unsupported file type for preview.');
          window.URL.revokeObjectURL(url); // Clean up URL if unsupported type
          return;
        }
        // Show the document in a modal
        Swal.fire({
          title: 'Short Form',
          html: htmlContent,
          width: '100%',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: 'Close',
          willClose: () => {
            // Revoke the object URL when the modal closes
            window.URL.revokeObjectURL(url);
          },
        });
      },
      (error) => {
        this.loading = false; // Stop loading
        console.error('File preview error:', error);
        this.toastr.error('Failed to preview the document.');
      }
    );
  }

  getAdmitCard(admit_card:any) {
    this.admissionAdmitCardService.getAdmissionAdmitCardPDF(this.admissionApplication.id).subscribe((response:Blob)=>{
        this.loading = false;
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'admit_card_'+this.admissionApplication.id+'.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('File download error:', error);
      }
    )
  }
  sendAdmitCard(admitCardId:any) {
    Swal.fire({
      title: 'Send Email',
      text: 'Are you want to send Email.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionAdmitCardService.sendAdmissionAdmitCard(admitCardId).subscribe((response:any) => {
          if(response.status){
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  sendAdmissionEnrollment(enrollmentId:any) {
    Swal.fire({
      title: 'Send Email',
      text: 'Are you want to send Email.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionEnrollmentService.sendAdmissionEnrollment(enrollmentId).subscribe((response:any) => {
          if(response.status){
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  cancelEnrollment(enrollmentId: any) {
    Swal.fire({
      title: 'Withdraw Admission Enrollment',
      text: 'Are you want to Withdraw Admission Enrollment.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionEnrollment.admissionApplicationId = this.admissionApplication.id;
        this.admissionEnrollment.admissionEnrollmentTypeId = enrollmentId?.admissionEnrollmentType.id;
        this.admissionEnrollment.semesterId = enrollmentId?.semester.id;
        this.admissionEnrollment.semesterTypeId = enrollmentId?.semesterType.id;
        this.admissionEnrollment.facultyId = enrollmentId?.faculty.id;
        this.admissionEnrollment.programId = enrollmentId?.program.id;
        this.admissionEnrollment.batchId = enrollmentId?.batch.id;
        this.admissionEnrollment.studyCampusId = enrollmentId?.studyCampus.id;
        this.admissionEnrollment.deadline = enrollmentId?.deadline;
        this.admissionEnrollment.payableAmount = enrollmentId?.payableAmount;
        this.admissionEnrollment.active = true;
        this.admissionEnrollment.status = 2;
        this.admissionEnrollmentService.putAdmissionEnrollment(this.admissionEnrollment, enrollmentId.id).subscribe((response:any) => {
          if(response.status){
            this.toastr.success(response.message);
            this.getAdmissionApplicationView();
            this.admissionEnrollment = new AdmissionEnrollment();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }


  getAddressInformation(componentName:any) {
    this.isApplicationInformation = componentName;
  }
  cancelMembership() {
    this.enableMembership = false;
  }

  getAdmissionCircular(){
    this.admissionCircularService.getAdmissionCircularActive().subscribe((response:any)=>{
      this.admission_circulars = response.data;
    })
  }
  changeAdmissionCircular(admission_application:any) {
    this.isAdmissionCircularView = true;
    this.admissionApplication = admission_application;
    this.admissionApplication.admissionCircularId = admission_application.admissionCircular.id;
    this.enableAdmission = false;
  }

  changeAdmissionCircularSave() {
    this.loading = true;
    if(this.admissionApplication.admissionCircular.id !== this.admissionApplication.admissionCircularId){
      this.service.putAdmissionApplication(this.admissionApplication, this.admissionApplication.id).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.toastr.success(response.message);
          this.getAdmissionApplicationView();
          this.isAdmissionCircularView = false;
          this.enableAdmission = true;
        }
      })
    }else {
      this.loading = false;
      this.isAdmissionCircularView = false;
      this.enableAdmission = true;
    }

  }

  cancelChangeAdmissionCircularSave() {
    this.isAdmissionCircularView = false;
    this.enableAdmission = true;
  }
  updateApplicationView(){
    this.getAdmissionApplicationView();
  }
}
