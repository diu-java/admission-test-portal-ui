import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestVenue} from "../../../model/admission/admission-setup/admissionTestVenue";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {PostOffice} from "../../../model/common-setup/postOffice";
import {PostOfficeService} from "../../../Service/common-setup/postOffice.service";
import {SubDistrictService} from "../../../Service/common-setup/subDistrict.service";
import {CountryService} from "../../../Service/common-setup/country.service";
import {StateService} from "../../../Service/common-setup/state.service";
import {CityService} from "../../../Service/common-setup/city.service";

@Component({
  selector: 'app-post-office',
  templateUrl: './post-office.component.html',
  styleUrls: ['./post-office.component.css']
})
export class PostOfficeComponent implements OnInit{
  @ViewChild('postOfficeForm') form: NgForm | undefined;
  postOffice  = new PostOffice();
  post_offices:any=[];
  countries:any=[];
  states:any=[];
  cities:any=[];
  sub_districts:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  countryId:any;
  stateId:any;
  cityId:any;
  subDistrictId:any;
  isPostOfficeView: boolean = false;
  constructor( private service: PostOfficeService, private subDistrictService: SubDistrictService, private stateService: StateService,
               private countryService: CountryService, private cityService: CityService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Post Office')
  }
  ngOnInit() {
    this.getCountry();
  }
  getCountry(){
    this.countryService.getCountryActive().subscribe((response:any)=>{
      this.countries = response.data;
    })
  }


  getState(countryId:any){
    this.states=[];
    this.cities=[];
    this.sub_districts=[];
    this.post_offices=[]
    this.stateId = undefined;
    this.cityId = undefined;
    this.subDistrictId = undefined;
    this.postOffice.stateId = undefined;
    this.postOffice.cityId = undefined;
    this.postOffice.subDistrictId = undefined;
    if(countryId) {
      this.stateService.getStateActive(countryId).subscribe((response:any)=>{
        this.states = response.data;
      })
    }else {
      this.toastr.warning('Invalid Country');
    }

  }
  getCity(stateId:any){
    this.cities=[];
    this.sub_districts=[];
    this.post_offices=[]
    this.cityId = undefined;
    this.subDistrictId = undefined;
    this.postOffice.cityId = undefined;
    this.postOffice.subDistrictId = undefined;
    if(stateId){
      this.cityService.getCityActive(stateId).subscribe((response:any)=>{
        this.cities = response.data;
      })
    }else {
      this.toastr.warning('Invalid State');
    }
  }
  getSubDistrict(cityId:any){
    this.sub_districts=[];
    this.post_offices=[]
    this.subDistrictId = undefined;
    this.postOffice.subDistrictId = undefined;
    if(cityId){
      this.subDistrictService.getSubDistrictActive(cityId).subscribe((response:any)=>{
        this.sub_districts = response.data;
      })
    }else {
      this.toastr.warning('Invalid City');
    }
  }

  getPostOffice(subDistrictId:any){
    this.post_offices=[]
    if(subDistrictId){
      this.service.getPostOffice(subDistrictId).subscribe((response:any)=>{
        this.post_offices = response.data;
      })
    }else {
      this.toastr.warning('Invalid Sub District');
    }

  }

  postPostOffice() {
    this.postOffice.active = true;
    this.service.postPostOffice(this.postOffice).subscribe((response:any)=>{
      if (response.status){
        this.postOffice = new PostOffice();
        this.form?.resetForm(this.postOffice);
        this.toastr.success(response.message);
        this.post_offices.push(response.data);
      }
    })
  }
  putPostOffice() {
    this.service.putPostOffice(this.postOffice, this.postOffice.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.post_offices.findIndex((item: PostOffice) => item.id === this.postOffice.id);
        this.post_offices[indexToUpdate] = response.data;
        this.postOffice = new PostOffice();
        this.form?.resetForm(this.postOffice);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isPostOfficeView = false;
      }
    })
  }

  cancelPostOffice() {
    this.postOffice = new PostOffice();
    this.form?.resetForm(this.postOffice);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isPostOfficeView = !this.isPostOfficeView;
  }

  editPostOffice(post_office: any) {
    this.postOffice = post_office;
    this.isPostOfficeView = true;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.postOffice.countryId=post_office.subDistrict.city.state.country.id;
    this.getState(post_office.subDistrict.city.state.country.id);
    this.postOffice.stateId=post_office.subDistrict.city.state.id;
    this.getCity(post_office.subDistrict.city.state.id);
    this.postOffice.cityId=post_office.subDistrict.city.id;
    this.getSubDistrict(post_office.subDistrict.city.id);
    this.postOffice.subDistrictId=post_office.subDistrict.id;
  }

  deletePostOffice(post_office: any) {
    Swal.fire({
      title: 'Post Office Delete',
      text: 'Are you want to delete this Post Office.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deletePostOffice(post_office.id).subscribe((response:any) => {
          if(response.status){
            this.post_offices = this.post_offices.filter((item: any)  => item !== post_office);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }

  postOfficeView() {
    this.isPostOfficeView = !this.isPostOfficeView;
  }
}
