import {Country} from "./country";

export class State{
  id: number | undefined;
  code: string | undefined;
  name: string | undefined;
  countryId:number|undefined;
  active: boolean = true;

  country:Country = new Country();
}
