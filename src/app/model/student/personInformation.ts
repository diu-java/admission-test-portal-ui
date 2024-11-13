import {Gender} from "../common-setup/gender";
import {BloodGroup} from "../common-setup/bloodGroup";
import {Country} from "../common-setup/country";
import {MaritalStatus} from "../common-setup/maritalStatus";
import {Religion} from "../common-setup/religion";


export class PersonInformation {
  id:number | undefined;

  title:string | undefined;
  firstName:string | undefined;
  middleName:string | undefined;
  lastName:string | undefined;
  nickName:string | undefined;
  fullName:string | undefined;
  code:string | undefined;
  issueDate:string | undefined;
  expireDate:string | undefined;
  workLocation:string | undefined;
  genderId:number | undefined;
  bloodGroupId:number | undefined;
  religionId:number | undefined;
  dateOfBirth:string | undefined;
  placeOfBirth:string | undefined;
  countryOfBirth:Country = new Country();
  maritalStatusId:number | undefined;
  spouseCompleteName:string | undefined;
  spouseBirthdate:string | undefined;
  numberOfChildren:number | undefined;
  nationality:string | undefined;
  email:string | undefined;
  personalEmail:string | undefined;
  personalPhone:string | undefined;
  tinId:string | undefined;
  tinAttachmentId:number | undefined;
  signatureAttachmentId:number | undefined;
  photoAttachmentId:number | undefined;
  nationalId:string | undefined;
  nationalAttachmentId:number | undefined;
  birthCertificateNo:string | undefined;
  birthCertificateAttachmentId:number | undefined;
  active:boolean=true;

  gender:Gender = new Gender();
  bloodGroup:BloodGroup = new BloodGroup();
  religion:Religion = new Religion();
  maritalStatus:MaritalStatus = new MaritalStatus();

}
