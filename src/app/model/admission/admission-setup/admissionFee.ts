import {Semester} from "../../academic/institute/semester";
import {SemesterType} from "../../academic/configuration/semesterType";
import {Program} from "../../academic/institute/program";

export class AdmissionFee {
  id: number | undefined;
  semesterId: number | undefined;
  semesterTypeId: number | undefined;
  programId: number | undefined;
  amount: number | undefined;
  active: boolean = true;
  semester:Semester = new Semester();
  semesterType:SemesterType = new SemesterType();
  program:Program = new Program();
}
