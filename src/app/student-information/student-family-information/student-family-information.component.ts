import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdmissionApplication} from "../../model/admission/admission/admissionApplication";
import {NgForm} from "@angular/forms";
import {AdmissionPerson} from "../../model/admission/admission/admissionPerson";
import {ApplicantFamily} from "../../model/admission/applicantInformation/applicantFamily";
import {ApplicantFamilyService} from "../../Service/admission/application/applicantFamily.service";
import {RelationService} from "../../Service/common-setup/relation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ApplicantDocumentService} from "../../Service/admission/application/applicantDocument.service";
import Swal from "sweetalert2";
import {PersonInformationService} from "../../Service/student/personInformation.service";
import {StudentFamilyService} from "../../Service/student/studentFamily.service";
import {StudentInformation} from "../../model/student/studentInformation";
import {Family} from "../../model/student/family";

@Component({
  selector: 'app-student-family-information',
  templateUrl: './student-family-information.component.html',
  styleUrls: ['./student-family-information.component.css']
})
export class StudentFamilyInformationComponent implements OnInit{
  @Input() studentInformation:any = new StudentInformation();
  @ViewChild('familyForm') form: NgForm | undefined;
  family:any = new Family();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isFamilyView:boolean = false;
  loading:boolean = false;
  families:any=[];
  relations:any=[];
  formSubmitted: boolean = false;
  isOpenAttachment: boolean = false;
  sMessage:string='';
  occupations=[{id: 1, name:'Public Service'}, {id: 2, name:'Private Service'}, {id: 3, name:'Working Abroad'}, {id: 4, name:'Landlord'},
    {id: 5, name:'Actor'}, {id: 6, name:'Actress'}, {id: 7, name:'Housewife'}, {id: 7, name:'Actress'},{id: 8, name:'Farmer'},{id: 9, name:'Own Business'},{id: 10, name:'Student'},{id: 11, name:'Politician'},
    {id: 12, name:'Journalist'},{id: 13, name:'Retired'}
  ];
  disabledOccupations = ['Landlord', 'Actor', 'Actress','Housewife','Farmer','Student','Politician'];

