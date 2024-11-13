import {Degree} from "../../common-setup/degree";
import {LevelOfEducation} from "../../common-setup/levelOfEducation";

export class ApplicantEducationalInformation {
  id:number | undefined;
  studentPersonId:number | undefined;
  admissionPersonId:number | undefined;
  regNumber:string | undefined;
  rollNumber:string | undefined;
  levelOfEducationId:number | undefined;
  degreeId:number | undefined;
  majorName:string = '';
  boardId:number | undefined;
  instituteName:string = '';
  resultTypeId:number | undefined;
  mark:number | undefined;
  cgpa:number | undefined;
  scale:number | undefined;
  passingYear:number | undefined;
  duration:string | undefined;
  transcriptAttachmentId:number | undefined;
  certificateAttachmentId:number | undefined;
  circularLevelOfEducationId:number | undefined;
  isGolden:boolean = false;
  subjects:any= [];
  degree:Degree = new Degree();
  levelOfEducation:LevelOfEducation = new LevelOfEducation();
}
