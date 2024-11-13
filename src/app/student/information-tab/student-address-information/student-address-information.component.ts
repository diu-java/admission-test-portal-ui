import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AddressTypeService} from "../../../Service/common-setup/addressType.service";
import {StateService} from "../../../Service/common-setup/state.service";
import {CityService} from "../../../Service/common-setup/city.service";
import {SubDistrictService} from "../../../Service/common-setup/subDistrict.service";
import {CountryService} from "../../../Service/common-setup/country.service";
import {PersonInformation} from "../../../model/student/personInformation";
import {AddressInformation} from "../../../model/student/addressInformation";
import {PersonInformationService} from "../../../Service/student/personInformation.service";
import {StudentAddressInformationService} from "../../../Service/student/studentAddressInformation.service";
@Component({
  selector: 'app-student-address-information',
  templateUrl: './student-address-information.component.html',
  styleUrls: ['./student-address-information.component.css']
})
export class StudentAddressInformationComponent implements OnInit{
  @ViewChild('addressInformationForm') form: NgForm | undefined;
  addressInformation:AddressInformation = new AddressInformation();
  personInformation:any = new PersonInformation();
  isAddressInfoView:boolean=false;
  address_informations:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  address_types:any=[];
  countries:any=[];
  states:any=[];
  cities:any=[];
  sub_districts:any=[];
  activeTab: number = 2;
  constructor(private service: PersonInformationService,
              private addressInformationService: StudentAddressInformationService,
              private addressTypeService: AddressTypeService,
              private countryService: CountryService,
              private stateService: StateService,
              private cityService: CityService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private subDistrictService: SubDistrictService) {
  }
  ngOnInit() {
    this.getAddressType();
    this.getCountry();
    this.getPersonInformationView();
  }
  getPersonInformationView(){
    this.route.params.subscribe((params)=>{
      const personId = +params['id'];
      this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
        this.personInformation = response.data;
        this.getAddressInformation(this.personInformation.id);
      });
    })
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
    this.addressInformation.stateId = undefined;
    this.addressInformation.cityId = undefined;
    this.addressInformation.subDistrictId = undefined;
    if(this.addressInformation.countryId) {
      this.stateService.getStateActive(this.addressInformation.countryId).subscribe((response:any)=>{
        this.states = response.data;
      })
    }else {
      this.toastr.warning('Invalid Country');
    }

  }
  getCity(){
    this.cities=[];
    this.sub_districts=[];
    this.addressInformation.cityId = undefined;
    this.addressInformation.subDistrictId = undefined;
    if(this.addressInformation.stateId){
      this.cityService.getCityActive(this.addressInformation.stateId).subscribe((response:any)=>{
        this.cities = response.data;
      })
    }else {
      this.toastr.warning('Invalid State');
    }

  }
  getSubDistrict(){
    this.sub_districts=[];
    this.addressInformation.subDistrictId = undefined;
    if(this.addressInformation.cityId){
      this.subDistrictService.getSubDistrictActive(this.addressInformation.cityId).subscribe((response:any)=>{
        this.sub_districts = response.data;
      })
    }else {
      this.toastr.warning('Invalid City');
    }
  }

  addressInfoView(){
    this.isAddressInfoView = true;
    this.addressInformation = new AddressInformation();
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }
  // Address Information Start
  getAddressInformation(personId:any){
    this.addressInformationService.getAddressInformation(personId).subscribe((response:any)=>{
      this.address_informations = response.data;
    })
  }

  postAddressInformation() {
    this.addressInformation.studentPersonId = this.personInformation.id;
    this.addressInformationService.postAddressInformation(this.addressInformation).subscribe((response:any)=>{
      if (response.status){
        this.addressInformation = new AddressInformation();
        this.form?.resetForm(this.addressInformation);
        this.toastr.success(response.message);
        this.address_informations.push(response.data);
      }
    })
  }
  putAddressInformation() {
    this.addressInformation.studentPersonId = this.personInformation.id;
    this.addressInformationService.putAddressInformation(this.addressInformation, this.addressInformation.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.address_informations.findIndex((item: AddressInformation) => item.id === this.addressInformation.id);
        this.address_informations[indexToUpdate] = response.data;
        this.addressInformation = new AddressInformation();
        this.form?.resetForm(this.addressInformation);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelAddressInformation() {
    this.addressInformation = new AddressInformation();
    this.form?.resetForm(this.addressInformation);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editAddressInformation(address_information: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAddressInfoView = true;
    this.addressInformation = address_information;
    this.addressInformation.addressTypeId=address_information.addressType.id;
    this.addressInformation.countryId=address_information.country.id;
    this.getState();
    if(address_information.state){
      this.addressInformation.stateId=address_information.state.id;
    }
    this.getCity();
    this.addressInformation.cityId=address_information.city.id;
    this.getSubDistrict();
    this.addressInformation.subDistrictId=address_information.subDistrict.id;
  }

  deleteAddressInformation(address_information: any) {
    Swal.fire({
      title: 'Address Delete',
      text: 'Are you want to delete this Address.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.addressInformationService.deleteAddressInformation(address_information.id).subscribe((response:any) => {
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
  // Address Information End

}
