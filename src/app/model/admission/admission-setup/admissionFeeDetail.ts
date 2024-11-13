import {AdmissionFee} from "./admissionFee";

export class AdmissionFeeDetail {
  id: number | undefined;
  admissionFeeDetail: number | undefined;
  code: string | undefined;
  name: string | undefined;
  active: boolean = true;
  admissionFee:AdmissionFee = new AdmissionFee();
}
