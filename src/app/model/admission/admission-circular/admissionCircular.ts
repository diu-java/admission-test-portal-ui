import {Faculty} from "../../academic/institute/faculty";
import {AdmissionApplicationType} from "../admission-setup/admissionApplicationType";
import {ProgramType} from "../../academic/configuration/programType";
import {Semester} from "../../academic/institute/semester";
import {SemesterType} from "../../academic/configuration/semesterType";

export class AdmissionCircular{
  id: number | undefined;
  code: string | undefined;
  name: string | undefined;
  admissionApplicationTypeId: number | undefined;
  programTypeId: number | undefined;
  semesterId: number | undefined;
  semesterTypeId: number | undefined;
  facultyId: number | undefined;
  issueDate: string | undefined;
  expireDate: string | undefined;
  agreementDetail = '';
  amount: number | undefined;
  isCreditTransfer: boolean = false;
  chooseNumber: number | undefined;
  active: boolean = true;
  enableAgreement: boolean = false;
  faculty:Faculty = new Faculty();
  admissionApplicationType: AdmissionApplicationType = new AdmissionApplicationType();
  programType: ProgramType = new ProgramType();
  semester: Semester = new Semester();
  semesterType: SemesterType = new SemesterType();
}
