import {ProgramType} from "../configuration/programType";

export class Program{
  id: string | undefined;
  code: string | undefined;
  name: string | undefined;
  shortName: string | undefined;
  totalCredit: string | undefined;
  totalYear: string | undefined;
  programTypeId: number | undefined;
  departmentId: number | undefined;
  active: boolean = true;
  programType:ProgramType = new ProgramType();
}
