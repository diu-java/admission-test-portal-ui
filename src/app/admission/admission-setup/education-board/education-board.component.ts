import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {EducationMajor} from "../../../model/common-setup/educationMajor";
import {DegreeService} from "../../../Service/common-setup/degree.service";
import {LevelOfEducationService} from "../../../Service/common-setup/levelOfEducation.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {EducationBoardService} from "../../../Service/common-setup/educationBoard.service";
import {EducationBoard} from "../../../model/common-setup/educationBoard";

@Component({
  selector: 'app-education-board',
  templateUrl: './education-board.component.html',
  styleUrls: ['./education-board.component.css']
})
export class EducationBoardComponent implements OnInit{
  @ViewChild('educationMajorForm') form: NgForm | undefined;
  educationBoard  = new EducationBoard();
  education_boards:any=[];
  level_of_educations:any=[];
  degrees:any=[];
  degree_lists:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  levelOfEducationId:any;
  degreeId:any;
  constructor( private service: EducationBoardService, private degreeService: DegreeService, private levelOfEducationService: LevelOfEducationService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Education Board')
  }
  ngOnInit() {
    this.getLevelOfEducation()
  }
  getEducationBoard(){
    this.education_boards=[];
    if(this.degreeId){
      this.service.getEducationBoard(this.degreeId).subscribe((response:any)=>{
        this.education_boards = response.data;
      })
    }else {
      this.toastr.warning('Invalid Degree');
    }
  }
  getLevelOfEducation(){
    this.levelOfEducationService.getLevelOfEducation().subscribe((response:any)=>{
      this.level_of_educations = response.data;
    })
  }
  getDegree(levelOfEducationId:any){
    this.degrees = [];
    this.educationBoard.degreeId = undefined;
    this.educationBoard.levelOfEducationId = undefined;
    if(levelOfEducationId){
      this.degreeService.getDegreeActive(levelOfEducationId).subscribe((response:any)=>{
        this.degrees = response.data;
      })
    }else {
      this.toastr.error('Invalid Level of Education')
    }
  }
  getDegreeList(levelOfEducationId:any){
    this.education_boards=[];
    this.degree_lists = [];
    this.degreeId = undefined;
    this.levelOfEducationId = undefined;
    if(levelOfEducationId){
      this.degreeService.getDegreeActive(levelOfEducationId).subscribe((response:any)=>{
        this.degree_lists = response.data;
      })
    }else {
      this.toastr.error('Invalid Level of Education')
    }
  }

  postEducationBoard() {
    this.educationBoard.active = true;
    this.service.postEducationBoard(this.educationBoard).subscribe((response:any)=>{
      if (response.status){
        this.educationBoard = new EducationBoard();
        this.form?.resetForm(this.educationBoard);
        this.toastr.success(response.message);
        this.education_boards.push(response.data);
      }
    })
  }

  putEducationBoard() {
    this.service.putEducationBoard(this.educationBoard, this.educationBoard.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.education_boards.findIndex((item: EducationMajor) => item.id === this.educationBoard.id);
        this.education_boards[indexToUpdate] = response.data;
        this.educationBoard = new EducationBoard();
        this.form?.resetForm(this.educationBoard);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelEducationBoard() {
    this.educationBoard = new EducationBoard();
    this.form?.resetForm(this.educationBoard);
    this.educationBoard.levelOfEducationId = undefined;
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editEducationBoard(education_board: any) {
    this.educationBoard = education_board;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.getDegree(education_board.degree.levelOfEducation.id)
    this.educationBoard.levelOfEducationId = education_board.degree.levelOfEducation.id;
    this.educationBoard.degreeId = education_board.degree.id;
  }

  deleteEducationBoard(education_board: any) {
    Swal.fire({
      title: 'Education Institute Type Delete',
      text: 'Are you want to delete this Education Institute Type.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteEducationBoard(education_board.id).subscribe((response:any) => {
          if(response.status){
            this.education_boards = this.education_boards.filter((item: any)  => item !== education_board);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
}
