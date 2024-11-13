import {Level} from "./level";
import {Term} from "./term";

export class LevelTerm{
  id: number | undefined;
  sequence: number | undefined;
  levelTermTemplateId: number | undefined;
  levelId: number | undefined;
  termId: number | undefined;
  // name: string | undefined;
  level: Level = new Level();
  // term: Term = new Term()
}
