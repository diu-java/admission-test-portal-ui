import {AdmissionTestCategory} from "./admissionTestCategory";
import {AdmissionTestTemplate} from "./admissionTestTemplate";

export class AdmissionTemplateCategory {
  id: number | undefined;
  admissionTestTemplateId:number | undefined;
  admissionTestCategoryId:number | undefined;
  mark:number | undefined;
  passMark:number | undefined;
  isPassMar: boolean = false;
  admissionTestCategory:AdmissionTestCategory = new AdmissionTestCategory();
  admissionTestTemplate:AdmissionTestTemplate = new AdmissionTestTemplate();
}
