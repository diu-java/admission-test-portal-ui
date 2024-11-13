import {Component, OnInit} from '@angular/core';
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {AdmissionApplicationService} from "../../../../Service/admission/admission/admissionApplication.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit{
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
