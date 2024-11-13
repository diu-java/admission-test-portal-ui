import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionPerson} from "../../model/admission/admission/admissionPerson";
import {GenderService} from "../../Service/common-setup/gender.service";
import {BloodGroupService} from "../../Service/common-setup/bloodGroup.service";
import {NgForm} from "@angular/forms";
import {AdmissionCircularService} from "../../Service/admission/admission-circular/admissionCircular.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdmissionCircular} from "../../model/admission/admission-circular/admissionCircular";
import {AdmissionApplicationService} from "../../Service/admission/admission/admissionApplication.service";
import {AdmissionApplication} from "../../model/admission/admission/admissionApplication";
import {AdmissionPersonService} from "../../Service/admission/admission/admissionPerson.service";
import {
  AdmissionApplicationTypeService
} from "../../Service/admission/admission-setup/admissionApplicationType.service";

@Component({
  selector: 'app-admission-application-create',
  templateUrl: './admission-application-create.component.html',
  styleUrls: ['./admission-application-create.component.css']
})
export class AdmissionApplicationCreateComponent implements OnInit{
  @ViewChild('admissionPersonForm') form: NgForm | undefined;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  admissionPerson:any = new AdmissionPerson();
  admissionCircular:any=new AdmissionCircular();
  admissionApplication:any=new AdmissionApplication();
  blood_groups:any=[];
  genders:any=[];
  application_types:any=[];
  loading:boolean = false;
  constructor(private genderService: GenderService, private admissionCircularService: AdmissionCircularService, private admissionApplicationTypeService: AdmissionApplicationTypeService,
              private admissionApplicationService: AdmissionApplicationService, private admissionPersonService: AdmissionPersonService,
              private bloodGroupService: BloodGroupService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.getGender();
    this.getBloodGroup();
    this.getViewAdmissionCircular();
    this.getApplicationType();
  }
  getViewAdmissionCircular(){
    this.route.params.subscribe((params)=>{
      const admissionCircularId = +params['id'];
      this.admissionCircularService.getViewAdmissionCircular(admissionCircularId).subscribe((response:any)=>{
        this.admissionCircular = response.data;
      });
    })
  }
  getApplicationType(){
    this.admissionApplicationTypeService.getApplicationType().subscribe((response:any)=>{
      this.application_types = response.data;
    })
  }

  getGender(){
    this.genderService.getGenderActive().subscribe((response:any)=>{
      this.genders = response.data;
    })
  }
  getBloodGroup(){
    this.bloodGroupService.getBloodGroupActive().subscribe((response:any)=>{
      this.blood_groups = response.data;
    })
  }

  postAdmissionPerson() {
    this.loading = true;
    this.admissionApplication.admissionCircularId = this.admissionCircular.id;
    this.admissionApplicationService.postAdmissionApplication(this.admissionApplication).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.router.navigate(['/admission-application-form', response.data.id]);
      }
    })
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
}
