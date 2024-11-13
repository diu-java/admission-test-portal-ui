import {Relation} from "../../common-setup/relation";

export class ApplicantGroupInsurance{
  id:number | undefined;
  admissionPersonId:number | undefined;
  relationId:number | undefined;
  name:string | undefined;
  phoneNumber:string | undefined;
  mobileNumber:string | undefined;
  dateOfBirth:string | undefined;
  annualIncome:number | undefined;
  email:string | undefined;
  nationalId:string | undefined;
  relationNominee:string | undefined;

  relation:Relation = new Relation();
}
