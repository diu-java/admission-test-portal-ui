import {LevelTerm} from "../level-term/levelTerm";
import {SyllabusTemplate} from "./syllabusTemplate";

export class SyllabusLevelTerm{
  id: number | undefined;
  sequence : number | undefined;
  levelUpCredit : number | undefined;
  syllabusTemplateId : number | undefined;
  levelTermId : number | undefined;

  levelTerm: LevelTerm = new LevelTerm();
  syllabusTemplate:SyllabusTemplate = new SyllabusTemplate();
}
