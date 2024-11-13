import {AdmissionEnrollmentType} from "../admission-setup/admissionEnrollmentType";
import {Semester} from "../../academic/institute/semester";
import {SemesterType} from "../../academic/configuration/semesterType";
import {Faculty} from "../../academic/institute/faculty";
import {Program} from "../../academic/institute/program";

export class AdmissionEnrollment{
  id:number | undefined;
  admissionEnrollmentTypeId:number | undefined;
  admissionApplicationId:number | undefined;
  studyCampusId:number | undefined;
  semesterId:number | undefined;
  semesterTypeId:number | undefined;
  facultyId:number | undefined;
  programId:number | undefined;
  batchId:number | undefined;
  deadline:string | undefined;
  payableAmount:number | undefined;
  paymentAmount:number | undefined;
  paymentStatus:number | undefined;
  status:number | undefined;
  active:boolean = true;
  admissionEnrollmentType:AdmissionEnrollmentType = new AdmissionEnrollmentType();
  semester:Semester = new Semester();
  semesterType:SemesterType = new SemesterType();
  faculty:Faculty = new Faculty();
  program:Program = new Program();
}
