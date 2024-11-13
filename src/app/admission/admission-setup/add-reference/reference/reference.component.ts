import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {Reference} from "../../../../model/common-setup/reference";
import {ReferenceService} from "../../../../Service/common-setup/reference.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit{
  @ViewChild('referenceForm') form: NgForm | undefined;
  reference  = new Reference();
  references:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  constructor( private service: ReferenceService, private router: Router,
               private toastr: ToastrService,
               private titleService: Title) {
    this.titleService.setTitle('Reference')
  }
  ngOnInit() {
    this.getReference();
  }
  getReference() {
    this.service.getReference().subscribe((response:any)=>{
      this.references = response.data;
    })
  }
  postReference() {
    this.reference.active = true;
    this.service.postReference(this.reference).subscribe((response:any)=>{
      if (response.status){
        this.reference = new Reference();
        this.form?.resetForm(this.reference);
        this.toastr.success(response.message);
        this.references.push(response.data);
      }
    })
  }

  putReference() {
    this.service.putReference(this.reference, this.reference.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.references.findIndex((item: Reference) => item.id === this.reference.id);
        this.references[indexToUpdate] = response.data;
        this.reference = new Reference();
        this.form?.resetForm(this.reference);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelReference() {
    this.reference = new Reference();
    this.form?.resetForm(this.reference);
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  editReference(reference: any) {
    this.reference = reference;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }

  deleteReference(reference: any) {
    Swal.fire({
      title: 'Reference Delete',
      text: 'Are you want to delete this Reference.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteReference(reference.id).subscribe((response:any) => {
          if(response.status){
            this.references = this.references.filter((item: any)  => item !== reference);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  addReferenceUnit(reference: any) {
    this.router.navigate(['/add-reference-unit', reference.id]);
  }
  formatName(name:any) {
    if (name) {
      const formattedName = name.split(' ').map((word:any) => {
          if (word.includes('.')) {
            return word
              .split('.')
              .map((part:any) => part.toUpperCase())
              .join('.');
          } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
        }).join(' ');
      return formattedName;
    }
  }
}
