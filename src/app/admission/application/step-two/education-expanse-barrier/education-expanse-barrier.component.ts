import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {NgForm} from "@angular/forms";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {ApplicantGroupInsurance} from "../../../../model/admission/applicantInformation/applicantGroupInsurance";
import {RelationService} from "../../../../Service/common-setup/relation.service";
import {ApplicantGroupInsuranceService} from "../../../../Service/admission/application/applicantGroupInsurance.service";
import {ApplicantFamilyService} from "../../../../Service/admission/application/applicantFamily.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-education-expanse-barrier',
  templateUrl: './education-expanse-barrier.component.html',
  styleUrls: ['./education-expanse-barrier.component.css']
})
export class EducationExpanseBarrierComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('groupInsuranceForm') formGroupInsurance: NgForm | undefined;
  admissionPerson = new AdmissionPerson();
  applicantGroupInsurance:any = new ApplicantGroupInsurance();
  countries:any=[];
  relations:any=[];
  relation_groups:any=[];
  group_insurances:any=[];
  family:any=[];
  checkOther:any;
  isSaveButton: boolean = true;
  isUpdateButton: boolean = false;
  isGroupInsuranceView: boolean = false;
  loading: boolean = false;
  payment:any;
  formSubmitted:boolean = false;
  minimumAge:number = 0;
  maximumAge:number = 0;
  constructor(private relationService: RelationService,
              private applicantGroupInsuranceService: ApplicantGroupInsuranceService, private familyService: ApplicantFamilyService,
              private toastr: ToastrService,) {
  }
  ngOnInit() {
    this.getRelation();
    this.getAdmissionApplicationView();
    this.getRelationGroup();
  }
  getAdmissionApplicationView() {
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getGroupInsurance(person?.admissionGroupInsurances);
    });
    if(this.admissionApplication.programType.name === 'BACHELOR'){
      this.minimumAge = 35;
      this.maximumAge = 65;
    }
    if(this.admissionApplication.programType.name === 'MASTERS'){
      this.minimumAge = 35;
      this.maximumAge = 68;
    }
  }

  getRelation() {
    this.relationService.getRelationActive().subscribe((response: any) => {
      this.relations = response.data;
    })
  }

  getRelationGroup() {
    this.relationService.getRelationActive().subscribe((response: any) => {
      this.relation_groups = response.data.filter((item:any)=> item.code === 'F' || item.code === 'M' || item.code === 'o');
    })
  }

  // Group Insurance
  getFamily(personId:any, code:any){
    this.applicantGroupInsurance.relationId = this.relations.filter((res:any)=> res.code === code).id;
    this.familyService.getFamily(personId).subscribe((response:any)=>{
      this.family = response.data.filter((item:any)=> item.relation.code === code);
      if(this.family.length){
        let dob = this.calculateAge(this.family[0].dateOfBirth)
        if(this.family[0].late){
          this.toastr.warning('You cannot select late person');
          this.formSubmitted = false;
          this.applicantGroupInsurance.relationNominee = '';
        }else if(dob < this.minimumAge || dob > this.maximumAge){
          this.toastr.warning(`Age limit will be minimum ${this.minimumAge} and maximum ${this.maximumAge}`);
          this.formSubmitted = false;
          this.applicantGroupInsurance.relationNominee = '';
        }else {
          this.checkOther = this.family[0]?.relation?.code;
          this.applicantGroupInsurance.relationId = this.family[0].relation.id;
          this.applicantGroupInsurance.name = this.family[0].name;
          this.applicantGroupInsurance.mobileNumber = this.family[0].mobileNumber;
          this.applicantGroupInsurance.email = this.family[0].email;
          this.applicantGroupInsurance.nationalId = this.family[0].nationalId;
          this.applicantGroupInsurance.dateOfBirth = this.family[0].dateOfBirth;
          this.applicantGroupInsurance.annualIncome = this.family[0].annualIncome;
        }

      }
    })
  }
  getGroupInsurance(group_insurance:any){
    this.group_insurances = group_insurance;
  }

  postGroupInsurance() {
    this.formSubmitted = true;
    let age = this.calculateAge(this.applicantGroupInsurance.dateOfBirth);
    if (!this.formGroupInsurance?.valid || age < this.minimumAge || age > this.maximumAge) {
      if(!this.formGroupInsurance?.valid){
        this.toastr.error('Please fill out the form correctly before submitting.');
      }
      if(age < this.minimumAge || age > this.maximumAge){
        this.toastr.warning(`Age limit will be minimum ${this.minimumAge} and maximum ${this.maximumAge}`);
      }
      return;
    }
    this.loading = true;
    this.applicantGroupInsurance.admissionPersonId = this.admissionPerson.id;
    this.applicantGroupInsuranceService.postGroupInsurance(this.applicantGroupInsurance).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.isSaveButton = true;
        this.isUpdateButton = false;
        this.toastr.success(response.message);
        this.group_insurances.push(response.data);
        this.isGroupInsuranceView = false;
      }
    })
  }

  putGroupInsurance() {
    this.formSubmitted = true;
    let age = this.calculateAge(this.applicantGroupInsurance.dateOfBirth);
    if (!this.formGroupInsurance?.valid || age < this.minimumAge || age > this.maximumAge) {
      if(!this.formGroupInsurance?.valid){
        this.toastr.error('Please fill out the form correctly before submitting.');
      }
      if(age < this.minimumAge || age > this.maximumAge){
        this.toastr.warning(`Age limit will be minimum ${this.minimumAge} and maximum ${this.maximumAge}`);
        this.formSubmitted = false;
      }
      return;
    }
    this.loading = true;
    this.applicantGroupInsurance.admissionPersonId = this.admissionPerson.id;
    this.applicantGroupInsuranceService.putGroupInsurance(this.applicantGroupInsurance, this.applicantGroupInsurance.id).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        let indexToUpdate = this.group_insurances.findIndex((item: ApplicantGroupInsurance) => item.id === this.applicantGroupInsurance.id);
        this.group_insurances[indexToUpdate] = response.data;
        this.applicantGroupInsurance = new ApplicantGroupInsurance();
        this.formGroupInsurance?.resetForm(this.applicantGroupInsurance);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isGroupInsuranceView = false;
      }
    })
  }

  groupInsuranceView() {
    this.isGroupInsuranceView = !this.isGroupInsuranceView;
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editGroupInsurance(group_insurance: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isGroupInsuranceView = true;
    this.getFamily(group_insurance.admissionPerson.id, group_insurance.relation.id);
    if(group_insurance.relation){
      this.applicantGroupInsurance.relationId = group_insurance.relation.id;
    }
    this.applicantGroupInsurance.relationNominee = 'O';
    if(this.group_insurances[0].relation.code === 'F'){
      this.applicantGroupInsurance.relationNominee = 'F';
    }
    if(this.group_insurances[0].relation.code === 'M'){
      this.applicantGroupInsurance.relationNominee = 'M';
    }
    this.applicantGroupInsurance.id = group_insurance.id;
    this.applicantGroupInsurance.relationId = group_insurance.relation.id;
    this.applicantGroupInsurance.name = group_insurance.name;
    this.applicantGroupInsurance.mobileNumber = group_insurance.mobileNumber;
    this.applicantGroupInsurance.email = group_insurance.email;
    this.applicantGroupInsurance.nationalId = group_insurance.nationalId;
    this.applicantGroupInsurance.dateOfBirth = group_insurance.dateOfBirth;
    this.applicantGroupInsurance.annualIncome = group_insurance.annualIncome;
  }

  deleteGroupInsurance(group_insurance: any) {
    Swal.fire({
      title: 'Group Insurance Delete',
      text: 'Are you want to delete thisGroup Insurance Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.applicantGroupInsuranceService.deleteGroupInsurance(group_insurance.id).subscribe((response:any) => {
          if(response.status){
            this.group_insurances = this.group_insurances.filter((item: any)  => item !== group_insurance);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  cancelGroupInsurance() {
    this.applicantGroupInsurance = new ApplicantGroupInsurance();
    this.formGroupInsurance?.resetForm(this.applicantGroupInsurance);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isGroupInsuranceView = !this.isGroupInsuranceView;
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
}
