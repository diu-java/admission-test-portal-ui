import {CourseType} from "../configuration/courseType";

export class SyllabusCourse{
  id: string | undefined;
  courseProgramId: number | undefined;
  syllabusId: number | undefined;
  courseType: CourseType = new CourseType()

}
