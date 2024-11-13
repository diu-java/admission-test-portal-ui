import {SyllabusType} from "../configuration/syllabusType";
import {CourseType} from "../configuration/courseType";
import {CourseCategory} from "../configuration/CourseCategory";
import {Program} from "../institute/program";
import {Major} from "./major";

export class Syllabus{
  id: string | undefined;
  credit: number | undefined;
  syllabusTypeId: number | undefined;
  syllabusLevelTermId: number | undefined;
  courseTypeId: number | undefined;
  courseCategoryId: number | undefined;
  majorId: string | undefined;
  course:string | undefined;
  syllabusType: SyllabusType = new SyllabusType();
  courseType: CourseType = new CourseType();
  courseCategory: CourseCategory = new CourseCategory();
  program: Program = new Program();
  major: Major = new Major();
}
