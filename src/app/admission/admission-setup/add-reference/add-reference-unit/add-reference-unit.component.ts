import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReferenceUnitService} from "../../../../Service/common-setup/referenceUnit.service";
import {ReferenceService} from "../../../../Service/common-setup/reference.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {Reference} from "../../../../model/common-setup/reference";
import {ReferenceUnit} from "../../../../model/common-setup/referenceUnit";
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {ReferenceSubUnit} from "../../../../model/common-setup/referenceSubUnit";

@Component({
  selector: 'app-add-reference-unit',
  templateUrl: './add-reference-unit.component.html',
  styleUrls: ['./add-reference-unit.component.css']
})
export class AddReferenceUnitComponent implements OnInit{
  @ViewChild('referenceUnitForm') form: NgForm | undefined;
  reference = new Reference();
  referenceUnit = new ReferenceUnit();
  reference_units:any=[];
  references:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(private route: ActivatedRoute, private referenceUnitService: ReferenceUnitService, private referenceService: ReferenceService,
              private toastr: ToastrService, private router: Router,
              private titleService: Title) {
  }
  ngOnInit() {
    this.getViewReference();
  }

  getViewReference(){
    this.route.params.subscribe((params)=>{
      const referenceId = +params['id'];
      this.referenceService.getReferenceFind(referenceId).subscribe((response:any)=>{
        this.reference = response.data;
        this.getReferenceUnit(this.reference.id)
      });
    })
  }
  getReferenceUnit(referenceId:any) {
      this.referenceUnitService.getReferenceUnit(referenceId).subscribe((response:any)=>{
        this.reference_units = response.data;
      })
  }
  postReferenceUnit() {
    this.referenceUnit.active = true;
    this.referenceUnit.referenceId = this.reference.id;
    this.referenceUnitService.postReferenceUnit(this.referenceUnit).subscribe((response:any)=>{
      if (response.status){
        this.referenceUnit = new ReferenceUnit();
        this.form?.resetForm(this.referenceUnit);
        this.toastr.success(response.message);
        this.reference_units.push(response.data);
        this.referenceUnit.isEnableCode = false;
      }
    })
  }

  putReferenceUnit() {
    this.referenceUnit.referenceId = this.reference.id;
    this.referenceUnitService.putReferenceUnit(this.referenceUnit, this.referenceUnit.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.reference_units.findIndex((item: ReferenceUnit) => item.id === this.referenceUnit.id);
        this.reference_units[indexToUpdate] = response.data;
        this.referenceUnit = new ReferenceUnit();
        this.form?.resetForm(this.referenceUnit);
        this.referenceUnit.isEnableCode = false;
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

  addReferenceSubUnit(reference_unit: any) {
    this.router.navigate(['/add-reference-sub-unit', reference_unit.id]);
  }
  getBack() {
    this.router.navigate(['/reference']);
  }
}
