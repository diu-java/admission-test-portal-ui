import {Country} from "../../common-setup/country";
import {City} from "../../common-setup/city";
import {SubDistrict} from "../../common-setup/subDistrict";

export class ApplicantAddressInformation{
  id:number | undefined;
  admissionPersonId:number | undefined;
  addressTypeId:number | undefined;
  countryId:number | undefined;
  stateId:number | undefined;
  cityId:number | undefined;
  subDistrictId:number | undefined;
  postOfficeId:number | undefined;
  postCode:string | undefined;
  address:string | undefined;
  country:Country = new Country();
  city:City = new City();
  subDistrict:SubDistrict = new SubDistrict();
}
