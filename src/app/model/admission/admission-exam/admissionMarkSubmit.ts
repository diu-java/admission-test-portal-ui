import {EmployeeInformation} from "../../employee/employeeInformation";
import {AdmissionMarkDistribution} from "./admissionMarkDistribution";
import {AdmissionMarkTeacher} from "./admissionMarkTeacher";

export class AdmissionMarkSubmit {
  id: number | undefined;
  employeeInfoId: number | undefined;
  admissionExamId: number | undefined;
  admissionMarkTemplateId: number | undefined;
  admissionMarkTeacherId: number | undefined;
  admissionMarkDistributionId: number | undefined;
  submittedDatetime: string | undefined;
  status: number | undefined;

  employeeInfo:EmployeeInformation = new EmployeeInformation();
  admissionMarkTeacher:AdmissionMarkTeacher = new AdmissionMarkTeacher();
  admissionMarkDistribution :AdmissionMarkDistribution = new AdmissionMarkDistribution();
}
