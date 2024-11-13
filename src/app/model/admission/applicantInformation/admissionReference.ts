import {Reference} from "../../common-setup/reference";

export class AdmissionReference{
  id:number | undefined;
  code:number | undefined;
  admissionPersonId:number | undefined;
  referenceId:number | undefined;
  referenceUnitId:number | undefined;
  referenceSubUnitId:number | undefined;
  active:boolean = true;
}
