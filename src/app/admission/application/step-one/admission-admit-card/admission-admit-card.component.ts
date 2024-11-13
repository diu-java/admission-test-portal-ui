import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdmissionAdmitCard} from "../../../../model/admission/applicantInformation/admissionAdmitCard";
import {AdmissionAdmitCardService} from "../../../../Service/admission/application/admissionAdmitCard.service";
import {AdmissionApplication} from "../../../../model/admission/admission/admissionApplication";
import {ToastrService} from "ngx-toastr";
import {AdmissionPerson} from "../../../../model/admission/admission/admissionPerson";
import {AdmissionTestVenueService} from "../../../../Service/admission/admission-setup/admissionTestVenue.service";
import Swal from "sweetalert2";
import {TabService} from "../../../../Service/tab.service";
import {AdmissionOffer} from "../../../../model/admission/applicantInformation/admissionOffer";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-admission-admit-card',
  templateUrl: './admission-admit-card.component.html',
  styleUrls: ['./admission-admit-card.component.css']
})
export class AdmissionAdmitCardComponent implements OnInit{
  @Input() admissionApplication:any = new AdmissionApplication();
  @ViewChild('admissionAdmitCardForm') form: NgForm | undefined;
  admissionAdmitCard:any = new AdmissionAdmitCard()
  admissionPerson:any = new AdmissionPerson()
  test_venues:any=[];
  enableAdmitCard:boolean = false;
  enableAdmission:boolean = false;
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  loading:boolean = false;
  activeTab = 1;
  constructor(private admissionAdmitCardService: AdmissionAdmitCardService, private admissionTestVenueService: AdmissionTestVenueService,
              private toastr: ToastrService, private tabService: TabService) {
  }
  ngOnInit() {
    this.getAdmissionApplicationView();
    this.getAdmissionTestVenue();
  }
  getAdmissionApplicationView(){
    this.admissionApplication.admissionPersons.forEach((person:any)=>{
      this.admissionPerson = person;
    });
  }
  openAdmitCard() {
    this.enableAdmitCard = true;
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }

  getAdmitCard(admit_card:any) {
    this.admissionAdmitCardService.getAdmissionAdmitCardPDF(this.admissionApplication.id).subscribe((response:Blob)=>{
        this.loading = false;
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'admit_card_'+this.admissionApplication.id+'.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('File download error:', error);
      }
    )
  }
  previewAdmitCard(admit_card:any) {
    Swal.fire({
      title: 'Loading document...',
      text: 'Please wait...',
      didOpen: () => {
        Swal.showLoading();
      },
      showConfirmButton: false,
    });
    this.admissionAdmitCardService.getAdmissionAdmitCardPDF(this.admissionApplication.id).subscribe(
      (response: Blob) => {
        this.loading = false; // Stop loading
        if (!response) {
          this.toastr.error('No document retrieved.');
          return;
        }
        const contentType = response.type || 'application/octet-stream'; // Fallback to 'application/octet-stream'
        const blob = new Blob([response], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        let htmlContent: string;
        // Prepare content based on the MIME type
        if (contentType === 'application/pdf') {
          htmlContent = `<iframe src="${url}" width="100%" height="700px" frameborder="0"></iframe>`;
        } else if (contentType.startsWith('image/')) {
          htmlContent = `<img src="${url}" width="100%"/>`;
        } else {
          this.toastr.error('Unsupported file type for preview.');
          window.URL.revokeObjectURL(url); // Clean up URL if unsupported type
          return;
        }
        // Show the document in a modal
        Swal.fire({
          title: 'Admit Card',
          html: htmlContent,
          width: '100%',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: 'Close',
          willClose: () => {
            // Revoke the object URL when the modal closes
            window.URL.revokeObjectURL(url);
          },
        });
      },
      (error) => {
        this.loading = false; // Stop loading
        console.error('File preview error:', error);
        this.toastr.error('Failed to preview the document.');
      }
    );
  }
  sendAdmitCard(admitCardId:any) {
    Swal.fire({
      title: 'Send Email',
      text: 'Are you want to send Email.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionAdmitCardService.sendAdmissionAdmitCard(admitCardId).subscribe((response:any) => {
          if(response.status){
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }

  getAdmissionTestVenue(){
    this.admissionTestVenueService.getTestVenueActive().subscribe((response:any)=>{
      this.test_venues = response.data;
    })
  }
  postAdmissionAdmitCard() {
    this.loading = true;
    this.admissionAdmitCard.admissionApplicationId = this.admissionApplication.id;
    this.admissionAdmitCardService.postAdmissionAdmitCard(this.admissionAdmitCard).subscribe((response:any)=>{
      this.loading = false;
      if(response.status){
        this.toastr.success(response.message);
        this.enableAdmitCard = false;
        this.enableAdmission = true;
        this.admissionApplication.admissionAdmitCards.push(response.data)
      }
    })
  }
  cancelAdmissionAdmitCard() {
    this.enableAdmitCard = false;
    this.admissionAdmitCard = new AdmissionAdmitCard();
    this.activeTab = 1;
  }

  editAdmitCard(admit_card: any) {
    console.log(admit_card)
    this.admissionAdmitCard = admit_card;
    this.enableAdmitCard = true;
    this.admissionApplication.isAdmitCard = false;
    this.isSaveButton = false;
    this.isUpdateButton = true;
    this.admissionAdmitCard.admissionCircularTestScheduleId = admit_card.admissionCircularTestSchedule.id;
    this.admissionAdmitCard.admissionTestVenueId = admit_card.admissionTestVenue.id;
  }

  putAdmissionAdmitCard() {
    this.loading = true;
    this.admissionAdmitCard.admissionApplicationId = this.admissionApplication.id;
    this.admissionAdmitCardService.putAdmissionAdmitCard(this.admissionAdmitCard, this.admissionAdmitCard.id).subscribe((response:any)=>{
      this.loading = false;
      if (response.status){
        let indexToUpdate = this.admissionApplication.admissionAdmitCards.findIndex((item: AdmissionOffer) => item.id === this.admissionAdmitCard.id);
        this.admissionApplication.admissionAdmitCards[indexToUpdate] = response.data;
        this.admissionAdmitCard = new AdmissionOffer();
        this.form?.resetForm(this.admissionAdmitCard);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.enableAdmitCard = false;
      }
    })
  }

  deleteAdmitCard(admit_card: any) {
    Swal.fire({
      title: 'Admit Card Delete',
      text: 'Are you want to delete this Admit Card.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.admissionAdmitCardService.deleteAdmissionAdmitCard(admit_card.id).subscribe((response:any) => {
          if(response.status){
            this.admissionApplication.admissionAdmitCards = this.admissionApplication.admissionAdmitCards.filter((item: any)  => item !== admit_card);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
