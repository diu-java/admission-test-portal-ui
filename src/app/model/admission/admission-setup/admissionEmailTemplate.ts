export class AdmissionEmailTemplate {
  id: number | undefined;
  code: string | undefined;
  subject: string | undefined;
  module: string | undefined;
  message: string = '';
  active: boolean = true;
}
