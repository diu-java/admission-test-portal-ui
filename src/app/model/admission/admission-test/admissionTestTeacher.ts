import {AdmissionTest} from "./admissionTest";

export class AdmissionTestTeacher {
  id: number | undefined;
  employeeInfoId: number | undefined;
  admissionTestId: number | undefined;
  admissionTemplateCategoryId: number | undefined;
  admissionTemplateCategorySubjectId: number | undefined;
  status: number | undefined;
  active: boolean = true;
  admissionTest:AdmissionTest = new AdmissionTest();
}
