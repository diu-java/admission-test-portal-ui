export class PaymentHead{
  id: string | undefined;
  name: string | undefined;
  code: string | undefined;
  sequence: number | undefined;
  active: boolean = true;
  paymentHeadCategoryId: number | undefined;
}
