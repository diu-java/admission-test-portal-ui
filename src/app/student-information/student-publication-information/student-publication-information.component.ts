import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonInformation} from "../../model/student/personInformation";
import {Publication} from "../../model/student/publication";
import {PersonInformationService} from "../../Service/student/personInformation.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {StudentPublicationService} from "../../Service/student/studentPublication.service";
import Swal from "sweetalert2";
import {StudentInformation} from "../../model/student/studentInformation";

@Component({
  selector: 'app-student-publication-information',
  templateUrl: './student-publication-information.component.html',
  styleUrls: ['./student-publication-information.component.css']
})
export class StudentPublicationInformationComponent implements OnInit{
  @Input() studentInformation:any = new StudentInformation();
  @ViewChild('publicationForm') formPublication: NgForm | undefined;
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isPublicationInfoView:boolean = false;
  publication = new Publication();
  publications:any=[];
  years: number[] = [];
  constructor(private service: PersonInformationService,
              private route: ActivatedRoute,
              private toastr: ToastrService, private publicationService: StudentPublicationService) {
  }
  ngOnInit() {
    this.getPersonInformationView();
    this.getYear();
  }
  getPersonInformationView(){
    this.getPublication(this.studentInformation.studentPerson.id);
    // this.route.params.subscribe((params)=>{
    //   const personId = +params['id'];
    //   this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
    //     this.personInformation = response.data;
    //     this.getPublication(this.personInformation.id);
    //   });
    // })
  }
  getYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear+1; i > currentYear - 50; i--) {
      this.years.push(i);
    }
  }
  publicationInfoView() {
    this.isPublicationInfoView = !this.isPublicationInfoView;
  }

  // Publication Start
  getPublication(personId:any){
    this.publicationService.getPublication(personId).subscribe((response:any)=>{
      this.publications = response.data;

    })
  }


  postPublication() {
    this.publication.studentPersonId = this.studentInformation.studentPerson.id;
    this.publicationService.postPublication(this.publication).subscribe((response:any)=>{
      if (response.status){
        this.publication = new Publication();
        this.formPublication?.resetForm(this.publication);
        this.toastr.success(response.message);
        this.publications.push(response.data);
        this.isPublicationInfoView = false;
      }
    })
  }

  putPublication() {
    this.publication.studentPersonId = this.studentInformation.studentPerson.id;
    this.publicationService.putPublication(this.publication, this.publication.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.publications.findIndex((item: Publication) => item.id === this.publication.id);
        this.publications[indexToUpdate] = response.data;
        this.publication = new Publication();
        this.formPublication?.resetForm(this.publication);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isPublicationInfoView = false;
      }
    })
  }

  cancelPublication() {
    this.publication = new Publication();
    this.formPublication?.resetForm(this.publication);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isPublicationInfoView = false;
  }

  editPublication(publication: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isPublicationInfoView = true;
    this.publication = publication;
  }

  deletePublication(publication: any) {
    Swal.fire({
      title: 'Publication Delete',
      text: 'Are you want to delete this Publication.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.publicationService.deletePublication(publication.id).subscribe((response:any) => {
          if(response.status){
            this.publications = this.publications.filter((item: any)  => item !== publication);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
