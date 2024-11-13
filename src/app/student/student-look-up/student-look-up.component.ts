import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {StudentInformationService} from "../../Service/student/studentInformation.service";
import {StudentInformation} from "../../model/student/studentInformation";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-student-look-up',
  templateUrl: './student-look-up.component.html',
  styleUrls: ['./student-look-up.component.css']
})
export class StudentLookUpComponent implements OnInit{
  studentId:any;
  studentInformation:any = new StudentInformation();
  isPhotoUploadOpen:boolean=false;
  loading = false;
  constructor(private toastr: ToastrService,
              private studentInformationService: StudentInformationService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Student Look Up')
  }
  ngOnInit() {
  }
  getStudentInformation() {
    this.loading = true;
    if(!this.studentId){
      this.loading = false;
      this.studentInformation = new StudentInformation();
      this.toastr.error('Student ID First');
    }else {
      this.studentInformation = new StudentInformation();
      this.studentInformationService.getStudentInformationSearch(this.studentId).subscribe((response:any)=>{
        this.loading = false;
        if(response.status){
          this.studentInformation = response.data;
        }else if(response!==true){
          this.toastr.warning(response.message);
        }
      }
      )
    }
  }
  onKeydownStudentInformation(event: any) {
    if (event.key === "Enter") {
      this.getStudentInformation();
    }
  }

  editStudentInformation(studentInformation: any) {
    this.studentInformationService.getViewStudentInformation(studentInformation.id).subscribe((response:any)=>{
      this.router.navigate(['/student-profile', studentInformation.studentPerson.id]);
    })
  }
}
