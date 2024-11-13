import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {RelationService} from "../../../Service/common-setup/relation.service";
import {PersonInformationService} from "../../../Service/student/personInformation.service";
import {PersonInformation} from "../../../model/student/personInformation";
import {EmergencyContact} from "../../../model/student/emergencyContact";
import {StudentEmergencyContactService} from "../../../Service/student/studentEmergencyContact.service";

@Component({
  selector: 'app-student-emergency-contact',
  templateUrl: './student-emergency-contact.component.html',
  styleUrls: ['./student-emergency-contact.component.css']
})
export class StudentEmergencyContactComponent implements OnInit{
  @ViewChild('emergencyContactForm') formEmergencyContact: NgForm | undefined;
  personInformation = new PersonInformation();
  emergencyContact=new EmergencyContact();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isEmergencyContactInfoVIew:boolean = false;
  activeTab: number = 3;
  emergency_contacts:any=[];
  relations:any=[];
  constructor(private service: PersonInformationService, private studentEmergencyContactService: StudentEmergencyContactService,
              private relationService: RelationService,
              private route: ActivatedRoute,
              private toastr: ToastrService,) {
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
        this.getEmergencyContact(this.personInformation.id);
      });
    })
  }
  getRelation(){
    this.relationService.getRelationActive().subscribe((response:any)=>{
      this.relations = response.data;
    })
  }
  emergencyContactInfoView(){
    this.isEmergencyContactInfoVIew=true;
    this.emergencyContact = new EmergencyContact();
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  // Emergency Contact Start
  getEmergencyContact(personId:any){
    this.studentEmergencyContactService.getEmergencyContact(personId).subscribe((response:any)=>{
      this.emergency_contacts = response.data;
    })
  }

  postEmergencyContact() {
    this.emergencyContact.studentPersonId = this.personInformation.id;
    this.studentEmergencyContactService.postEmergencyContact(this.emergencyContact).subscribe((response:any)=>{
      if (response.status){
        this.emergencyContact = new EmergencyContact();
        this.formEmergencyContact?.resetForm(this.emergencyContact);
        this.toastr.success(response.message);
        this.emergency_contacts.push(response.data);
      }
    })
  }

  putEmergencyContact() {
    this.emergencyContact.studentPersonId = this.personInformation.id;
    this.studentEmergencyContactService.putEmergencyContact(this.emergencyContact, this.emergencyContact.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.emergency_contacts.findIndex((item: EmergencyContact) => item.id === this.emergencyContact.id);
        this.emergency_contacts[indexToUpdate] = response.data;
        this.emergencyContact = new EmergencyContact();
        this.formEmergencyContact?.resetForm(this.emergencyContact);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelEmergencyContact() {
    this.emergencyContact = new EmergencyContact();
    this.formEmergencyContact?.resetForm(this.emergencyContact);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editEmergencyContact(emergency_contact: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isEmergencyContactInfoVIew = true;
    this.emergencyContact = emergency_contact;
    this.emergencyContact.relationId = emergency_contact.relation.id;
  }
  deleteEmergencyContact(emergency_contact: any) {
    Swal.fire({
      title: 'Emergency Contact Delete',
      text: 'Are you want to delete this Emergency Contact.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.studentEmergencyContactService.deleteEmergencyContact(emergency_contact.id).subscribe((response:any) => {
          if(response.status){
            this.emergency_contacts = this.emergency_contacts.filter((item: any)  => item !== emergency_contact);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  // Emergency Contact End

}
