import {AdmissionMarkHead} from "./admissionMarkHead";
import {AdmissionMarkTemplate} from "./admissionMarkTemplate";

export class AdmissionMarkDistribution {
  id: number | undefined;
  code: string | undefined;
  name: string | undefined;
  admissionMarkTemplateId: number | undefined;
  admissionMarkHeadId: number | undefined;
  mark: number | undefined;
  passMark: number | undefined;
  active: boolean = true;
  admissionMarkTemplate:AdmissionMarkTemplate = new AdmissionMarkTemplate();
  admissionMarkHead:AdmissionMarkHead = new AdmissionMarkHead();
}
