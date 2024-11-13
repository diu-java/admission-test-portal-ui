import {AdmissionTestVenue} from "../admission-setup/admissionTestVenue";
import {AdmissionCircularTestSchedule} from "../admission-circular/admissionCircularTestSchedule";

export class AdmissionAdmitCard{
  id:number | undefined;
  admissionApplicationId:number | undefined;
  admissionTestVenueId:number | undefined;
  admissionCircularTestScheduleId:number | undefined;
  active:boolean = true;
  admissionTestVenue:AdmissionTestVenue = new AdmissionTestVenue();
  admissionCircularTestSchedule:AdmissionCircularTestSchedule = new AdmissionCircularTestSchedule();
}
