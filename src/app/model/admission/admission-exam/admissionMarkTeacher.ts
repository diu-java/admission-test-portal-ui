import {AdmissionExam} from "./admissionExam";
import {AdmissionMarkDistribution} from "./admissionMarkDistribution";

export class AdmissionMarkTeacher {
  id: number | undefined;
  employeeInfoId: number | undefined;
  admissionExamId: number | undefined;
  admissionMarkTemplateId: number | undefined;
  admissionMarkDistributionId: number | undefined;
  active: boolean = true;
  admissionExam:AdmissionExam = new AdmissionExam();
  admissionMarkDistribution:AdmissionMarkDistribution = new AdmissionMarkDistribution();
}
