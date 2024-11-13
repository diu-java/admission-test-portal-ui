import {Relation} from "../common-setup/relation";

export class Family{
  id:number | undefined;
  studentPersonId:number | undefined;
  relationId:number | undefined;
  name:string | undefined;
  phoneNumber:string | undefined;
  mobileNumber:string | undefined;
  occupation:string | undefined;
  dateOfBirth:string | undefined;
  education:string | undefined;
  occupationOrganization:string | undefined;
  occupationDesignation:string | undefined;
  annualIncome:number | undefined;
  email:string | undefined;
  nationalId:string | undefined;
  nidAttachmentId:number | undefined;
  late:boolean = false;

  relation:Relation = new Relation();
}
