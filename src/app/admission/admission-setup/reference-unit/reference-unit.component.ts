import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Reference} from "../../../model/common-setup/reference";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {ReferenceUnit} from "../../../model/common-setup/referenceUnit";
import {ReferenceUnitService} from "../../../Service/common-setup/referenceUnit.service";
import {ReferenceService} from "../../../Service/common-setup/reference.service";

@Component({
  selector: 'app-reference-unit',
  templateUrl: './reference-unit.component.html',
  styleUrls: ['./reference-unit.component.css']
})
export class ReferenceUnitComponent implements OnInit{
  @ViewChild('referenceUnitForm') form: NgForm | undefined;
  referenceUnit  = new ReferenceUnit();
  reference_units:any=[];
  references:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  reference:any;
  constructor( private referenceUnitService: ReferenceUnitService, private referenceService: ReferenceService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Reference Unit')
  }
  ngOnInit() {
    this.getReference();
  }
  getReference(){
    this.referenceService.getReferenceActive().subscribe((response:any)=>{
      this.references = response.data.filter((item:any)=> item.isEnableCode === false);
    })
  }
  getReferenceUnit() {
    this.reference_units=[];
    if(this.reference){
      this.referenceUnitService.getReferenceUnit(this.reference).subscribe((response:any)=>{
        this.reference_units = response.data;
      })
    }else {
      this.toastr.warning('Invalid Reference')
    }
  }
  postReferenceUnit() {
    this.referenceUnit.active = true;
    this.referenceUnitService.postReferenceUnit(this.referenceUnit).subscribe((response:any)=>{
      if (response.status){
        this.referenceUnit = new ReferenceUnit();
        this.form?.resetForm(this.referenceUnit);
        this.toastr.success(response.message);
        this.reference_units.push(response.data);
      }
    })
  }

  putReferenceUnit() {
    this.referenceUnitService.putReferenceUnit(this.referenceUnit, this.referenceUnit.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.reference_units.findIndex((item: ReferenceUnit) => item.id === this.referenceUnit.id);
        this.reference_units[indexToUpdate] = response.data;
        this.referenceUnit = new ReferenceUnit();
        this.form?.resetForm(this.referenceUnit);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelReferenceUnit() {
    this.referenceUnit = new ReferenceUnit();
    this.form?.resetForm(this.referenceUnit);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editReferenceUnit(reference_unit: any) {
    this.referenceUnit = reference_unit;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.referenceUnit.referenceId = reference_unit.reference?.id;
  }

  deleteReferenceUnit(reference_unit: any) {
    Swal.fire({
      title: 'Reference Unit Delete',
      text: 'Are you want to delete this Reference Unit.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.referenceUnitService.deleteReferenceUnit(reference_unit.id).subscribe((response:any) => {
          if(response.status){
            this.reference_units = this.reference_units.filter((item: any)  => item !== reference_unit);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
