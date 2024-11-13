import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AddressInformation} from "../../model/student/addressInformation";
import {PersonInformation} from "../../model/student/personInformation";
import {PersonInformationService} from "../../Service/student/personInformation.service";
import {StudentAddressInformationService} from "../../Service/student/studentAddressInformation.service";
import {AddressTypeService} from "../../Service/common-setup/addressType.service";
import {CountryService} from "../../Service/common-setup/country.service";
import {StateService} from "../../Service/common-setup/state.service";
import {CityService} from "../../Service/common-setup/city.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SubDistrictService} from "../../Service/common-setup/subDistrict.service";
import Swal from "sweetalert2";
import {StudentInformation} from "../../model/student/studentInformation";

@Component({
  selector: 'app-student-address',
  templateUrl: './student-address.component.html',
  styleUrls: ['./student-address.component.css']
})
export class StudentAddressComponent implements OnInit{
  @Input() studentInformation:any = new StudentInformation();
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
    this.getAddressInformation(this.studentInformation.studentPerson.id);
    // this.route.params.subscribe((params)=>{
    //   const personId = +params['id'];
    //   this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
    //     this.personInformation = response.data;
    //     this.getAddressInformation(this.personInformation.id);
    //   });
    // })
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
    this.isAddressInfoView = !this.isAddressInfoView;
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
    this.addressInformation.studentPersonId = this.studentInformation.studentPerson.id;
    this.addressInformationService.postAddressInformation(this.addressInformation).subscribe((response:any)=>{
      if (response.status){
        this.addressInformation = new AddressInformation();
        this.form?.resetForm(this.addressInformation);
        this.toastr.success(response.message);
        this.address_informations.push(response.data);
        this.isAddressInfoView = false;
      }
    })
  }
  putAddressInformation() {
    this.addressInformation.studentPersonId = this.studentInformation.studentPerson.id;
    this.addressInformationService.putAddressInformation(this.addressInformation, this.addressInformation.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.address_informations.findIndex((item: AddressInformation) => item.id === this.addressInformation.id);
        this.address_informations[indexToUpdate] = response.data;
        this.addressInformation = new AddressInformation();
        this.form?.resetForm(this.addressInformation);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAddressInfoView = false;
      }
    })
  }

  cancelAddressInformation() {
    this.addressInformation = new AddressInformation();
    this.form?.resetForm(this.addressInformation);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAddressInfoView = false;
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
}
