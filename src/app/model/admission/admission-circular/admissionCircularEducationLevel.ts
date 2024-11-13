import {Faculty} from "../../academic/institute/faculty";
import {AdmissionApplicationType} from "../admission-setup/admissionApplicationType";
import {ProgramType} from "../../academic/configuration/programType";
import {Semester} from "../../academic/institute/semester";

export class AdmissionCircularEducationLevel{
  id: number | undefined;
  admissionCircularId: number | undefined;
  levelOfEducationId: number | undefined;
  isMandatory:boolean = false;
  active:boolean = true;

}
