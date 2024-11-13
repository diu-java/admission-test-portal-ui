import {Component, OnInit} from '@angular/core';
import {AdmissionTestTemplate} from "../../../model/admission/admission-test/admissionTestTemplate";
import {ActivatedRoute, Router} from "@angular/router";
import {AdmissionTestTemplateService} from "../../../Service/admission/admission-test/admissionTestTemplate.service";
import {ToastrService} from "ngx-toastr";
import {AdmissionTemplateCategory} from "../../../model/admission/admission-test/admissionTemplateCategory";
import {
  AdmissionTemplateCategoryService
} from "../../../Service/admission/admission-test/admissionTemplateCategory.service";

@Component({
  selector: 'app-admission-template-category-view',
  templateUrl: './admission-template-category-view.component.html',
  styleUrls: ['./admission-template-category-view.component.css']
})
export class AdmissionTemplateCategoryViewComponent implements OnInit{
  admissionTemplateCategory:any = new AdmissionTemplateCategory();
  loading:boolean=false;
  constructor(private route: ActivatedRoute, private admissionTemplateCategoryService: AdmissionTemplateCategoryService,
              private toastr: ToastrService,private router: Router) {
  }
  ngOnInit() {
    this.getViewAdmissionTestTemplate();
  }
  getViewAdmissionTestTemplate(){
    this.route.params.subscribe((params)=>{
      const admissionTemplateCategoryId = +params['id'];
      this.admissionTemplateCategoryService.getAdmissionTemplateCategoryView(admissionTemplateCategoryId).subscribe((response:any)=>{
        this.admissionTemplateCategory = response.data;
      });
    })
  }
  getBack() {
    this.router.navigate(['/admission-test-template',this.admissionTemplateCategory.admissionTestTemplate.id]);
  }
}
