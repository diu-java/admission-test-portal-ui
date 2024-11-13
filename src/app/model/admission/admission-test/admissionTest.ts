import {Semester} from "../../academic/institute/semester";
import {AdmissionCircular} from "../admission-circular/admissionCircular";
import {AdmissionIntake} from "../admission-setup/admissionIntake";
import {AdmissionTestTemplate} from "./admissionTestTemplate";
import {AdmissionTestCommittee} from "./admissionTestCommittee";

export class AdmissionTest {
  id: number | undefined;
  code: string | undefined;
  name: string | undefined;
  semesterId: number | undefined;
  admissionCircularId: number | undefined;
  admissionIntakeId: number | undefined;
  admissionTestTemplateId: number | undefined;
  admissionTestCommitteeId: number | undefined;
  enrollmentLastDate: string | undefined;
  status: number | undefined;
  active: boolean = true;
  semester:Semester = new Semester();
  admissionCircular:AdmissionCircular = new AdmissionCircular();
  admissionIntake:AdmissionIntake = new AdmissionIntake();
  admissionTestTemplate:AdmissionTestTemplate = new AdmissionTestTemplate();
  admissionTestCommittee:AdmissionTestCommittee = new AdmissionTestCommittee();
}
