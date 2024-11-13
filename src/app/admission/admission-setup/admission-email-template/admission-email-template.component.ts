import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionEmailTemplate} from "../../../model/admission/admission-setup/admissionEmailTemplate";
import {AdmissionCircular} from "../../../model/admission/admission-circular/admissionCircular";
import Swal from "sweetalert2";
import {EmailTemplateServiceService} from "../../../Service/admission/admission-setup/emailTemplateService.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {SummernoteOptions} from "ngx-summernote/lib/summernote-options";

@Component({
  selector: 'app-admission-email-template',
  templateUrl: './admission-email-template.component.html',
  styleUrls: ['./admission-email-template.component.css']
})
export class AdmissionEmailTemplateComponent implements OnInit{
  @ViewChild('emailTemplateForm') form: NgForm | undefined;
  admissionEmailTemplate:any = new AdmissionEmailTemplate();
  loading:boolean = false;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isAdmissionEmailTemplateView:boolean = false;
  email_templates:any=[];
  config: SummernoteOptions = {
    height: 500,
    placeholder: '',
    uploadImagePath: '/api/upload',
    tabsize: 2,
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  };
  constructor(private service: EmailTemplateServiceService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getEmailTemplate();
  }


  emailTemplateView() {
    this.isAdmissionEmailTemplateView = !this.isAdmissionEmailTemplateView;
  }
  getEmailTemplate() {
    this.service.getEmailTemplate().subscribe((response:any)=>{
      this.email_templates = response.data;
    })
  }
  alertAdmin() {
    alert('Please check the current API key.');
  }
  postEmailTemplate() {
    this.loading = true;
    this.admissionEmailTemplate.active = true;
    this.service.postEmailTemplate(this.admissionEmailTemplate).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.admissionEmailTemplate = new AdmissionEmailTemplate();
        this.form?.resetForm(this.admissionEmailTemplate);
        this.toastr.success(response.message);
        this.email_templates.push(response.data);
        this.isAdmissionEmailTemplateView = false;
      }
    })
  }

  putEmailTemplate() {
    this.loading = true;
    this.service.putEmailTemplate(this.admissionEmailTemplate, this.admissionEmailTemplate.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.email_templates.findIndex((item: AdmissionCircular) => item.id === this.admissionEmailTemplate.id);
        this.email_templates[indexToUpdate] = response.data;
        this.admissionEmailTemplate = new AdmissionEmailTemplate();
        this.form?.resetForm(this.admissionEmailTemplate);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionEmailTemplateView = false;
      }
    })
  }

  cancelEmailTemplate() {
    this.admissionEmailTemplate = new AdmissionEmailTemplate();
    this.form?.resetForm(this.admissionEmailTemplate);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionEmailTemplateView = !this.isAdmissionEmailTemplateView;
  }

  editEmailTemplate(email_template: any) {
    this.admissionEmailTemplate = email_template;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionEmailTemplateView = true;
  }


  deleteEmailTemplate(email_template: any) {
    Swal.fire({
      title: 'Email Template Delete',
      text: 'Are you want to delete this Email Template.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteEmailTemplate(email_template.id).subscribe((response:any) => {
          if(response.status){
            this.email_templates = this.email_templates.filter((item: any)  => item !== email_template);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel');
      }
    });
  }
}
