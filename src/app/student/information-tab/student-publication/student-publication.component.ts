import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {PersonInformation} from "../../../model/student/personInformation";
import {Publication} from "../../../model/student/publication";
import {PersonInformationService} from "../../../Service/student/personInformation.service";
import {StudentPublicationService} from "../../../Service/student/studentPublication.service";

@Component({
  selector: 'app-student-publication',
  templateUrl: './student-publication.component.html',
  styleUrls: ['./student-publication.component.css']
})
export class StudentPublicationComponent implements OnInit{
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
    this.route.params.subscribe((params)=>{
      const personId = +params['id'];
      this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
        this.personInformation = response.data;
        this.getPublication(this.personInformation.id);
      });
    })
  }
  getYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear+1; i > currentYear - 50; i--) {
      this.years.push(i);
    }
  }
  publicationInfoView() {
    this.isPublicationInfoView = true;
  }

  // Publication Start
  getPublication(personId:any){
    this.publicationService.getPublication(personId).subscribe((response:any)=>{
      this.publications = response.data;

    })
  }


  postPublication() {
    this.publication.studentPersonId = this.personInformation.id;
    this.publicationService.postPublication(this.publication).subscribe((response:any)=>{
      if (response.status){
        this.publication = new Publication();
        this.formPublication?.resetForm(this.publication);
        this.toastr.success(response.message);
        this.publications.push(response.data);
      }
    })
  }

  putPublication() {
    this.publication.studentPersonId = this.personInformation.id;
    this.publicationService.putPublication(this.publication, this.publication.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.publications.findIndex((item: Publication) => item.id === this.publication.id);
        this.publications[indexToUpdate] = response.data;
        this.publication = new Publication();
        this.formPublication?.resetForm(this.publication);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
      }
    })
  }

  cancelPublication() {
    this.publication = new Publication();
    this.formPublication?.resetForm(this.publication);
    this.isSaveButton = true;
    this.isUpdateButton = false;
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
  // Publication End
}