  educations = [
    { code: 'PhD', name: 'PhD' },
    { code: "Master's", name: "Master's" },
    { code: "Bachelor's", name: "Bachelor's" },
    { code: 'HSC', name: 'HSC' },
    { code: 'SSC', name: 'SSC' },
    { code: 'Below SSC', name: 'Below SSC' }
  ];
  constructor(private router: Router,private documentService: ApplicantDocumentService,
              private route: ActivatedRoute,
              private toastr: ToastrService, private relationService: RelationService, private familyService: StudentFamilyService
              ) {}
  ngOnInit() {
    this.getPersonInformationView();
    this.getRelation();
    // this.documentService.isOpenFormView$.subscribe((status: boolean) => {
    //   this.isFamilyView = status;
    //   if(status){
    //     this.isOpenAttachment = true;
    //   }
    // });
    // const savedModelData = sessionStorage.getItem('modelData');
    // let existingAttachments: any[] = JSON.parse(sessionStorage.getItem('attachmentData') || '[]');
    // if (!Array.isArray(existingAttachments)) {
    //   existingAttachments = [];
    // }
    // if(savedModelData){
    //   let familyData = JSON.parse(savedModelData)
    //   this.family = familyData;
    //   existingAttachments.forEach((storedAttachment: any) => {
    //     if (storedAttachment?.name === 'Family') {
    //       this.family.nidAttachmentId = storedAttachment.id;
    //       this.family.nidAttachment = storedAttachment;
    //       this.isOpenAttachment = false;
    //     }else {
    //       this.isOpenAttachment = true;
    //     }
    //
    //     let familyCheck = this.admissionApplication.admissionPersons[0].admissionFamilies.findIndex((family:any)=>family.id === familyData?.id)
    //     if(familyCheck !== -1){
    //       this.isUpdateButton = true;
    //       this.isSaveButton = false;
    //     }else {
    //       this.isUpdateButton = false;
    //       this.isSaveButton = true;
    //     }
    //   });
    // }
    // sessionStorage.removeItem('modelData');
    // sessionStorage.removeItem('attachmentData');
  }
  getPersonInformationView(){
    this.getFamily(this.studentInformation.studentPerson.id);
    // this.route.params.subscribe((params)=>{
    //   const personId = +params['id'];
    //   this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
    //     this.personInformation = response.data;
    //     this.getFamily(this.personInformation.id);
    //   });
    // });
  }
  postDocument(event: any){
    const file:File = event.target.files[0];
    console.log(file.type)
    const maxSizeInBytes = 500 * 1024;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
    this.sMessage = '';
    if (file.size > maxSizeInBytes) {
      // this.nidMessage = `File size exceeds the maximum limit of ${maxSizeInMB}MB.`;
      this.toastr.error('File size exceeds the maximum limit of 500 KB')

    }else if (!allowedTypes.includes(file.type)){
      this.toastr.error('File type not supported. Only PDF, PNG, JPEG, JPG files are allowed.');
    }
    else {
      this.documentService.postDocument(file,this.family.studentPersonId, 'Family', 'Family').subscribe((response:any)=>{
        if(response.status){
          this.sMessage = response.message;
          this.family.nidAttachmentId = response.data.id;
        }
      })
    }
  }
  isOpenFile() {
    this.isOpenAttachment = true;
  }
  getDocument(code:any, name:any, fileExtension:any){
    this.documentService.getDocument(code).subscribe((response:Blob)=>{
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
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
  isDesignationDisabled(): boolean {
    return this.disabledOccupations.includes(this.family.occupation);
  }

  getRelation(){
    this.relationService.getRelationActive().subscribe((response:any)=>{
      this.relations = response.data;
    })
  }
  getFamily(personId:any){
    this.familyService.getFamily(personId).subscribe((response:any)=>{
      this.families = response.data;
    })
  }

  postFamilyInformation() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.family.studentPersonId = this.studentInformation.studentPerson.id;
    this.familyService.postFamily(this.family).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.isUpdateButton = true;
        this.isSaveButton = false;
        this.toastr.success(response.message);
        this.families.push(response.data);
        this.isFamilyView = false;
        this.family = new Family();
        this.form?.resetForm(this.family);
        sessionStorage.removeItem('modelData');
        sessionStorage.removeItem('attachmentData');
      }
    })

  }
  putFamilyInformation() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.family.studentPersonId = this.studentInformation.studentPerson.id;
    this.familyService.putFamily(this.family, this.family.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.isUpdateButton = true;
        this.isSaveButton = false;
        this.toastr.success(response.message);
        this.isFamilyView = false;
        this.family = new Family();
        this.form?.resetForm(this.family);
        sessionStorage.removeItem('modelData');
        sessionStorage.removeItem('attachmentData');
      }
    })
  }

  familyView() {
    this.isFamilyView = !this.isFamilyView;
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isOpenAttachment = true;
    this.formSubmitted = false;
  }

  cancelFamilyInformation() {
    this.family = new Family();
    this.form?.resetForm(this.family);
    this.isSaveButton = true;
    this.isFamilyView = !this.isFamilyView;
    this.formSubmitted = false;
    sessionStorage.removeItem('modelData');
    sessionStorage.removeItem('attachmentData');
  }

  editFamilyInformation(family_information: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isFamilyView = true;
    this.family = family_information;
    this.family.relationId = family_information.relation.id;
    if(family_information.nidAttachment){
      this.isOpenAttachment =false;
      this.family.nidAttachmentId = family_information.nidAttachment.id;
    }else {
      this.isOpenAttachment =true;
    }
  }

  deleteFamilyInformation(family_information: any) {
    Swal.fire({
      title: 'Family Information Delete',
      text: 'Are you want to delete this Family Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.familyService.deleteFamily(family_information.id).subscribe((response:any) => {
          if(response.status){
            this.families = this.families.filter((item: any)  => item !== family_information);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  calculateAge(dob: Date): number {
    if(dob === undefined){
      return 0;
    }
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    if (age < 0) {
      age = 0;
    }
    return age;
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
  getDocumentPreview(code: any, name: string, fileExtension: string) {
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
  getDocumentScanDemo(recordId:any,  family:{}, name:any, moduleName:any, fileExtension:any,) {
    console.log(family)
    sessionStorage.setItem('modelData', this.safeStringify(family));
    // this.router.navigate(['/document-scan',this.admissionApplication.id,recordId, name, moduleName, fileExtension]);
  }
}
