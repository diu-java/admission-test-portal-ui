import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {AdmissionFaqService} from "../../../Service/admission/admission-setup/admissionFaq.service";
import {AdmissionFaq} from "../../../model/admission/admission-setup/admissionFaq";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import Editor from "@ckeditor/ckeditor5-build-classic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import faqAnswer from "@ckeditor/ckeditor5-build-classic";
@Component({
  selector: 'app-admission-faq',
  templateUrl: './admission-faq.component.html',
  styleUrls: ['./admission-faq.component.css']
})
export class AdmissionFaqComponent implements OnInit{
  @ViewChild('faqForm') form: NgForm | undefined;
  admissionFaq:any = new AdmissionFaq();
  isFaqView:boolean = false;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  faqs:any=[];
  public faqAnswer: any = ClassicEditor;
  constructor(private service: AdmissionFaqService, private toastr: ToastrService, private titleService: Title) {
    this.titleService.setTitle('Admission FAQ')
  }
  ngOnInit() {
    this.getFaq();
  }
  getFaq() {
    this.service.getFaq().subscribe((response:any)=>{
      this.faqs = response.data;
    })
  }
  postFaq() {
    this.admissionFaq.active = true;
    this.service.postFaq(this.admissionFaq).subscribe((response:any)=>{
      if (response.status){
        this.admissionFaq = new AdmissionFaq();
        this.form?.resetForm(this.admissionFaq);
        this.admissionFaq.isOpen = false;
        this.toastr.success(response.message);
        this.faqs.push(response.data);
        this.isFaqView = false;
      }
    })
  }

  putFaq() {
    this.service.putFaq(this.admissionFaq, this.admissionFaq.id).subscribe((response:any)=>{
      if (response.status){
        this.toastr.success(response.message);
        let indexToUpdate = this.faqs.findIndex((item: AdmissionFaq) => item.id === this.admissionFaq.id);
        this.faqs[indexToUpdate] = response.data;
        this.admissionFaq = new AdmissionFaq();
        this.form?.resetForm(this.admissionFaq);
        this.admissionFaq.isOpen = false;
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isFaqView = false;
      }
    })
  }

  cancelFaq() {
    this.admissionFaq = new AdmissionFaq();
    this.form?.resetForm(this.admissionFaq);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isFaqView = false;
  }

  editFaq(faq: any) {
    this.admissionFaq = faq;
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isFaqView = true;
  }

  deleteFaq(faq: any) {
    Swal.fire({
      title: 'FAQ Delete',
      text: 'Are you want to delete this FAQ.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.service.deleteFaq(faq.id).subscribe((response:any) => {
          if(response.status){
            this.faqs = this.faqs.filter((item: any)  => item !== faq);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  faqView() {
    this.isFaqView = !this.isFaqView;
  }

    protected readonly Editor = Editor;
}
