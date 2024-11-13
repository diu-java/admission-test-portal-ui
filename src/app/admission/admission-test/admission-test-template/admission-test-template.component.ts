import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {AdmissionTestTemplate} from "../../../model/admission/admission-test/admissionTestTemplate";
import {AdmissionTestTemplateService} from "../../../Service/admission/admission-test/admissionTestTemplate.service";
import {AdmissionAffiliateType} from "../../../model/admission/admission-setup/admissionAffiliateType";

@Component({
  selector: 'app-admission-test-template',
  templateUrl: './admission-test-template.component.html',
  styleUrls: ['./admission-test-template.component.css']
})
export class AdmissionTestTemplateComponent implements OnInit{
  @ViewChild('form') form: NgForm | undefined;
  admissionTestTemplate:any = new AdmissionTestTemplate();
  admission_test_templates:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isTestTemplateView:boolean = false;
  constructor(private admissionTestTemplateService: AdmissionTestTemplateService,
              private toastr: ToastrService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Admission Test Template')
  }
  ngOnInit() {
    this.getAdmissionTestTemplate();
  }
  getAdmissionTestTemplate() {
    this.admissionTestTemplateService.getAdmissionTestTemplate().subscribe((response:any)=>{
      this.admission_test_templates = response.data;
    })
  }
  admissionTestTemplateView() {
    this.isTestTemplateView = !this.isTestTemplateView;
  }
  postAdmissionTestTemplate() {
    this.admissionTestTemplate.active = true;
    this.admissionTestTemplateService.postAdmissionTestTemplate(this.admissionTestTemplate).subscribe((response:any)=>{
      if (response.status){
        this.admissionTestTemplate = new AdmissionTestTemplate();
        this.form?.resetForm(this.admissionTestTemplate);
        this.toastr.success(response.message);
        this.admission_test_templates.push(response.data);
        this.admissionTestTemplate.active = false;
        this.isTestTemplateView = false;
      }
    })
  }

  cancelAdmissionTestTemplate() {
    this.admissionTestTemplate = new AdmissionTestTemplate();
    this.form?.resetForm(this.admissionTestTemplate);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isTestTemplateView = !this.isTestTemplateView;
  }
  editAdmissionTestTemplate(admission_test_template: any) {
    this.admissionTestTemplate = admission_test_template;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }
  putAdmissionTestTemplate() {
    this.admissionTestTemplateService.putAdmissionTestTemplate(this.admissionTestTemplate, this.admissionTestTemplate.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.admission_test_templates.findIndex((item: AdmissionTestTemplate) => item.id === this.admissionTestTemplate.id);
        this.admission_test_templates[indexToUpdate] = response.data;
        this.admissionTestTemplate = new AdmissionAffiliateType();
        this.form?.resetForm(this.admissionTestTemplate);
        this.admissionTestTemplate.active = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  deleteAdmissionTestTemplate(admission_Test_template: any) {
    Swal.fire({
      title: 'Admission Test Template Delete',
      text: 'Are you want to delete this Admission Test Template.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionTestTemplateService.deleteAdmissionTestTemplate(admission_Test_template.id).subscribe((response:any) => {
          if(response.status){
            this.admission_test_templates = this.admission_test_templates.filter((item: any)  => item !== admission_Test_template);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  viewAdmissionTestTemplate(admission_test_template: any) {
    this.router.navigate(['/admission-test-template', admission_test_template.id]);
  }

}
