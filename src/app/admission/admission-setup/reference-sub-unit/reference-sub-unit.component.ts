import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ReferenceUnit} from "../../../model/common-setup/referenceUnit";
import {ReferenceUnitService} from "../../../Service/common-setup/referenceUnit.service";
import {ReferenceService} from "../../../Service/common-setup/reference.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {Reference} from "../../../model/common-setup/reference";
import Swal from "sweetalert2";
import {ReferenceSubUnitService} from "../../../Service/common-setup/referenceSubUnit.service";
import {ReferenceSubUnit} from "../../../model/common-setup/referenceSubUnit";

@Component({
  selector: 'app-reference-sub-unit',
  templateUrl: './reference-sub-unit.component.html',
  styleUrls: ['./reference-sub-unit.component.css']
})
export class ReferenceSubUnitComponent implements OnInit{
  @ViewChild('referenceSubUnitForm') form: NgForm | undefined;
  referenceSubUnit:any  = new ReferenceSubUnit();
  reference_units:any=[];
  reference_sub_units:any=[];
  references:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  reference:any;
  referenceUnitId:any;
  constructor( private referenceSubUnitService: ReferenceSubUnitService ,private referenceUnitService: ReferenceUnitService, private referenceService: ReferenceService,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Reference Sub Unit')
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
    this.reference_units = [];
    this.reference_sub_units = [];
    this.referenceUnitId = undefined;
    if(this.reference){
      this.referenceUnitService.getReferenceUnit(this.reference).subscribe((response:any)=>{
        this.reference_units = response.data.filter((item:any)=> item.isEnableCode === false);
      })
    }else {
      this.toastr.warning('Invalid Reference')
    }
  }
  getReferenceSubUnit() {
    this.reference_sub_units = [];
    if(this.referenceUnitId){
      this.referenceSubUnitService.getReferenceSubUnit(this.referenceUnitId).subscribe((response:any)=>{
        this.reference_sub_units = response.data;
      });
    }else {
      this.toastr.warning('Invalid Reference Unit')
    }
  }
  postReferenceSubUnit() {
    this.referenceSubUnit.active = true;
    this.referenceSubUnitService.postReferenceSubUnit(this.referenceSubUnit).subscribe((response:any)=>{
      if (response.status){
        this.referenceSubUnit = new ReferenceSubUnit();
        this.form?.resetForm(this.referenceSubUnit);
        this.toastr.success(response.message);
        this.reference_sub_units.push(response.data);
      }
    })
  }

  putReferenceSubUnit() {
    this.referenceSubUnitService.putReferenceSubUnit(this.referenceSubUnit, this.referenceSubUnit.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.reference_sub_units.findIndex((item: ReferenceSubUnit) => item.id === this.referenceSubUnit.id);
        this.reference_sub_units[indexToUpdate] = response.data;
        this.referenceSubUnit = new ReferenceSubUnit();
        this.form?.resetForm(this.referenceSubUnit);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelReferenceSubUnit() {
    this.referenceSubUnit = new ReferenceSubUnit();
    this.form?.resetForm(this.referenceSubUnit);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editReferenceSubUnit(reference_sub_unit: any) {
    this.referenceSubUnit = reference_sub_unit;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteReferenceSubUnit(reference_sub_unit: any) {
    Swal.fire({
      title: 'Reference Sub Unit Delete',
      text: 'Are you want to delete this Reference Sub Unit.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.referenceSubUnitService.deleteReferenceSubUnit(reference_sub_unit.id).subscribe((response:any) => {
          if(response.status){
            this.reference_units = this.reference_units.filter((item: any)  => item !== reference_sub_unit);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
