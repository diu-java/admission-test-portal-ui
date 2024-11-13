import {AdmissionApplicationType} from "../admission-setup/admissionApplicationType";
import {ProgramType} from "../../academic/configuration/programType";
import {Faculty} from "../../academic/institute/faculty";
import {Semester} from "../../academic/institute/semester";
import {SemesterType} from "../../academic/configuration/semesterType";
import {AdmissionCircular} from "../admission-circular/admissionCircular";

export class AdmissionApplication{
  id: number | undefined;
  code: string | undefined;
  name: string | undefined;
  email: string | undefined;
  mobile: string | undefined;
  genderId: number | undefined;
  bloodGroupId: number | undefined;
  applicationTypeId: number | undefined;
  programTypeId: number | undefined;
  semesterId: number | undefined;
  semesterTypeId: number | undefined;
  admissionCreditTransferId: number | undefined;
  admissionCircularId: number | undefined;
  admissionCircularFacultyId: number | undefined;
  admissionMembershipId: number | undefined;
  paymentAmount: number | undefined;
  paymentStatus: number | undefined;
  agreementRule: boolean = false;
  agreementPayment: boolean = false;
  agreementInformationProvided: number | undefined;
  active: boolean = true;
  admissionApplicationType:AdmissionApplicationType = new AdmissionApplicationType();
  programType:ProgramType = new ProgramType();
  faculty:Faculty = new Faculty()
  semester:Semester = new Semester()
  semesterType:SemesterType = new SemesterType()
  admissionCircular:AdmissionCircular = new AdmissionCircular();

}
