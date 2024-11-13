export class AdmissionOffer {
  id:number | undefined;
  admissionApplicationId:number | undefined;
  programId:number | undefined;
  studyCampusId: number | undefined;
  issueDate:string | undefined;
  expireDate:string | undefined;
  status:number | undefined;
  active:boolean = true;
}
