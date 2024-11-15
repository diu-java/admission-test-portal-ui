import {AdmissionApplicationType} from "../admission-setup/admissionApplicationType";
import {ProgramType} from "../../academic/configuration/programType";
import {Faculty} from "../../academic/institute/faculty";
import {AdmissionCircular} from "../admission-circular/admissionCircular";
import {Gender} from "../../common-setup/gender";
import {Religion} from "../../common-setup/religion";
import {BloodGroup} from "../../common-setup/bloodGroup";
import {MaritalStatus} from "../../common-setup/maritalStatus";
import {Country} from "../../common-setup/country";

export class AdmissionPerson{
  id: number | undefined;
  admissionApplicationId: number | undefined;
  title: string | undefined;
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
  nickName: string | undefined;
  genderId: number | undefined;
  religionId: number | undefined;
  bloodGroupId: number | undefined;
  dateOfBirth: string | undefined;
  placeOfBirth: string | undefined;
  maritalStatusId: number | undefined;
  spouseCompleteName: string | undefined;
  spouseBirthdate: string | undefined;
  numberOfChildren: number | undefined;
  mailingAddressId: number | undefined;
  nationality: string | undefined;
  email: string | undefined;
  personalEmail: string | undefined;
  personalPhone: string | undefined;
  photoAttachmentId: number | undefined;
  tinId: string | undefined;
  tinAttachmentId: number | undefined;
  nationalId: string | undefined;
  nationalityId: number | undefined;
  nationalAttachmentId: number | undefined;
  birthCertificateNo: string | undefined;
  birthCertificateAttachmentId: string | undefined;
  active: boolean = true;
  admissionApplicationType:AdmissionApplicationType = new AdmissionApplicationType();
  programType:ProgramType = new ProgramType();
  faculty:Faculty = new Faculty()
  admissionCircular:AdmissionCircular = new AdmissionCircular();
  gender:Gender = new Gender();
  religion:Religion = new Religion();
  bloodGroup:BloodGroup = new BloodGroup();
  maritalStatus:MaritalStatus = new MaritalStatus();
  countryOfBirth:Country = new Country();
}
