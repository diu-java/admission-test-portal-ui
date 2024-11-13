import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdmissionApplication} from "../../model/admission/admission/admissionApplication";

@Component({
  selector: 'app-admission-stage',
  templateUrl: './admission-stage.component.html',
  styleUrls: ['./admission-stage.component.css']
})
export class AdmissionStageComponent implements OnInit{
  admissionApplication = new AdmissionApplication();
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.getAdmissionApplicationView();
  }
  getAdmissionApplicationView(){
    this.route.params.subscribe((params)=>{
      this.admissionApplication.id = +params['id'];
    })
  }
  getBack() {
    this.router.navigate(['/admission-application']);

  }
}
