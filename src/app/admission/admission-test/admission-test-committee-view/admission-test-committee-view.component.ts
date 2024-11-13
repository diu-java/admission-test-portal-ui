import {Component, OnInit} from '@angular/core';
import {AdmissionTestTemplate} from "../../../model/admission/admission-test/admissionTestTemplate";
import {ActivatedRoute} from "@angular/router";
import {AdmissionTestTemplateService} from "../../../Service/admission/admission-test/admissionTestTemplate.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionTestCommittee} from "../../../model/admission/admission-test/admissionTestCommittee";
import {AdmissionTestCommitteeService} from "../../../Service/admission/admission-test/admissionTestCommittee.service";

@Component({
  selector: 'app-admission-test-committee-view',
  templateUrl: './admission-test-committee-view.component.html',
  styleUrls: ['./admission-test-committee-view.component.css']
})
export class AdmissionTestCommitteeViewComponent implements OnInit{
  admissionTestCommittee:any = new AdmissionTestCommittee();
  loading:boolean=false;
  constructor(private route: ActivatedRoute, private admissionTestCommitteeService: AdmissionTestCommitteeService,
              private toastr: ToastrService,) {
  }
  ngOnInit() {
    this.getViewAdmissionTestTemplate();
  }
  getViewAdmissionTestTemplate(){
    this.route.params.subscribe((params)=>{
      const admissionTestCommitteeId = +params['id'];
      this.admissionTestCommitteeService.getAdmissionTestCommitteeView(admissionTestCommitteeId).subscribe((response:any)=>{
        this.admissionTestCommittee = response.data;
      });
    })
  }
}
