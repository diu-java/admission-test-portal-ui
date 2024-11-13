import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SummernoteOptions} from "ngx-summernote/lib/summernote-options";
import {AdmissionApplication} from "../../../model/admission/admission/admissionApplication";
import {NgForm} from "@angular/forms";
import {AdmissionOffer} from "../../../model/admission/applicantInformation/admissionOffer";
import {AdmissionMessageLog} from "../../../model/admission/applicantInformation/admissionMessageLog";
import {AdmissionMessageLogService} from "../../../Service/admission/application/admissionMessageLog.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admission-log',
  templateUrl: './admission-log.component.html',
  styleUrls: ['./admission-log.component.css']
})
export class AdmissionLogComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('admissionMessageLogForm') form: NgForm | undefined;
  admissionMessageLog:any = new AdmissionMessageLog();
  admission_message_logs:any=[];
  programs:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  loading:boolean = false;
  constructor(private admissionMessageLogService: AdmissionMessageLogService, private toastr: ToastrService) {
  }
  ngOnInit() {
  }
  config: SummernoteOptions = {
    height: 300,
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

  postAdmissionMessageLog() {
    this.loading = true;
    this.admissionMessageLog.admissionApplicationId = this.admissionApplication.id;
    this.admissionMessageLogService.postAdmissionMessageLog(this.admissionMessageLog).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.admissionMessageLog = new AdmissionMessageLog();
        this.form?.resetForm(this.admissionMessageLog);
        this.toastr.success(response.message);
        this.admissionApplication.admissionMessageLogs.push(response.data);
        this.admissionApplication.admissionMessageLogs.sort((a:any, b:any) => Number(b.id) - Number(a.id));
      }
    })
  }
}
