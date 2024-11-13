import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReferenceUnitService} from "../../../../Service/common-setup/referenceUnit.service";
import {ReferenceService} from "../../../../Service/common-setup/reference.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import {Reference} from "../../../../model/common-setup/reference";
import {ReferenceUnit} from "../../../../model/common-setup/referenceUnit";
import {ReferenceSubUnitService} from "../../../../Service/common-setup/referenceSubUnit.service";
import {ReferenceSubUnit} from "../../../../model/common-setup/referenceSubUnit";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-reference-sub-unit',
  templateUrl: './add-reference-sub-unit.component.html',
  styleUrls: ['./add-reference-sub-unit.component.css']
})
export class AddReferenceSubUnitComponent implements OnInit{
  @ViewChild('referenceSubUnitForm') form: NgForm | undefined;
  referenceUnit:any = new ReferenceUnit();
  referenceSubUnit:any = new ReferenceSubUnit();
  reference_sub_units:any=[];
  references:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor(private route: ActivatedRoute, private referenceUnitService: ReferenceUnitService, private referenceService: ReferenceService,
              private referenceSubUnitService: ReferenceSubUnitService,
              private toastr: ToastrService, private router: Router,
              private titleService: Title) {
  }
  ngOnInit() {
    this.getViewReference();
  }

  getViewReference(){
    this.route.params.subscribe((params)=>{
      const referenceUnitId = +params['id'];
      this.referenceUnitService.getReferenceUnitFind(referenceUnitId).subscribe((response:any)=>{
        this.referenceUnit = response.data;
        this.getReferenceSubUnit(this.referenceUnit.id)
      });
    })
  }

  getReferenceSubUnit(referenceUnitId:any) {
    this.referenceSubUnitService.getReferenceSubUnit(referenceUnitId).subscribe((response:any)=>{
      this.reference_sub_units = response.data;
    });
  }
  postReferenceSubUnit() {
    this.referenceSubUnit.active = true;
    this.referenceSubUnit.referenceUnitId = this.referenceUnit.id;
    this.referenceSubUnitService.postReferenceSubUnit(this.referenceSubUnit).subscribe((response:any)=>{
      if (response.status){
        this.referenceSubUnit = new ReferenceSubUnit();
        this.form?.resetForm(this.referenceSubUnit);
        this.toastr.success(response.message);
        this.reference_sub_units.push(response.data);
        this.referenceSubUnit.isEnableCode = false;
      }
    })
  }

  putReferenceSubUnit() {
    this.referenceSubUnit.referenceUnitId = this.referenceUnit.id;
    this.referenceSubUnitService.putReferenceSubUnit(this.referenceSubUnit, this.referenceSubUnit.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.reference_sub_units.findIndex((item: ReferenceSubUnit) => item.id === this.referenceSubUnit.id);
        this.reference_sub_units[indexToUpdate] = response.data;
        this.referenceSubUnit = new ReferenceSubUnit();
        this.form?.resetForm(this.referenceSubUnit);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.referenceSubUnit.isEnableCode = false;
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
            this.reference_sub_units = this.reference_sub_units.filter((item: any)  => item !== reference_sub_unit);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
  getBack() {
    this.router.navigate(['/add-reference-unit',this.referenceUnit?.reference?.id]);
  }
}
