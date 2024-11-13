import {LevelTermTemplate} from "../level-term/levelTermTemplate";
import {MajorTemplate} from "./majorTemplate";
import {Program} from "../institute/program";
import {PaymentSchemeTemplate} from "../payment-scheme/paymentSchemeTemplate";

export class SyllabusTemplate{
  id: string | undefined;
  name: string | undefined;
  code: string | undefined;
  levelTermTemplateId: number | undefined;
  programId: number | undefined;
  majorTemplateId: number | undefined;
  levelTermId: number | undefined;
  paymentSchemeTemplateId: number | undefined;
  status: string = 'draft';
  comment: string | undefined;
  active: boolean = true;
  levelTermTemplate:LevelTermTemplate = new LevelTermTemplate();
  majorTemplate:MajorTemplate = new MajorTemplate();
  paymentSchemeTemplate: PaymentSchemeTemplate = new PaymentSchemeTemplate();
  program:Program = new Program();
}
