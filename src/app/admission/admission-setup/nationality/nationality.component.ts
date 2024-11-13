import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdmissionTestVenue} from "../../../model/admission/admission-setup/admissionTestVenue";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {NationalityService} from "../../../Service/common-setup/nationality.service";
import {Nationality} from "../../../model/common-setup/nationality";
@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.css']
})
export class NationalityComponent implements OnInit{
  @ViewChild('nationalityForm') form: NgForm | undefined;
  nationality  = new Nationality();
  nationalities:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor( private service: NationalityService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Nationality')
  }
  ngOnInit() {
    this.getNationality();
  }

  getNationality(){
    this.service.getNationality().subscribe((response:any)=>{
      this.nationalities = response.data;
    })
  }
  postNationality() {
    this.nationality.active = true;
    this.service.postNationality(this.nationality).subscribe((response:any)=>{
      if (response.status){
        this.nationality = new Nationality();
        this.form?.resetForm(this.nationality);
        this.toastr.success(response.message);
        this.nationalities.push(response.data);
      }
    })
  }
  putNationality() {
    this.service.putNationality(this.nationality, this.nationality.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.nationalities.findIndex((item: AdmissionTestVenue) => item.id === this.nationality.id);
        this.nationalities[indexToUpdate] = response.data;
        this.nationality = new Nationality();
        this.form?.resetForm(this.nationality);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }
  cancelNationality() {
    this.nationality = new Nationality();
    this.form?.resetForm(this.nationality);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }
  editNationality(test_venue: any) {
    this.nationality = test_venue;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }
  deleteNationality(test_venue: any) {
    Swal.fire({
      title: 'Nationality Delete',
      text: 'Are you want to delete this Nationality.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteNationality(test_venue.id).subscribe((response:any) => {
          if(response.status){
            this.nationalities = this.nationalities.filter((item: any)  => item !== test_venue);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
}
