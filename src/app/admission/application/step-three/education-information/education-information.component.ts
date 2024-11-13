import {Component, OnInit} from '@angular/core';
import {AdmissionApplicationService} from "../../../../Service/admission/admission/admissionApplication.service";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-education-information',
  templateUrl: './education-information.component.html',
  styleUrls: ['./education-information.component.css']
})
export class EducationInformationComponent implements OnInit{
  admissionApplication:any = new AdmissionApplication();
  constructor(private admissionApplicationService: AdmissionApplicationService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
  }
  getAdmissionApplicationView(){
    this.route.params.subscribe((params)=>{
      const admissionApplicationId = +params['id'];
      this.admissionApplicationService.getViewAdmissionApplication(admissionApplicationId).subscribe((response:any)=>{
        this.admissionApplication = response.data;

      });
    })
  }
}
