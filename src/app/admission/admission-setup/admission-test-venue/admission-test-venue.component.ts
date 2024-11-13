import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestVenue} from "../../../model/admission/admission-setup/admissionTestVenue";
import {Title} from "@angular/platform-browser";
import {AdmissionTestVenueService} from "../../../Service/admission/admission-setup/admissionTestVenue.service";
import {AdmissionAffiliateUserType} from "../../../model/admission/admission-setup/admissionAffiliateUserType";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admission-test-venue',
  templateUrl: './admission-test-venue.component.html',
  styleUrls: ['./admission-test-venue.component.css']
})
export class AdmissionTestVenueComponent implements OnInit{
  @ViewChild('testVenueForm') form: NgForm | undefined;
  testVenue  = new AdmissionTestVenue();
  test_venues:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor( private service: AdmissionTestVenueService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Admission Test Venue')
  }
  ngOnInit() {
    this.getTestVenue();
  }

  getTestVenue(){
    this.service.getTestVenue().subscribe((response:any)=>{
      this.test_venues = response.data;
    })
  }

  postTestVenue() {
    this.testVenue.active = true;
    this.service.postTestVenue(this.testVenue).subscribe((response:any)=>{
      if (response.status){
        this.testVenue = new AdmissionTestVenue();
        this.form?.resetForm(this.testVenue);
        this.toastr.success(response.message);
        this.test_venues.push(response.data);
      }
    })
  }

  putTestVenue() {
    this.service.putTestVenue(this.testVenue, this.testVenue.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.test_venues.findIndex((item: AdmissionTestVenue) => item.id === this.testVenue.id);
        this.test_venues[indexToUpdate] = response.data;
        this.testVenue = new AdmissionTestVenue();
        this.form?.resetForm(this.testVenue);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelTestVenue() {
    this.testVenue = new AdmissionTestVenue();
    this.form?.resetForm(this.testVenue);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editTestVenue(test_venue: any) {
    this.testVenue = test_venue;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteTestVenue(test_venue: any) {
    Swal.fire({
      title: 'Test Venue Delete',
      text: 'Are you want to delete this Test Venue.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteTestVenue(test_venue.id).subscribe((response:any) => {
          if(response.status){
            this.test_venues = this.test_venues.filter((item: any)  => item !== test_venue);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
}
