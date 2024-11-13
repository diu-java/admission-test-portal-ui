import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionMarkDistribution} from "../../../model/admission/admission-exam/admissionMarkDistribution";
import {NgForm} from "@angular/forms";
import {
  AdmissionMarkTemplate
} from "../../../model/admission/admission-exam/admissionMarkTemplate";
import {
  AdmissionMarkTemplateService
} from "../../../Service/admission/admission-exam/admissionMarkTemplate.service";
import {
  AdmissionMarkDistributionService
} from "../../../Service/admission/admission-exam/admissionMarkDistribution.service";
import {AdmissionFeeDetail} from "../../../model/admission/admission-setup/admissionFeeDetail";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";
import {AdmissionMarkHeadService} from "../../../Service/admission/admission-exam/admissionMarkHead.service";

@Component({
  selector: 'app-admission-mark-distribution-detail',
  templateUrl: './admission-mark-distribution.component.html',
  styleUrls: ['./admission-mark-distribution.component.css']
})
export class AdmissionMarkDistributionComponent implements OnInit{
  @ViewChild('admissionMarkTemplateForm') form: NgForm | undefined;
  @ViewChild('admissionMarkDistributionForm') formDetail: NgForm | undefined;
  admissionMarkDistribution:any = new AdmissionMarkDistribution();
  admissionMarkTemplate:any = new AdmissionMarkTemplate();
  mark_distribution_details:any=[]
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isDistributionSaveButton:boolean = true;
  isDistributionUpdateButton:boolean = false;
  isAdmissionMarkDistributionView:boolean = false;
  isAdmissionMarkTemplate:boolean = false;
  admission_mark_heads:any=[];
  constructor(private admissionMarkTemplateService: AdmissionMarkTemplateService,
              private admissionMarkDistributionService: AdmissionMarkDistributionService,
              private admissionMarkHeadService:AdmissionMarkHeadService,
              private toastr: ToastrService, private route: ActivatedRoute,
              ) {
  }
  ngOnInit() {
    this.getAdmissionMarkTemplateView();
    this.getAdmissionMarkHead();
  }

  getAdmissionMarkTemplateView(){
    this.route.params.subscribe((params)=>{
      const admissionMarkDistributionTemplateId = +params['id'];
      this.admissionMarkTemplateService.getAdmissionMarkTemplateView(admissionMarkDistributionTemplateId).subscribe((response:any)=>{
        this.admissionMarkTemplate = response.data;
        this.getAdmissionMarkDistribution(this.admissionMarkTemplate.id);
      });
    })
  }
  putAdmissionMarkTemplate() {
    this.admissionMarkTemplateService.putAdmissionMarkTemplate(this.admissionMarkTemplate, this.admissionMarkTemplate.id).subscribe((response:any)=>{
      if(response.status){
        this.toastr.success(response.message);
        this.getAdmissionMarkTemplateView();
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionMarkTemplate = false;
      }
    })
  }

  cancelAdmissionMarkTemplate() {
    this.isAdmissionMarkTemplate = !this.isAdmissionMarkTemplate;
    this.isUpdateButton = false;
    this.isSaveButton = true;
    this.isAdmissionMarkTemplate = false;
  }



  editAdmissionMarkTemplate(admissionMarkDistributionTemplate: any) {
    this.admissionMarkTemplate = admissionMarkDistributionTemplate;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionMarkTemplate = true;
  }
  getAdmissionMarkDistribution(admissionMarkTemplateId:any){
    this.admissionMarkDistributionService.getAdmissionMarkDistribution(admissionMarkTemplateId).subscribe((response:any)=>{
      this.mark_distribution_details = response.data;
    })
  }
  getAdmissionMarkHead(){
    this.admissionMarkHeadService.getAdmissionMarkHeadActive().subscribe((response:any)=>{
      this.admission_mark_heads = response.data;
    })
  }
  postAdmissionMarkDistribution() {
    this.admissionMarkDistribution.admissionMarkTemplateId = this.admissionMarkTemplate.id;
    this.admissionMarkDistribution.active = true;
    this.admissionMarkDistributionService.postAdmissionMarkDistribution(this.admissionMarkDistribution).subscribe((response:any)=>{
      if (response.status){
        this.admissionMarkDistribution = new AdmissionMarkDistribution();
        this.formDetail?.resetForm(this.admissionMarkDistribution);
        this.toastr.success(response.message);
        this.mark_distribution_details.push(response.data);
        this.isAdmissionMarkDistributionView = false;
        this.getAdmissionMarkTemplateView();
      }
    })
  }

  putAdmissionMarkDistribution() {
    this.admissionMarkDistribution.admissionMarkTemplateId = this.admissionMarkTemplate.id;
    this.admissionMarkDistributionService.putAdmissionMarkDistribution(this.admissionMarkDistribution, this.admissionMarkDistribution.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.mark_distribution_details.findIndex((item: AdmissionFeeDetail) => item.id === this.admissionMarkDistribution.id);
        this.mark_distribution_details[indexToUpdate] = response.data;
        this.admissionMarkDistribution = new AdmissionMarkDistribution();
        this.formDetail?.resetForm(this.admissionMarkDistribution);
        this.isDistributionUpdateButton = false;
        this.isDistributionSaveButton = true;
        this.isAdmissionMarkDistributionView = false;
      }
    })
  }

  cancelAdmissionMarkDistribution() {
    this.isAdmissionMarkDistributionView = !this.isAdmissionMarkDistributionView;
    this.admissionMarkDistribution = new AdmissionMarkDistribution();
  }
  editAdmissionMarkDistribution(mark_distribution_detail: any) {
    this.admissionMarkDistribution = mark_distribution_detail;
    this.admissionMarkDistribution.admissionMarkHeadId = mark_distribution_detail.admissionMarkHead.id;
    this.isDistributionUpdateButton = true;
    this.isDistributionSaveButton = false;
    this.isAdmissionMarkDistributionView = true;
  }

  deleteAdmissionMarkDistribution(mark_distribution_detail: any) {
    Swal.fire({
      title: 'Admission Mark Distribution Delete',
      text: 'Are you want to delete this Admission Mark Distribution.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionMarkDistributionService.deleteAdmissionMarkDistribution(mark_distribution_detail.id).subscribe((response:any) => {
          if(response.status){
            this.mark_distribution_details = this.mark_distribution_details.filter((item: any)  => item !== mark_distribution_detail);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  admissionMarkDistributionView() {
    this.isAdmissionMarkDistributionView = !this.isAdmissionMarkDistributionView;
    this.isDistributionSaveButton = true;
    this.isDistributionUpdateButton = false;
  }

  getBack() {

  }
}
