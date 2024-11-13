import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonInformation} from "../../model/student/personInformation";
import {BankInformation} from "../../model/student/bankInformation";
import {ToastrService} from "ngx-toastr";
import {BankService} from "../../Service/common-setup/bank.service";
import {CurrencyService} from "../../Service/common-setup/currency.service";
import {StudentBankInformationService} from "../../Service/student/studentBankInformation.service";
import Swal from "sweetalert2";
import {StudentInformation} from "../../model/student/studentInformation";

@Component({
  selector: 'app-student-bank',
  templateUrl: './student-bank.component.html',
  styleUrls: ['./student-bank.component.css']
})
export class StudentBankComponent implements OnInit{
  @Input() studentInformation:any = new StudentInformation();
  @ViewChild('bankInformationForm') formBankInformation: NgForm | undefined;
  personInformation = new PersonInformation();
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;
  isBankInfoView:boolean = false;
  bankInformation = new BankInformation();
  bank_informations:any=[];
  banks:any=[];
  currencies:any=[];
  constructor(private toastr: ToastrService, private bankService: BankService,
              private currencyService: CurrencyService,
              private bankInformationService: StudentBankInformationService) {
  }
  ngOnInit() {
    this.getPersonInformationView();
    this.getBank();
    this.getCurrency();
  }
  getPersonInformationView(){
    this.getBankInformation(this.studentInformation.studentPerson.id);
    // this.route.params.subscribe((params)=>{
    //   const personId = +params['id'];
    //   this.service.getViewPersonInformation(personId).subscribe((response:any)=>{
    //     this.personInformation = response.data;
    //
    //     this.getBankInformation(this.personInformation.id);
    //   });
    // })
  }
  bankInfoView() {
    this.isBankInfoView = !this.isBankInfoView;
    this.bankInformation = new BankInformation();
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }
  getBank(){
    this.bankService.getBankActive().subscribe((response:any)=>{
      this.banks = response.data;
    })
  }
  getCurrency(){
    this.currencyService.getCurrencyActive().subscribe((response:any)=>{
      this.currencies = response.data;
    })
  }

  // Bank Information Start
  getBankInformation(personId:any){
    this.bankInformationService.getBankInformation(personId).subscribe((response:any)=>{
      this.bank_informations = response.data;
    })
  }

  postBankInformation() {
    this.bankInformation.studentPersonId = this.studentInformation.studentPerson.id;
    this.bankInformationService.postBankInformation(this.bankInformation).subscribe((response:any)=>{
      if (response.status){
        this.bankInformation = new BankInformation();
        this.formBankInformation?.resetForm(this.bankInformation);
        this.toastr.success(response.message);
        this.bank_informations.push(response.data);
        this.isBankInfoView = false;
      }
    })
  }

  putBankInformation() {
    this.bankInformation.studentPersonId = this.studentInformation.studentPerson.id;
    this.bankInformationService.putBankInformation(this.bankInformation, this.bankInformation.id).subscribe((response:any)=>{
      if (response.status){
        let indexToUpdate = this.bank_informations.findIndex((item: BankInformation) => item.id === this.bankInformation.id);
        this.bank_informations[indexToUpdate] = response.data;
        this.bankInformation = new BankInformation();
        this.formBankInformation?.resetForm(this.bankInformation);
        this.toastr.success(response.message);
        this.isUpdateButton = false;
        this.isSaveButton = true;
        this.isBankInfoView = false;
      }
    })
  }

  cancelBankInformation() {
    this.bankInformation = new BankInformation();
    this.formBankInformation?.resetForm(this.bankInformation);
    this.isSaveButton = true;
    this.isUpdateButton = false;
    this.isBankInfoView = false;
  }

  editBankInformation(bank_information: any) {
    this.isUpdateButton = true;
    this.isSaveButton = false;
    this.isBankInfoView = true;
    this.bankInformation = bank_information;
    this.bankInformation.bankId = bank_information.bank.id;
    this.bankInformation.currencyId = bank_information.currency.id;
  }

  deleteBankInformation(bank_information: any) {
    Swal.fire({
      title: 'Bank Information Delete',
      text: 'Are you want to delete this Bank Information.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.value) {
        this.bankInformationService.deleteBankInformation(bank_information.id).subscribe((response:any) => {
          if(response.status){
            this.bank_informations = this.bank_informations.filter((item: any)  => item !== bank_information);
            this.toastr.success(response.message);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Cancel')
      }
    });
  }
}
