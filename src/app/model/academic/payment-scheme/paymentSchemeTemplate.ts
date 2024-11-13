import {Program} from "../institute/program";
import {LevelTermTemplate} from "../level-term/levelTermTemplate";

export class PaymentSchemeTemplate{
  id: number | undefined;

  name: string | undefined;
  code: string | undefined;
  programId: number | undefined;
  levelTermTemplateId: number | undefined;
  active: boolean = true;
  program: Program = new Program()
  levelTermTemplate: LevelTermTemplate = new LevelTermTemplate();
}
