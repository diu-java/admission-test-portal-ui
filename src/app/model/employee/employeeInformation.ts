import {Designation} from "../common-setup/designation";
import {Department} from "../common-setup/department";
import {Country} from "../common-setup/country";
import {EmployeeCategory} from "../common-setup/employeeCategory";
import {EmployeeType} from "../common-setup/employeeType";
import {MaritalStatus} from "../common-setup/maritalStatus";
import {Gender} from "../common-setup/gender";
import {BloodGroup} from "../common-setup/bloodGroup";
import {Faculty} from "../academic/institute/faculty";

export class EmployeeInformation {
  id:number | undefined;
  employeeId:string | undefined;
  title:string | undefined;
  firstName:string | undefined;
  middleName:string | undefined;
  lastName:string | undefined;
  nickName:string | undefined;
  fullName:string | undefined;
  departmentId:number | undefined;
  designationId:number | undefined;
  facultyId:number | undefined;
  employeeCategoryId:number | undefined;
  employeeTypeId:number | undefined;
  managerId:number | undefined;
  joinDate:string | undefined;
  workLocation:string | undefined;
  genderId:number | undefined;
  bloodGroupId:number | undefined;
  dateOfBirth:string | undefined;
  placeOfBirth:string | undefined;
  countryOfBirth:Country = new Country();
  maritalStatusId:number | undefined;
  spouseCompleteName:string | undefined;
  spouseBirthdate:string | undefined;
  numberOfChildren:number | undefined;
  nationality:string | undefined;
  workPhone:string | undefined;
  phoneExtension:string | undefined;
  email:string | undefined;
  personalEmail:string | undefined;
  personalPhone:string | undefined;
  tinId:string | undefined;
  tinAttachmentId:number | undefined;
  nationalId:string | undefined;
  nationalAttachmentId:number | undefined;
  birthCertificateNo:string | undefined;
  birthCertificateAttachmentId:number | undefined;
  active:boolean=true;

  designation:Designation = new Designation();
  department:Department = new Department();
  faculty:Faculty = new Faculty();
  employeeCategory:EmployeeCategory = new EmployeeCategory();
  employeeType: EmployeeType = new EmployeeType();
  maritalStatus:MaritalStatus = new MaritalStatus();
  gender:Gender = new Gender();
  bloodGroup:BloodGroup = new BloodGroup();


}
