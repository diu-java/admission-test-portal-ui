import {AdmissionMarkTemplate} from "./admissionMarkTemplate";

export class AdmissionExam {
  id: number | undefined;
  code: string | undefined;
  semesterId: number | undefined;
  admissionCircularId: number | undefined;
  admissionMarkTemplateId: number | undefined;
  totalApplicant: number | undefined;
  totalSelectedApplicant: number | undefined;
  totalWaiting: number | undefined;
  totalRejected: number | undefined;
  status: number | undefined;
  active: boolean = true;
  admissionMarkTemplate:AdmissionMarkTemplate = new AdmissionMarkTemplate();
}
