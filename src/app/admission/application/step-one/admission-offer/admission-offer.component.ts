import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdmissionOffer} from "../../../../model/admission/applicantInformation/admissionOffer";
import {AdmissionStudyCampusService} from "../../../../Service/admission/admission-setup/admissionStudyCampus.service";
import {ProgramService} from "../../../../Service/academic/institute/program.service";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionOfferService} from "../../../../Service/admission/application/admissionOffer.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admission-offer',
  templateUrl: './admission-offer.component.html',
  styleUrls: ['./admission-offer.component.css']
})
export class AdmissionOfferComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('admissionOfferForm') form: NgForm | undefined;
  isAdmissionOfferView:boolean = false;
  admissionOffer = new AdmissionOffer();
  admission_offers:any=[];
  study_campuses:any=[];
  programs:any=[];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  loading:boolean = false;
  constructor(private studyCampusService: AdmissionStudyCampusService, private programService: ProgramService,
              private toastr: ToastrService,
              private admissionOfferService: AdmissionOfferService) {
  }
  ngOnInit() {

    this.getStudyCampus();
    this.getProgram();
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionApplicationProgramChooses.forEach((item:any)=>{
      this.admissionOffer.programId = item.admissionCircularProgram.program.id;
    })
  }

  admissionOfferView() {
    this.isAdmissionOfferView = !this.isAdmissionOfferView;
    this.getAdmissionApplicationView();
    this.setCurrentDate();
  }
  setCurrentDate() {
    const now = new Date();
    now.setHours(now.getHours() + 6);
    this.admissionOffer.expireDate = now.toISOString().slice(0, 10);
  }
  getStudyCampus(){
    this.studyCampusService.getStudyCampusActive().subscribe((response:any)=>{
      this.study_campuses = response.data;
    })
  }
  getProgram(){
    this.programService.getProgramActive().subscribe((response:any)=>{
      this.programs = response.data;
    })
  }

  postAdmissionOffer() {
    this.loading = true;
    this.admissionOffer.admissionApplicationId = this.admissionApplication.id;
    this.admissionOffer.active = true;
    this.admissionOffer.status = 0;
    this.admissionOfferService.postAdmissionOffer(this.admissionOffer).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.admissionOffer = new AdmissionOffer();
        this.form?.resetForm(this.admissionOffer);
        this.toastr.success(response.message);
        this.admissionApplication.admissionOffers.push(response.data);
        this.isAdmissionOfferView = false;
      }
    })
  }

  putAdmissionOffer() {
    this.loading = true;
    this.admissionOffer.admissionApplicationId = this.admissionApplication.id;
    this.admissionOfferService.putAdmissionOffer(this.admissionOffer, this.admissionOffer.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.admissionApplication.admissionOffers.findIndex((item: AdmissionOffer) => item.id === this.admissionOffer.id);
        this.admissionApplication.admissionOffers[indexToUpdate] = response.data;
        this.admissionOffer = new AdmissionOffer();
        this.form?.resetForm(this.admissionOffer);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isAdmissionOfferView = false;
      }
    })
  }

  cancelAdmissionOffer() {
    this.admissionOffer = new AdmissionOffer();
    this.form?.resetForm(this.admissionOffer);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isAdmissionOfferView = !this.isAdmissionOfferView;
  }

  editAdmissionOffer(admission_offer: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isAdmissionOfferView = true;
    this.admissionOffer = admission_offer;
    this.admissionOffer.programId = admission_offer.program.id;
    this.admissionOffer.studyCampusId = admission_offer.studyCampus.id;
  }

  deleteAdmissionOffer(admission_offer: any) {

  }
}
