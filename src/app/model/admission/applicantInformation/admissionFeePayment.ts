export class AdmissionFeePayment{
  id:number | undefined;
  admissionPersonId:number | undefined;
  paymentTypeId:number | undefined;
  paymentGatewayId:number | undefined;
  amount:number | undefined;
  status:number | undefined;
  transactionNo:string | undefined;
  paymentDate:string | undefined;
  redirectUrl:string | undefined;
}
