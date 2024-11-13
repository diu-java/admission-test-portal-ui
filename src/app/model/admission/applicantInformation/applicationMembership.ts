
import {AdmissionMembershipUserType} from "../admission-setup/admissionMembershipUserType";
import {AdmissionMembershipOrganization} from "../admission-setup/admissionMembershipOrganization";

export class ApplicationMembership{
  id:number | undefined;
  admissionPersonId:number | undefined;
  admissionMembershipUserTypeId:number | undefined;
  admissionMembershipOrganizationId:number | undefined;
  code:string | undefined;
  active:boolean = true;
  admissionMembershipUserType:AdmissionMembershipUserType  =new AdmissionMembershipUserType()
  admissionMembershipOrganization:AdmissionMembershipOrganization  =new AdmissionMembershipOrganization()
}
