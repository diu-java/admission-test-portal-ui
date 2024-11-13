import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {
  ApplicantAddressInformation
} from "../../../../model/admission/applicantInformation/applicantAddressInformation";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {
  ApplicantAddressInformationService
} from "../../../../Service/admission/application/applicantAddressInformation.service";
import {AddressTypeService} from "../../../../Service/common-setup/addressType.service";
import {CountryService} from "../../../../Service/common-setup/country.service";
import {StateService} from "../../../../Service/common-setup/state.service";
import {CityService} from "../../../../Service/common-setup/city.service";
import {ToastrService} from "ngx-toastr";
import {SubDistrictService} from "../../../../Service/common-setup/subDistrict.service";
import {AddressInformation} from "../../../../model/student/addressInformation";
import Swal from "sweetalert2";
import {PostOfficeService} from "../../../../Service/common-setup/postOffice.service";
declare var $: any;
@Component({
  selector: 'app-admission-address-information',
  templateUrl: './admission-address-information.component.html',
  styleUrls: ['./admission-address-information.component.css']
})
export class AdmissionAddressInformationComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('addressInformationForm') form: NgForm | undefined;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAddressInfoView:boolean = false;
  applicantAddressInformation:any = new ApplicantAddressInformation();
  admissionPerson = new AdmissionPerson();
  address_informations:any=[];
  countries:any=[];
  states:any=[];
  cities:any=[];
  sub_districts:any=[];
  post_offices:any=[];
  address_types:any=[];
  loading:boolean = false;
  formSubmitted: boolean = false;
  constructor(private service: ApplicantAddressInformationService,
              private addressTypeService: AddressTypeService,
              private countryService: CountryService,
              private stateService: StateService, private postOfficeService: PostOfficeService,
              private cityService: CityService,private toastr: ToastrService,
              private subDistrictService: SubDistrictService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getAddressType();
    this.getCountry();
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
      this.getAddressInformation(person?.addressInformations);
    });
  }
  getAddressInformation(address:any){
    this.address_informations = address;
  }
  getAddressType(){
    this.addressTypeService.getAddressTypeActive().subscribe((response:any)=>{
      this.address_types = response.data;
    })
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }
  getState(){
    this.states=[];
    this.cities=[];
    this.sub_districts=[];
    this.post_offices=[];
    this.applicantAddressInformation.stateId = undefined;
    this.applicantAddressInformation.cityId = undefined;
    this.applicantAddressInformation.subDistrictId = undefined;
    this.applicantAddressInformation.postOfficeId = undefined;
    if(this.applicantAddressInformation.countryId) {
      this.stateService.getStateActive(this.applicantAddressInformation.countryId).subscribe((response:any)=>{
        this.states = response.data;
      })
    }else {
      this.toastr.warning('Invalid Country');
    }

  }
  getCity(){
    this.cities=[];
    this.sub_districts=[];
    this.post_offices=[];
    this.applicantAddressInformation.cityId = undefined;
    this.applicantAddressInformation.subDistrictId = undefined;
    this.applicantAddressInformation.postOfficeId = undefined;
    if(this.applicantAddressInformation.stateId){
      this.cityService.getCityActive(this.applicantAddressInformation.stateId).subscribe((response:any)=>{
        this.cities = response.data;
      })
    }else {
      this.toastr.warning('Invalid State');
    }
  }
  getSubDistrict(){
    this.sub_districts=[];
    this.post_offices=[];
    this.applicantAddressInformation.subDistrictId = undefined;
    this.applicantAddressInformation.postOfficeId = undefined;
    if(this.applicantAddressInformation.cityId){
      this.subDistrictService.getSubDistrictActive(this.applicantAddressInformation.cityId).subscribe((response:any)=>{
        this.sub_districts = response.data;
      })
    }else {
      this.toastr.warning('Invalid City');
    }
  }
  getPostOffice(){
    this.post_offices = [];
    this.applicantAddressInformation.postOfficeId = undefined;
    if(this.applicantAddressInformation.subDistrictId){
      this.postOfficeService.getPostOfficeActive(this.applicantAddressInformation.subDistrictId).subscribe((response:any)=>{
        this.post_offices = response.data;
      })
    }else {
      this.toastr.warning('Invalid City');
    }
  }
  onPostOfficeChange(postOfficeId: number) {
    const selectedPostOffice = this.post_offices.find((item:any) => item.id === postOfficeId);
    if (selectedPostOffice) {
      this.applicantAddressInformation.postCode = selectedPostOffice.code;
    } else {
      this.applicantAddressInformation.postCode = ''
    }
  }

  addressInfoView() {
    this.isAddressInfoView = !this.isAddressInfoView;
    this.isUpdateButton = false;
    this.isSaveButton = true;
  }

  postApplicantAddress() {
    this.formSubmitted = true;
    if (!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantAddressInformation.admissionPersonId = this.admissionPerson.id;
    this.service.postAddressInformation(this.applicantAddressInformation).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.applicantAddressInformation = new ApplicantAddressInformation();
        this.toastr.success(response.message);
        this.address_informations.push(response.data);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAddressInfoView = false;
      }
    })
  }

  putApplicantAddress() {
    this.formSubmitted = true;
    if(!this.form?.valid) {
      this.toastr.error('Please fill out the form correctly before submitting.');
      return;
    }
    this.loading = true;
    this.applicantAddressInformation.admissionPersonId = this.admissionPerson.id;
    this.service.putAddressInformation(this.applicantAddressInformation, this.applicantAddressInformation.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.address_informations.findIndex((item: AddressInformation) => item.id === this.applicantAddressInformation.id);
        this.address_informations[indexToUpdate] = response.data;
        this.applicantAddressInformation = new ApplicantAddressInformation();
        this.form?.resetForm(this.applicantAddressInformation);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAddressInfoView = false;
      }
    })
  }

  cancelApplicantAddress() {
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAddressInfoView = !this.isAddressInfoView;
    this.applicantAddressInformation = new ApplicantAddressInformation();
    this.form?.resetForm(this.applicantAddressInformation);
    this.formSubmitted = false;
  }

  deleteApplicantAddress(address_information: any) {
    Swal.fire({
      title: 'Address Information Delete',
      text: 'Are you want to delete this Address Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteAddressInformation(address_information.id).subscribe((response:any) => {
          if(response.status){
            this.address_informations = this.address_informations.filter((item: any)  => item !== address_information);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  editApplicantAddress(address_information: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAddressInfoView = true;
    $('.go_to_top').first().get(0).scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.applicantAddressInformation = address_information;
    this.applicantAddressInformation.addressTypeId=address_information.addressType.id;
    this.applicantAddressInformation.countryId=address_information.country.id;
    this.getState();
    if(address_information.state){
      this.applicantAddressInformation.stateId=address_information.state.id;
    }
    this.getCity();
    if(address_information.city){
      this.applicantAddressInformation.cityId=address_information.city.id;
    }
    this.getSubDistrict();
    if(address_information.subDistrict){
      this.applicantAddressInformation.subDistrictId=address_information.subDistrict.id;
    }
    this.getPostOffice();
    if(address_information.postOffice){
      this.applicantAddressInformation.postOfficeId=address_information.postOffice.id;
    }
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
