import {AdmissionTemplateCategory} from "./admissionTemplateCategory";
import {AdmissionTestSubject} from "./admissionTestSubject";

export class AdmissionTemplateCategorySubject {
  id: number | undefined;
  admissionTemplateCategoryId:number | undefined;
  admissionTestSubjectId:number | undefined;
  mark:number | undefined;
  passMark:number | undefined;
  isAuto: boolean = false;
  admissionTemplateCategory:AdmissionTemplateCategory = new AdmissionTemplateCategory();
  admissionTestSubject:AdmissionTestSubject = new AdmissionTestSubject();
}
