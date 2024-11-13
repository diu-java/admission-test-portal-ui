import {Component, Input, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {
  ApplicantEducationalInformation
} from "../../../../model/admission/applicantInformation/applicantEducationalInformation";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {DegreeService} from "../../../../Service/common-setup/degree.service";
import {ApplicantDocumentService} from "../../../../Service/admission/application/applicantDocument.service";
import {ResultTypeService} from "../../../../Service/common-setup/resultType.service";
import {
  ApplicantEducationalInformationService
} from "../../../../Service/admission/application/applicantEducationalInformation.service";
import {ToastrService} from "ngx-toastr";
import {
  AdmissionCircularEducationLevelService
} from "../../../../Service/admission/admission-circular/admissionCircularEducationLevel.service";
import {EducationBoardService} from "../../../../Service/common-setup/educationBoard.service";
import {EducationMajorService} from "../../../../Service/common-setup/educationMajor.service";
import {EducationInstituteService} from "../../../../Service/common-setup/educationInstitute.service";
import {debounceTime, Subject} from "rxjs";
import {
  AdmissionEducationalDetailService
} from "../../../../Service/admission/application/admissionEducationalDetail.service";
import {AdmissionEducationalDetail} from "../../../../model/admission/applicantInformation/admissionEducationalDetail";
import {EducationSubjectService} from "../../../../Service/common-setup/educationSubject.service";
import {EducationalInformation} from "../../../../model/student/educationalInformation";

declare var $: any;
@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css']
})
export class ApplicantEducationComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('educationalInformationForm') form: NgForm | undefined;
  levelOfEducationId:any;
  isMajor:boolean =false;
  isBoard:boolean =false;
  isRegistration:boolean =false;
  isRoll:boolean =false;
  isMark:boolean =false;
  isCgpa:boolean =false;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isEducationView:boolean = false;
  degrees:any=[];
  boards:any=[];
  education_majors:any=[];
  education_boards:any=[];
  education_institutes:any=[];
  result_types:any=[];
  degreeId:any;
  years: number[] = [];
  applicantEducationalInformation:any = new ApplicantEducationalInformation();
  admissionEducationalDetail:any = new AdmissionEducationalDetail();
  admission_educational_details:any=[];
  admissionPerson:AdmissionPerson = new AdmissionPerson();
  admission_educational_informations:any=[];

  filteredInstitutes:any=[];
  loading:boolean = false;
  sMessage:string ='';
  certificateMessage:string ='';
  isOpenAttachment:boolean = false;
  isOpenCertificate:boolean = false;
  formSubmitted:boolean = false;
  educationDetailView:boolean = false;
  education_subjects:any=[];
  searchSubject = new Subject<string>();

  grades = [
    { code: 'A+', name: 'A+' },
    { code: 'A', name: 'A' },
    { code: 'A-', name: 'A-' },
    { code: 'B+', name: 'B+' },
    { code: 'B', name: 'B' },
    { code: 'B-', name: 'B-' },
    { code: 'C+', name: 'C+' },
    { code: 'C', name: 'C' },
    { code: 'D', name: 'D' },
    { code: 'F', name: 'F' }
  ];
  activeDetail: number = 0;
  transcriptFile: File | null = null;
  transcriptFileInvalid: boolean = false;

  certificateFile: File | null = null;
  certificateFileInvalid: boolean = false;

  constructor(private router: Router,
              private degreeService: DegreeService, private documentService: ApplicantDocumentService,
              private educationBoardService: EducationBoardService, private educationMajorService: EducationMajorService,
              private resultTypeService: ResultTypeService, private educationInstituteService: EducationInstituteService,
              private educationSubjectService: EducationSubjectService,
              private educationalDetailService: AdmissionEducationalDetailService,
              private service: ApplicantEducationalInformationService, private toastr: ToastrService) {
  }
  ngOnInit() {
    // this.getLevelOfEducation();
    this.getYear();
    this.getResultType();
    this.getAdmissionApplicationView();
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(searchTerm => {
      this.executeSearch(searchTerm);
    });

    this.documentService.isOpenFormView$.subscribe((status: boolean) => {
      this.isEducationView = status;
      if(status){
        this.isOpenCertificate = true;
        this.isOpenAttachment = true;
      }
    });
    const savedModelData = sessionStorage.getItem('modelData');
    let existingAttachments: any[] = JSON.parse(sessionStorage.getItem('attachmentData') || '[]');
    if (!Array.isArray(existingAttachments)) {
      existingAttachments = [];
    }
    if(savedModelData){
      let educationData = JSON.parse(savedModelData)
      this.applicantEducationalInformation = educationData;
      this.applicantEducationalInformation.levelOfEducationId = educationData?.levelOfEducationId;
      this.getDegree();
      this.applicantEducationalInformation.degreeId = educationData?.degreeId;
      this.getEducationMajor();
      this.applicantEducationalInformation.majorName = educationData.majorName;
      this.getEducationBoard();
      this.applicantEducationalInformation.boardId = educationData?.boardId;
      this.getEducationInstitute();
      this.applicantEducationalInformation.instituteName = educationData.instituteName;

      this.enableResult(educationData?.resultTypeId);
      this.applicantEducationalInformation.resultTypeId = educationData?.resultTypeId;

      existingAttachments.forEach((storedAttachment: any) => {
        if (storedAttachment?.name === 'Transcript') {
          this.applicantEducationalInformation.transcriptAttachmentId = storedAttachment.id;
          this.applicantEducationalInformation.transcriptAttachment = storedAttachment;
          this.isOpenAttachment = false;
        }else {
          this.isOpenAttachment = true;
        }
        if (storedAttachment?.name === 'Certificate') {
          this.applicantEducationalInformation.certificateAttachmentId = storedAttachment.id;
          this.applicantEducationalInformation.certificateAttachment = storedAttachment;
          this.isOpenCertificate = false;
        }else {
          this.isOpenCertificate = true;
        }
        if(this.applicantEducationalInformation.certificateAttachment && this.applicantEducationalInformation.transcriptAttachment){
          this.isOpenCertificate = false;
          this.isOpenAttachment = false;
        }
        let educationCheck = this.admissionApplication.admissionPersons[0].admissionEducationalInformations.findIndex((education:any)=>education.id === educationData?.id)
        if(educationCheck !== -1){
          this.isUpdateButton = true;
          this.isSaveButton = false;
        }else {
          this.isUpdateButton = false;
          this.isSaveButton = true;
        }
      });
      }
    sessionStorage.removeItem('modelData');
    sessionStorage.removeItem('attachmentData');
  }
  getAdmissionApplicationView(){
    // this.getAdmissionCircularEducationLevel(this.admissionApplication.admissionCircular.id);
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getEducationalInformation(person?.admissionEducationalInformations);
    })
  }

  formatNumber(item: any) {
    const numberValue = parseFloat(item);
    return isNaN(numberValue) ? '' : numberValue.toFixed(2);
  }

  educationView(){
    this.isEducationView = !this.isEducationView;
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isOpenAttachment = true;
    this.isOpenCertificate = true;
    this.formSubmitted = false;
    sessionStorage.removeItem('modelData');
    sessionStorage.removeItem('attachmentData');
  }
  // getAdmissionCircularEducationLevel(admissionCircularId:any){
  //   this.admissionCircularEducationLevelService.getAdmissionCircularEducationLevel(admissionCircularId).subscribe((response:any)=>{
  //     this.admission_circular_level_of_educations=response.data;
  //   })
  // }
  getYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear+1; i > currentYear - 75; i--) {
      this.years.push(i);
    }
  }
  getDegree(){

    this.degrees=[];
    this.education_majors=[];
    this.education_boards=[];
    // this.applicantEducationalInformation.degreeId=undefined;
    // this.applicantEducationalInformation.boardId=undefined;

    // this.applicantEducationalInformation.majorName=undefined;
    if(this.applicantEducationalInformation.levelOfEducationId){
      let levelOfEducationCircular = this.admissionApplication.admissionCircular.admissionCircularEducationLevels.filter((item: any) => item.levelOfEducation.id === this.applicantEducationalInformation.levelOfEducationId);
      this.isMajor = levelOfEducationCircular[0].levelOfEducation.isMajor;
      this.isBoard = levelOfEducationCircular[0].levelOfEducation.isBoard;
      this.isRoll = levelOfEducationCircular[0].levelOfEducation.isRoll;
      this.isRegistration = levelOfEducationCircular[0].levelOfEducation.isRegistration;
      this.degreeService.getDegreeActive(this.applicantEducationalInformation.levelOfEducationId).subscribe((response:any)=>{
        this.degrees=response.data.filter((item: any) => item.isVerify);
      })
    }else {
      this.toastr.warning('Invalid Degree');
    }
  }
  getEducationMajor(){
    this.education_majors=[];
    if(this.applicantEducationalInformation.degreeId){
      this.educationMajorService.getEducationMajorActive(this.applicantEducationalInformation.degreeId).subscribe((response:any)=>{
        this.education_majors = response.data;
      })
    }
  }
  isEditable(): (term: string) => { name: string } {
    return (term: string) => {
      return { name: term };
    };
  }
  onMajorChange(selectedMajor: any) {
    if (typeof selectedMajor === 'string') {
      this.applicantEducationalInformation.majorName = selectedMajor;
    } else {
      this.applicantEducationalInformation.majorName = selectedMajor?.name || '';
    }
  }
  getEducationBoard(){
    this.education_boards=[];
    // this.applicantEducationalInformation.boardId=undefined;

    if(this.applicantEducationalInformation.degreeId){
      this.educationBoardService.getEducationBoardActive(this.applicantEducationalInformation.degreeId).subscribe((response:any)=>{
        this.education_boards = response.data;
      })
    }
  }
  getEducationInstitute(){
    this.education_institutes=[];
    this.onSearchInstitute('');
    if(this.applicantEducationalInformation.levelOfEducationId){
      this.educationInstituteService.getEducationInstitute(this.applicantEducationalInformation.levelOfEducationId).subscribe((response:any)=>{
        if(response.status){
          this.education_institutes = response.data;
          this.filteredInstitutes = this.education_institutes.slice(0, 10);
        }else{
          this.education_institutes = [];
          this.filteredInstitutes = this.education_institutes.slice(0, 10);
        }
      })
    }
  }

  onSearchInstitute(searchTerm: string){
    this.searchSubject.next(searchTerm);
  }
  // executeSearch(searchTerm: string) {
  //   if (!searchTerm) {
  //     this.filteredInstitutes = this.education_institutes.slice(0, 10);
  //   } else {
  //     this.filteredInstitutes = this.education_institutes.filter((institute:any) =>
  //       institute.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }
  // }
  executeSearch(searchTerm: string) {
    if (!searchTerm) {
      this.filteredInstitutes = this.education_institutes.slice(0, 10);
    } else {
      const filteredResults = this.education_institutes.filter((institute: any) =>
        institute.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.filteredInstitutes = filteredResults.slice(0, 10);
    }
  }

  onInstituteChange(selectedInstitute: any) {
    if (typeof selectedInstitute === 'string') {
      this.applicantEducationalInformation.instituteName = selectedInstitute;
    } else {
      this.applicantEducationalInformation.instituteName = selectedInstitute?.name || '';
    }
  }
  getResultType(){
    this.resultTypeService.getResultTypeActive().subscribe((response:any)=>{
      this.result_types=response.data;
    })
  }
  enableResult(resultTypeId:any){
    this.resultTypeService.getResultTypeActive().subscribe((response:any)=>{
      let result = response.data.filter((item: any) => item.id === resultTypeId)
      this.isCgpa = result[0]?.isCgpa;
      this.isMark = result[0]?.isMark;
      if(!this.isCgpa){
        this.applicantEducationalInformation.cgpa = 0;
      }
      if(!this.isMark){
        this.applicantEducationalInformation.mark=0;
      }
    });
  }
  getEducationalInformation(admission_educational_information:any){
    this.admission_educational_informations = admission_educational_information.sort((a:any, b:any) => Number(b.id) - Number(a.id));
  }
  postEducationalInformation() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantEducationalInformation.admissionPersonId = this.admissionPerson.id;

    this.service.postEducationalInformation(this.applicantEducationalInformation).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.applicantEducationalInformation = new ApplicantEducationalInformation();
        this.form?.resetForm(this.applicantEducationalInformation);
        this.toastr.success(response.message);
        this.admission_educational_informations.push(response.data);
        this.admission_educational_informations.sort((a:any, b:any) => Number(b.id) - Number(a.id));
        this.isEducationView = false;
        sessionStorage.removeItem('modelData');
        sessionStorage.removeItem('attachmentData');
      }
    })
  }
  postDocument(event: any){
    const file:File = event.target.files[0];
    if (!file) {
      this.toastr.error('No file selected. Please choose a file.');
      return;
    }
    console.log(file.type)
    const maxSizeInBytes = 500 * 1024;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
    this.sMessage = '';
    if (file.size > maxSizeInBytes) {
      this.toastr.error('File size exceeds the maximum limit of 500 KB')

    }else if (!allowedTypes.includes(file.type)){
      this.toastr.error('File type not supported. Only PDF, PNG, JPEG, JPG files are allowed.');
    }
    else {
      this.documentService.postDocument(file,this.admissionPerson.id, 'Transcript', 'Transcript').subscribe((response:any)=>{
        if(response.status){
          // this.toastr.success(response.message);
          this.sMessage = response.message;
          this.applicantEducationalInformation.transcriptAttachmentId = response.data.id;
        }
      })
    }
  }
  postDocumentDum(event: any) {
    const file: File = event.target.files[0];
    this.transcriptFile = file; // Store the selected file

    const maxSizeInBytes = 500 * 1024; // 500 KB
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];

    this.sMessage = '';
    this.transcriptFileInvalid = false; // Reset validation state

    if (!file) {
      this.transcriptFileInvalid = true; // File not selected
      return;
    }

    if (file.size > maxSizeInBytes) {
      this.transcriptFileInvalid = true;
      this.toastr.error('File size exceeds the maximum limit of 500 KB');
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      this.transcriptFileInvalid = true;
      this.toastr.error('File type not supported. Only PDF, PNG, JPEG, and JPG files are allowed.');
      return;
    }

    this.documentService.postDocument(file, this.admissionPerson.id, 'Transcript', 'Transcript').subscribe(
      (response: any) => {
        if (response.status) {
          this.sMessage = response.message;
          this.applicantEducationalInformation.transcriptAttachmentId = response.data.id;
        } else {
          this.toastr.error('Failed to upload the document. Please try again.');
        }
      },
      (error) => {
        console.error('Error uploading document:', error);
        this.toastr.error('An error occurred while uploading the document.');
      }
    );
  }
  postCertificateDocumentDum(event: any) {
    const file: File = event.target.files[0];
    this.certificateFile = file; // Store the selected file

    const maxSizeInBytes = 500 * 1024; // 500 KB
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];

    this.sMessage = '';
    this.certificateFileInvalid = false; // Reset validation state

    if (!file) {
      this.certificateFileInvalid = true; // File not selected
      return;
    }

    if (file.size > maxSizeInBytes) {
      this.certificateFileInvalid = true;
      this.toastr.error('File size exceeds the maximum limit of 500 KB');
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      this.certificateFileInvalid = true;
      this.toastr.error('File type not supported. Only PDF, PNG, JPEG, and JPG files are allowed.');
      return;
    }

    this.documentService.postDocument(file, this.admissionPerson.id, 'Certificate', 'Certificate').subscribe(
      (response: any) => {
        if (response.status) {
          this.certificateMessage = response.message;
          this.applicantEducationalInformation.certificateAttachmentId = response.data.id;
        } else {
          this.toastr.error('Failed to upload the document. Please try again.');
        }
      },
      (error) => {
        console.error('Error uploading document:', error);
        this.toastr.error('An error occurred while uploading the document.');
      }
    );
  }

  postCertificateDocument(event: any){
    const file:File = event.target.files[0];
    const maxSizeInBytes = 500 * 1024;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
    this.certificateMessage = '';
    if (file.size > maxSizeInBytes) {
      this.toastr.error('File size exceeds the maximum limit of 500 KB')
    }else if (!allowedTypes.includes(file.type)){
      this.toastr.error('File type not supported. Only PDF, PNG, JPEG, JPG files are allowed.');
    }
    else {
      this.documentService.postDocument(file,this.admissionPerson.id, 'Certificate', 'Certificate').subscribe((response:any)=>{
        if(response.status){
          // this.toastr.success(response.message);
          this.certificateMessage = response.message;
          this.applicantEducationalInformation.certificateAttachmentId = response.data.id;
        }
      })
    }
  }
  getDocumentDownload(code:any, name:any, fileExtension:any){
    this.documentService.getDocument(code).subscribe((response:Blob)=>{
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        console.log(code)
        link.download = name+fileExtension;
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
  getDocument(code: any, name: string, fileExtension: string) {
    Swal.fire({
      title: 'Loading document...',
      text: 'Please wait...',
      didOpen: () => {
        Swal.showLoading();
      },
      showConfirmButton: false,
    });
    this.documentService.getDocument(code).subscribe(
      (response: Blob) => {
        if (!response) {
          Swal.close();
          return;
        }
        if (!(response instanceof Blob)) {
          Swal.close();
          this.toastr.error('The retrieved document is not valid.');
          return;
        }
        let blobType: string;
        switch (fileExtension.toLowerCase()) {
          case '.pdf':
            blobType = 'application/pdf';
            break;
          case '.jpg':
          case '.jpeg':
            blobType = 'image/jpeg';
            break;
          case '.png':
            blobType = 'image/png';
            break;
          case '.gif':
            blobType = 'image/gif';
            break;
          default:
            blobType = 'application/pdf';
            break;
        }
        const blob = new Blob([response], { type: blobType });
        const url = window.URL.createObjectURL(blob);
        let htmlContent: string;
        if (blobType  === 'application/pdf') {
          htmlContent = `<iframe src="${url}" width="100%" height="700px" frameborder="0"></iframe>`;
        } else if (blobType.startsWith('image/')) {
          htmlContent = `<img src="${url}" width="500px"/>`;
        } else {
          Swal.close();
          this.toastr.error('Unsupported file type.');
          return;
        }
        Swal.fire({
          title: name,
          html: htmlContent,
          width:'100%',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: 'Close',
          willClose: () => {
            window.URL.revokeObjectURL(url);
          },
        });
      },
      (error) => {
        console.error('File preview error:', error);
        Swal.close();
        this.toastr.error('Failed to preview the document');
      }
    );
  }
  editEducationalInformation(educational_information: any) {
    this.isEducationView = true;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isOpenAttachment =true;
    this.isOpenCertificate =true;
    this.sMessage = '';
    this.certificateMessage = '';
    $('.go_to_top').first().get(0).scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.applicantEducationalInformation = educational_information;
    this.formatNumber(this.applicantEducationalInformation.cgpa);
    this.formatNumber(this.applicantEducationalInformation.mark);
    this.formatNumber(this.applicantEducationalInformation.scale);
    this.applicantEducationalInformation.levelOfEducationId = educational_information.levelOfEducation.id;
    this.getDegree();
    this.applicantEducationalInformation.degreeId = educational_information.degree.id;
    this.getEducationMajor();
    this.applicantEducationalInformation.majorName = educational_information.majorName;
    this.getEducationBoard();
    this.applicantEducationalInformation.boardId = educational_information?.board?.id;
    this.getEducationInstitute();
    this.applicantEducationalInformation.instituteName = educational_information.instituteName;
    this.enableResult(educational_information.resultType.id);
    this.applicantEducationalInformation.resultTypeId = educational_information?.resultType?.id;
    if(educational_information.transcriptAttachment){
      this.isOpenAttachment =false;
      this.applicantEducationalInformation.transcriptAttachmentId = educational_information.transcriptAttachment.id;
    }else {
      this.isOpenAttachment =true;
    }
    if(educational_information.certificateAttachment){
      this.isOpenCertificate =false;
      this.applicantEducationalInformation.certificateAttachmentId = educational_information.certificateAttachment.id;
    }else {
      this.isOpenCertificate =true;
    }
  }

  putEducationalInformation() {
    console.log('hello update')
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    console.log('hello loading')
    this.applicantEducationalInformation.admissionPersonId = this.admissionPerson.id;
    this.service.putEducationalInformation(this.applicantEducationalInformation, this.applicantEducationalInformation.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.admission_educational_informations.findIndex((item: ApplicantEducationalInformation) => item.id === this.applicantEducationalInformation.id);
        this.admission_educational_informations[indexToUpdate] = response.data;
        this.applicantEducationalInformation = new ApplicantEducationalInformation();
        this.form?.resetForm(this.applicantEducationalInformation);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isEducationView = false;
        sessionStorage.removeItem('modelData');
        sessionStorage.removeItem('attachmentData');
      }
    })
  }

  cancelEducationalInformation() {
    this.applicantEducationalInformation = new ApplicantEducationalInformation();
    this.form?.resetForm(this.applicantEducationalInformation);
    this.isSaveButton = true;
    this.isEducationView = !this.isEducationView;
    this.formSubmitted = false;
    this.isMajor = false;
    this.isBoard = false;
    sessionStorage.removeItem('modelData');
    sessionStorage.removeItem('attachmentData');
  }

  deleteEducationalInformation(educational_information: any) {
    Swal.fire({
      title: 'Educational Information Delete',
      text: 'Are you want to delete this Educational Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteEducationalInformation(educational_information.id).subscribe((response:any) => {
          if(response.status){
            this.admission_educational_informations = this.admission_educational_informations.filter((item: any)  => item.id !== educational_information.id);
            console.log(this.admission_educational_informations);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  isOpenFile() {
    this.isOpenAttachment = true;
  }
  isOpenCertificateFile() {
    this.isOpenCertificate = true;
  }


  addEducationalDetail(degreeId:any,educationId: any) {
    this.activeDetail = educationId;
    this.educationDetailView = !this.educationDetailView;
    console.log(degreeId)
    // this.getEducationSubject(degreeId);
  }
  getEducationSubject(degreeId:any){
    this.educationSubjectService.getEducationSubjectActive(degreeId).subscribe((response:any)=>{
      this.education_subjects = response.data;
    })
  }
  getEducationSubjectDetail(subject:any){
    this.admission_educational_details = subject;
  }

  postEducationalDetail(admissionEducationalId:any) {
    this.admissionEducationalDetail.admissionEducationalId = admissionEducationalId;
    this.educationalDetailService.postEducationalDetail(this.admissionEducationalDetail).subscribe((response:any)=>{
      if(response.status){
        this.admissionApplication = new AdmissionEducationalDetail();
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_educational_informations.findIndex((item: any) => item.id === admissionEducationalId);
        this.admission_educational_informations[indexToUpdate].admissionEducationalDetails.push(response.data);
        this.educationDetailView = false;
      }
    })
  }

  cancelEducationalDetail() {
    this.admissionEducationalDetail = new AdmissionEducationalDetail();
    this.education_subjects=[];
    this.isSaveButton = true;
    this.educationDetailView = !this.educationDetailView;
    this.formSubmitted = false;
  }

  deleteEducationalDetail(admission_educational_detail: any, educationId:any) {
    Swal.fire({
      title: 'Subject Information Delete',
      text: 'Are you want to delete this Subject Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.educationalDetailService.deleteEducationalDetail(admission_educational_detail.id).subscribe((response:any) => {
          if(response.status){
            let indexToUpdate = this.admission_educational_informations.findIndex((item: any) => item.id === educationId);
            this.admission_educational_informations[indexToUpdate].admissionEducationalDetails = this.admission_educational_informations[indexToUpdate].admissionEducationalDetails.filter((item: any)  => item !== admission_educational_detail);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  formatName(name: any) {
    if (name) {
      const formattedName = name.split(' ').map((word: string) => {
        const parts = word.split('-').map((part: string) => {
          if (part.endsWith('.')) {
            return part;
          } else if (part.includes('.')) {
            return part.split('.').map((subPart: string) => subPart.toUpperCase()).join('.');
          } else {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          }
        });
        return parts.join('-');
      }).join(' ');
      return formattedName;
    }
  }
  safeStringify(obj: any) {
    const seen = new WeakSet();  // Keeps track of objects we've already seen
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return; // Skip cyclic reference
        }
        seen.add(value);
      }
      return value;
    });
  }
  getDocumentScanDemo(recordId:any,  education:EducationalInformation, name:any, moduleName:any, fileExtension:any,) {
    console.log(education)
    sessionStorage.setItem('modelData', this.safeStringify(education));
    this.router.navigate(['/document-scan',this.admissionApplication.id,recordId, name, moduleName, fileExtension]);
  }

}
