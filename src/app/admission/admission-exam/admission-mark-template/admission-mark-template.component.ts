import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {
  AdmissionMarkTemplate
} from "../../../model/admission/admission-exam/admissionMarkTemplate";
import {
  AdmissionMarkTemplateService
} from "../../../Service/admission/admission-exam/admissionMarkTemplate.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admission-mark-distribution-template',
  templateUrl: './admission-mark-template.component.html',
  styleUrls: ['./admission-mark-template.component.css']
})
export class AdmissionMarkTemplateComponent implements OnInit{
  @ViewChild('markTemplateForm') form: NgForm | undefined;
  admissionMarkTemplate:any = new AdmissionMarkTemplate();
  admission_mark_templates:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isMarkTemplateCircularView:boolean = false;
  constructor(private admissionMarkTemplateService: AdmissionMarkTemplateService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
              this.titleService.setTitle('Admission Mark Template')
  }
  ngOnInit() {
    this.getAdmissionMarkTemplate();
  }
  getAdmissionMarkTemplate() {
    this.admissionMarkTemplateService.getAdmissionMarkTemplate().subscribe((response:any)=>{
      this.admission_mark_templates = response.data;
    })
  }

  postAdmissionMarkTemplate() {
    this.admissionMarkTemplate.active = true;
    this.admissionMarkTemplateService.postAdmissionMarkTemplate(this.admissionMarkTemplate).subscribe((response:any)=>{
      if (response.status){
        this.admissionMarkTemplate = new AdmissionMarkTemplate();
        this.form?.resetForm(this.admissionMarkTemplate);
        this.toastr.success(response.message);
        this.admission_mark_templates.push(response.data);
        this.isMarkTemplateCircularView = false;
      }
    })
  }

  cancelAdmissionMarkTemplate() {
    this.admissionMarkTemplate = new AdmissionMarkTemplate();
    this.form?.resetForm(this.admissionMarkTemplate);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isMarkTemplateCircularView = !this.isMarkTemplateCircularView;
  }


  admissionMarkTemplateView() {
    this.isMarkTemplateCircularView = !this.isMarkTemplateCircularView;
  }

  deleteAdmissionMarkTemplate(admission_mark_template: any) {
    Swal.fire({
      title: 'Admission Mark Template Delete',
      text: 'Are you want to delete this Admission Mark Template.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionMarkTemplateService.deleteAdmissionMarkTemplate(admission_mark_template.id).subscribe((response:any) => {
          if(response.status){
            this.admission_mark_templates = this.admission_mark_templates.filter((item: any)  => item !== admission_mark_template);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  admissionMarkTemplateFind(admission_mark_template: any) {
    this.router.navigate(['/admission-mark-distribution-detail', admission_mark_template.id]);
  }
}
