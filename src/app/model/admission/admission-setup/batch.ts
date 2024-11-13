import {Program} from "../../academic/institute/program";
import {Semester} from "../../academic/institute/semester";
import {Shift} from "../../academic/institute/shift";
import {SyllabusTemplate} from "../../academic/syllabus/syllabusTemplate";
import {PaymentSchemeTemplate} from "../../academic/payment-scheme/paymentSchemeTemplate";
import {LevelTermTemplate} from "../../academic/level-term/levelTermTemplate";


export class Batch{
  id: string | undefined;
  name: string | undefined;
  code: string | undefined;
  programId: number | undefined;
  semesterId: number | undefined;
  syllabusTemplateId: number | undefined;
  shiftId: number | undefined;
  paymentSchemeTemplateId: number | undefined;
  levelTermTemplateId: number | undefined;
  active: boolean = true;
  syllabusTemplate:SyllabusTemplate = new SyllabusTemplate();
  paymentSchemeTemplate: PaymentSchemeTemplate = new PaymentSchemeTemplate();
  program:Program = new Program();
  semester:Semester = new Semester();
  shift:Shift = new Shift();
  levelTermTemplate:LevelTermTemplate = new LevelTermTemplate();
}
