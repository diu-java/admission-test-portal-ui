import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {ToastrService} from "ngx-toastr";
import {ProficiencyService} from "../../../../Service/common-setup/proficiency.service";
import {ApplicantSkillService} from "../../../../Service/admission/application/applicantSkill.service";
import {SkillCategoryService} from "../../../../Service/common-setup/skillCategory.service";
import {SkillService} from "../../../../Service/common-setup/skill.service";
import {SkillLearnByService} from "../../../../Service/common-setup/skillLearnBy.service";
import {ApplicantSkill} from "../../../../model/admission/applicantInformation/applicantSkill";
import Swal from "sweetalert2";

@Component({
  selector: 'app-applicant-skill',
  templateUrl: './applicant-skill.component.html',
  styleUrls: ['./applicant-skill.component.css']
})
export class ApplicantSkillComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('applicantSkillForm') form: NgForm | undefined;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isSkillInfoView:boolean = false;
  loading:boolean = false;
  formMinimize:boolean = true;

  skill_categories:any=[];
  skills:any=[];
  proficiencies:any=[];
  skill_learned_bys:any=[];
  applicant_skills:any=[];
  applicantSkill = new ApplicantSkill();
  admissionPerson:any = new AdmissionPerson();
  formSubmitted: boolean = false;
  constructor(private route: ActivatedRoute, private applicantSkillService: ApplicantSkillService,
              private toastr: ToastrService, private skillCategoryService: SkillCategoryService, private skillService: SkillService,
              private proficiencyService: ProficiencyService,
              private skillLearnedByService: SkillLearnByService,) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getSkillCategory();
    this.getSkillLearnedBy();
    this.getProficiency();
  }

  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getApplicantSkill(person?.admissionSkills);
    });
  }
  skillInfoView() {
    this.isSkillInfoView = !this.isSkillInfoView;
    this.isUpdateButton = false;
    this.isSaveButton = true;
  }
  getSkillCategory(){
    this.skillCategoryService.getSkillCategoryActive().subscribe((response:any)=>{
      this.skill_categories=response.data;
    })
  }
  getSkill(skillCategoryId:any){
    this.skills=[];
    this.applicantSkill.skillId = undefined;
    if(this.applicantSkill.skillCategoryId){
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
  getApplicantSkill(applicant_skill:any){
    this.applicant_skills = applicant_skill;
  }
  postApplicantSkill() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantSkill.admissionPersonId = this.admissionPerson.id;
    this.applicantSkillService.postStudentSkill(this.applicantSkill).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.applicantSkill = new ApplicantSkill();
        this.form?.resetForm(this.applicantSkill);
        this.toastr.success(response.message);
        this.isSkillInfoView = false;
        this.applicant_skills.push(response.data);
      }
    })
  }

  putApplicantSkill() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantSkill.admissionPersonId = this.admissionPerson.id;
    this.applicantSkillService.putStudentSkill(this.applicantSkill, this.applicantSkill.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.applicant_skills.findIndex((item: ApplicantSkill) => item.id === this.applicantSkill.id);
        this.applicant_skills[indexToUpdate] = response.data;
        this.applicantSkill = new ApplicantSkill();
        this.form?.resetForm(this.applicantSkill);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isSkillInfoView = false;
      }
    })
  }

  editApplicantSkill(applicant_skill: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isSkillInfoView = true;
    this.applicantSkill = applicant_skill;
    this.applicantSkill.skillCategoryId = applicant_skill.skillCategory.id;
    this.getSkill(applicant_skill.skillCategory.id)
    this.applicantSkill.skillId = applicant_skill.skill.id;
    this.applicantSkill.proficiencyId = applicant_skill.proficiency.id;
    this.applicantSkill.skillLearnedById = applicant_skill.skillLearnedBy.id;
  }

  deleteApplicantSkill(applicant_skill: any) {
    Swal.fire({
      title: 'Skill Delete',
      text: 'Are you want to delete this Skill.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.applicantSkillService.deleteStudentSkill(applicant_skill.id).subscribe((response: any) => {
          if (response.status) {
            this.applicant_skills = this.applicant_skills.filter((item: any) => item !== applicant_skill);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  cancelApplicantSKill() {
    this.applicantSkill = new ApplicantSkill();
    this.form?.resetForm(this.applicantSkill);
    this.isSaveButton = true;
    this.isSkillInfoView = !this.isSkillInfoView;
  }
}
