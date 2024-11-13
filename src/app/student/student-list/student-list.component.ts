import {Component, OnInit} from '@angular/core';
import {StudentInformationService} from "../../Service/student/studentInformation.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {PersonInformationService} from "../../Service/student/personInformation.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{
  students:any=[];
 constructor(private service: PersonInformationService, private router: Router,
  private titleService: Title) {
   this.titleService.setTitle('Student List');
 }
 ngOnInit() {
   this.getStudent();
 }
  getStudent(){
    this.service.getPersonInformation().subscribe((response:any)=>{
      this.students = response.data;
    })
  }

  editStudent(student: any) {
    this.service.getViewPersonInformation(student.id).subscribe((response:any)=>{
      this.router.navigate(['/student-profile', student.id]);
    })
  }
}
