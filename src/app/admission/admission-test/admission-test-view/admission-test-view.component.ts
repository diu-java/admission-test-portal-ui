import {Component, OnInit} from '@angular/core';
import {AdmissionTestTemplate} from "../../../model/admission/admission-test/admissionTestTemplate";
import {ActivatedRoute} from "@angular/router";
import {AdmissionTestTemplateService} from "../../../Service/admission/admission-test/admissionTestTemplate.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionTest} from "../../../model/admission/admission-test/admissionTest";
import {AdmissionTestService} from "../../../Service/admission/admission-test/admissionTest.service";

@Component({
  selector: 'app-admission-test-view',
  templateUrl: './admission-test-view.component.html',
  styleUrls: ['./admission-test-view.component.css']
})
export class AdmissionTestViewComponent implements OnInit{
  admissionTest:any = new AdmissionTest();
  loading:boolean=false;
  constructor(private route: ActivatedRoute, private admissionTestService: AdmissionTestService,
              private toastr: ToastrService,) {
  }
  ngOnInit() {
    this.getViewAdmissionTestTemplate();
  }
  getViewAdmissionTestTemplate(){
    this.route.params.subscribe((params)=>{
      const admissionTestId = +params['id'];
      this.admissionTestService.getAdmissionTestView(admissionTestId).subscribe((response:any)=>{
        this.admissionTest = response.data;
      });
    })
  }
}
