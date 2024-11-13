import {Component, OnInit} from '@angular/core';
import {AdmissionMarkTeacherService} from "../../../Service/admission/admission-exam/admissionMarkTeacher.service";
import {EmployeeInformationService} from "../../../Service/employee/employeeInformation.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admission-mark-entry',
  templateUrl: './admission-mark-entry.component.html',
  styleUrls: ['./admission-mark-entry.component.css']
})
export class AdmissionMarkEntryComponent implements OnInit{
  admission_marks:any=[];
  constructor(private admissionMarkTeacherService:AdmissionMarkTeacherService,
              private employeeInformationService: EmployeeInformationService,
              private toastr: ToastrService, private route: ActivatedRoute,
              private router: Router,
  ) {
  }
  ngOnInit() {
    this.getAdmissionMarkTeacherSelf();
  }
  getAdmissionMarkTeacherSelf(){
    this.admissionMarkTeacherService.getAdmissionMarkTeacherSelf().subscribe((response:any)=>{
      this.admission_marks = response.data;
    })
  }

  getAdmissionMarkEntryView(admission_mark: any) {
    this.router.navigate(['/admission-mark-entry', admission_mark.id]);
  }
}
