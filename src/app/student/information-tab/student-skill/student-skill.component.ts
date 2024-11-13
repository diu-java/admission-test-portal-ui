import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SkillCategoryService} from "../../../Service/common-setup/skillCategory.service";
import {SkillService} from "../../../Service/common-setup/skill.service";
import {ProficiencyService} from "../../../Service/common-setup/proficiency.service";
import {SkillLearnByService} from "../../../Service/common-setup/skillLearnBy.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {PersonInformation} from "../../../model/student/personInformation";
import {StudentSkill} from "../../../model/student/studentSkill";
import {PersonInformationService} from "../../../Service/student/personInformation.service";
import {StudentSkillService} from "../../../Service/student/studentSkill.service";

@Component({
  selector: 'app-student-skill',
  templateUrl: './student-skill.component.html',
  styleUrls: ['./student-skill.component.css']
})
export class StudentSkillComponent implements OnInit{
  @ViewChild('employeeSkillForm') formEmployeeSkill: NgForm | undefined;
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isSkillInfoView:boolean = false;

  skill_categories:any=[];
  skills:any=[];
  proficiencies:any=[];
  skill_learned_bys:any=[];

  studentSkill = new StudentSkill();
  student_skills:any=[];


  constructor(private service: PersonInformationService,
              private route: ActivatedRoute,
              private toastr: ToastrService, private skillCategoryService: SkillCategoryService, private skillService: SkillService,
              private proficiencyService: ProficiencyService,
              private skillLearnedByService: SkillLearnByService,private studentSkillService: StudentSkillService) {
  }
  ngOnInit() {
    this.getPersonInformationView()
    this.getSkillCategory();
    this.getSkillLearnedBy();
    this.getProficiency();
  }
  getPersonInformationView(){
    this.route.params.subscribe((params)=>{
      const personId = +params['id'];
      this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
        this.personInformation = response.data;
        this.getStudentSkill(this.personInformation.id);
      });
    })
  }
  skillInfoView() {
    this.isSkillInfoView = true;
  }
  getSkillCategory(){
    this.skillCategoryService.getSkillCategoryActive().subscribe((response:any)=>{
      this.skill_categories=response.data;
    })
  }
  getSkill(skillCategoryId:any){
    this.skills=[];
    this.studentSkill.skillId = undefined;
    if(this.studentSkill.skillCategoryId){
      this.skillService.getSkill(skillCategoryId).subscribe((response:any)=>{
        this.skills=response.data;
      })
    }else {
      this.toastr.warning('Invalid Skill Category')
    }
  }
  getProficiency(){
      this.proficiencyService.getProficiency().subscribe((response:any)=>{
        this.proficiencies=response.data;
      })

  }
  getSkillLearnedBy(){
      this.skillLearnedByService.getSkillLearnBy().subscribe((response:any)=>{
        this.skill_learned_bys=response.data;
      })
  }

  // Employee Skill Start
  getStudentSkill(personId:any){
    this.studentSkillService.getStudentSkill(personId).subscribe((response:any)=>{
      this.student_skills = response.data;
    })
  }

  postStudentSkill() {
    this.studentSkill.studentPersonId = this.personInformation.id;
    this.studentSkillService.postStudentSkill(this.studentSkill).subscribe((response:any)=>{
      if (response.status){
        this.studentSkill = new StudentSkill();
        this.formEmployeeSkill?.resetForm(this.studentSkill);
        this.toastr.success(response.message);
        this.student_skills.push(response.data);
      }
    })
  }

  putStudentSkill() {
    this.studentSkill.studentPersonId = this.personInformation.id;
    this.studentSkillService.putStudentSkill(this.studentSkill, this.studentSkill.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.student_skills.findIndex((item: StudentSkill) => item.id === this.studentSkill.id);
        this.student_skills[indexToUpdate] = response.data;
        this.studentSkill = new StudentSkill();
        this.formEmployeeSkill?.resetForm(this.studentSkill);
        this.toastr.success(response.message);

        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelStudentSkill() {
    this.studentSkill = new StudentSkill();
    this.formEmployeeSkill?.resetForm(this.studentSkill);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editStudentSkill(employee_skill: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isSkillInfoView = true;
    this.studentSkill = employee_skill;
    this.studentSkill.skillCategoryId = employee_skill.skillCategory.id;
    this.getSkill(employee_skill.skillCategory.id)
    this.studentSkill.skillId = employee_skill.skill.id;
    this.studentSkill.proficiencyId = employee_skill.proficiency.id;
    this.studentSkill.skillLearnedById = employee_skill.skillLearnedBy.id;
  }

  deleteStudentSkill(employee_skill: any) {
    Swal.fire({
      title: 'Skill Delete',
      text: 'Are you want to delete this Skill.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.studentSkillService.deleteStudentSkill(employee_skill.id).subscribe((response:any) => {
          if(response.status){
            this.student_skills = this.student_skills.filter((item: any)  => item !== employee_skill);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  // Employee Skill End

}
