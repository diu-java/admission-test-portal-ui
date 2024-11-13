import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdmissionTestTemplateService} from "../../../Service/admission/admission-test/admissionTestTemplate.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionTestTemplate} from "../../../model/admission/admission-test/admissionTestTemplate";

@Component({
  selector: 'app-admission-test-template-view',
  templateUrl: './admission-test-template-view.component.html',
  styleUrls: ['./admission-test-template-view.component.css']
})
export class AdmissionTestTemplateViewComponent implements OnInit{
  admissionTestTemplate:any = new AdmissionTestTemplate();
  loading:boolean=false;
  constructor(private route: ActivatedRoute, private admissionTestTemplateService: AdmissionTestTemplateService,
              private toastr: ToastrService, private router: Router) {
  }
  ngOnInit() {
    this.getViewAdmissionTestTemplate();
  }
  getViewAdmissionTestTemplate(){
    this.route.params.subscribe((params)=>{
      const admissionTestTemplateId = +params['id'];
      this.admissionTestTemplateService.getAdmissionTestTemplateView(admissionTestTemplateId).subscribe((response:any)=>{
        this.admissionTestTemplate = response.data;
      });
    })
  }
  getBack() {
    this.router.navigate(['/admission-test-template']);
  }
}
