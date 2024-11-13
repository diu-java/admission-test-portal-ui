import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LevelOfEducationService} from "../../../Service/common-setup/levelOfEducation.service";
import {DegreeService} from "../../../Service/common-setup/degree.service";
import {ResultTypeService} from "../../../Service/common-setup/resultType.service";
import {BoardService} from "../../../Service/common-setup/board.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {PersonInformation} from "../../../model/student/personInformation";
import {EducationalInformation} from "../../../model/student/educationalInformation";
import {PersonInformationService} from "../../../Service/student/personInformation.service";
import {StudentDocumentService} from "../../../Service/student/studentDocument.service";
import {StudentEducationalInformationService} from "../../../Service/student/studentEducationalInformation.service";

@Component({
  selector: 'app-student-educational-information',
  templateUrl: './student-educational-information.component.html',
  styleUrls: ['./student-educational-information.component.css']
})
export class StudentEducationalInformationComponent implements OnInit{
  @ViewChild('educationalInformationForm') formEducationalInformation: NgForm | undefined;
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isEducationalInfoView:boolean = false;

  isMajor:boolean =false;
  isBoard:boolean =false;
  isRegistration:boolean =false;
  isRoll:boolean =false;
  isMark:boolean =false;
  isCgpa:boolean =false;
  isScale:boolean =false;
  sMessage:boolean =false;

  years: number[] = [];
  level_of_educations:any=[];
  degrees:any=[];
  boards:any=[];
  result_types:any=[];

  educationalInformation = new EducationalInformation();
  educational_informations:any=[];
  private employeeInformation: any;
  constructor(private service: PersonInformationService,
              private route: ActivatedRoute,
              private toastr: ToastrService, private levelOfEducationService: LevelOfEducationService,
              private degreeService: DegreeService, private resultTypeService: ResultTypeService, private documentService: StudentDocumentService,
              private boardService: BoardService, private educationalInformationService: StudentEducationalInformationService) {
  }
  ngOnInit() {
    this.getPersonInformationView();
    this.getLevelOfEducation();
    this.getResultType();
    this.getBoard();
    this.getYear();
  }

  getPersonInformationView(){
    this.route.params.subscribe((params)=>{
      const personId = +params['id'];
      this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
        this.personInformation = response.data;
        this.getEducationalInformation(this.personInformation.id);
      });
    })
  }
  getYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear+1; i > currentYear - 50; i--) {
      this.years.push(i);
    }
  }
  educationalInfoView() {
    this.isEducationalInfoView = true;
    this.educationalInformation = new EducationalInformation();
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  getLevelOfEducation(){
    this.levelOfEducationService.getLevelOfEducation().subscribe((response:any)=>{
      this.level_of_educations=response.data;
    })
  }

  getDegree(levelOfEducationId:any){
    this.degrees=[];
    this.educationalInformation.degreeId=undefined;
    if(this.educationalInformation.levelOfEducationId){
      let levelOfEducation = this.level_of_educations.filter((item: any) => item.id === levelOfEducationId);
      this.isMajor = levelOfEducation[0].isMajor;
      this.isBoard = levelOfEducation[0].isBoard;
      this.isRoll = levelOfEducation[0].isRoll;
      this.isRegistration = levelOfEducation[0].isRegistration;
      this.degreeService.getDegreeActive(levelOfEducationId).subscribe((response:any)=>{
        this.degrees=response.data.filter((item: any) => item.isVerify);
      })
    }else {
      this.toastr.warning('Invalid Degree');
    }
  }

  getResultType(){
    this.resultTypeService.getResultTypeActive().subscribe((response:any)=>{
      this.result_types=response.data;
    })
  }
  enableResult(resultTypeId:any){
    let result = this.result_types.filter((item: any) => item.id === resultTypeId)
    this.isCgpa = result[0].isCgpa;
    this.isMark = result[0].isMark;
    if(!this.isCgpa){
      this.educationalInformation.cgpa = 0;
    }
    if(!this.isMark){
      this.educationalInformation.mark=0;
    }
  }
  getBoard(){
    this.boardService.getBoard().subscribe((response:any)=>{
      this.boards=response.data;
    })
  }
  postDocument(event: any){
    const file:File = event.target.files[0];
    this.documentService.postDocument(file,this.personInformation.id, 'Education', 'Education').subscribe((response:any)=>{
      if(response.status){
        // this.toastr.success(response.message);
        this.sMessage = response.message;
        this.educationalInformation.attachmentId = response.data.id;
      }
    })
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

  // Educational Information Start
  getEducationalInformation(personId:any){
    this.educationalInformationService.getEducationalInformation(personId).subscribe((response:any)=>{
      this.educational_informations = response.data;
    })
  }

  postEducationalInformation() {
    this.educationalInformation.studentPersonId = this.personInformation.id;
    this.educationalInformationService.postEducationalInformation(this.educationalInformation).subscribe((response:any)=>{
      if (response.status){
        this.educationalInformation = new EducationalInformation();
        this.formEducationalInformation?.resetForm(this.educationalInformation);
        this.toastr.success(response.message);
        this.educational_informations.push(response.data);
      }
    })
  }

  putEducationalInformation() {
    this.educationalInformation.studentPersonId = this.personInformation.id;
    this.educationalInformationService.putEducationalInformation(this.educationalInformation, this.educationalInformation.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.educational_informations.findIndex((item: EducationalInformation) => item.id === this.educationalInformation.id);
        this.educational_informations[indexToUpdate] = response.data;
        this.educationalInformation = new EducationalInformation();
        this.formEducationalInformation?.resetForm(this.educationalInformation);
        this.toastr.success(response.message);

        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelEducationalInformation() {
    this.educationalInformation = new EducationalInformation();
    this.formEducationalInformation?.resetForm(this.educationalInformation);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editEducationalInformation(educational_information: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isEducationalInfoView = true;
    this.educationalInformation = educational_information;
    this.educationalInformation.levelOfEducationId = educational_information.levelOfEducation.id;
    this.getDegree(educational_information.levelOfEducation.id)
    if(educational_information.degree){
      this.educationalInformation.degreeId = educational_information.degree.id;
    }
    if(educational_information.board){
      this.educationalInformation.boardId = educational_information.board.id;
    }
    this.enableResult(educational_information.resultType.id);
    if(educational_information.resultType){
      this.educationalInformation.resultTypeId = educational_information.resultType.id;
    }

    if(educational_information.attachment){
      this.educationalInformation.attachmentId = educational_information.attachment.id;
    }
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
        this.educationalInformationService.deleteEducationalInformation(educational_information.id).subscribe((response:any) => {
          if(response.status){
            this.educational_informations = this.educational_informations.filter((item: any)  => item !== educational_information);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  // Educational Information End
}
