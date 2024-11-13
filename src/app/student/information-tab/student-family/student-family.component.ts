import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {RelationService} from "../../../Service/common-setup/relation.service";
import Swal from "sweetalert2";
import {PersonInformation} from "../../../model/student/personInformation";
import {PersonInformationService} from "../../../Service/student/personInformation.service";
import {Family} from "../../../model/student/family";
import {StudentFamilyService} from "../../../Service/student/studentFamily.service";

@Component({
  selector: 'app-student-family',
  templateUrl: './student-family.component.html',
  styleUrls: ['./student-family.component.css']
})
export class StudentFamilyComponent implements OnInit{
  @ViewChild('familyForm') formFamily: NgForm | undefined;
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isFamilyInfoView:boolean = false;
  relations:any=[];
  family = new Family();
  families:any=[];
  constructor(private service: PersonInformationService,
              private route: ActivatedRoute,
              private toastr: ToastrService, private relationService: RelationService, private familyService: StudentFamilyService) {
  }
  ngOnInit() {
    this.getPersonInformationView();
    this.getRelation();
  }
  getPersonInformationView(){
    this.route.params.subscribe((params)=>{
      const personId = +params['id'];
      this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
        this.personInformation = response.data;
        this.getFamily(this.personInformation.id);
      });
    })
  }
  familyInfoView() {
    this.isFamilyInfoView = true;
  }
  getRelation(){
    this.relationService.getRelationActive().subscribe((response:any)=>{
      this.relations = response.data;
    })
  }

  // Family Service Start
  getFamily(personId:any){
    this.familyService.getFamily(personId).subscribe((response:any)=>{
      this.families = response.data;
    })
  }

  postFamily() {
    this.family.studentPersonId = this.personInformation.id;
    this.familyService.postFamily(this.family).subscribe((response:any)=>{
      if (response.status){
        this.family = new Family();
        this.formFamily?.resetForm(this.family);
        this.toastr.success(response.message);
        this.families.push(response.data);
      }
    })
  }

  putFamily() {
    this.family.studentPersonId = this.personInformation.id;
    this.familyService.putFamily(this.family, this.family.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.families.findIndex((item: Family) => item.id === this.family.id);
        this.families[indexToUpdate] = response.data;
        this.family = new Family();
        this.formFamily?.resetForm(this.family);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelFamily() {
    this.family = new Family();
    this.formFamily?.resetForm(this.family);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editFamily(family: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isFamilyInfoView = true;
    this.family = family;
    this.family.relationId = family.relation.id;
  }

  deleteFamily(family: any) {
    Swal.fire({
      title: 'Family Delete',
      text: 'Are you want to delete this Family.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.familyService.deleteFamily(family.id).subscribe((response:any) => {
          if(response.status){
            this.families = this.families.filter((item: any)  => item !== family);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  // Family Service End
}
