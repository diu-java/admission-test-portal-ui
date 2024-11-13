import {PaymentHead} from "./paymentHead";
import {PaymentHeadCategory} from "./paymentHeadCategory";
import {CourseType} from "../configuration/courseType";
import {CourseCategory} from "../configuration/CourseCategory";
import {LevelTerm} from "../level-term/levelTerm";

export class PaymentScheme{
  id: number | undefined;
  numberOfPayment: number | undefined;
  amount: string | undefined;
  paymentHeadId: number | undefined;
  paymentSchemeTemplateId: number | undefined;
  levelTermId: number | undefined;
  courseTypeId: number | undefined;
  courseCategoryId: number | undefined;

  paymentHead: PaymentHead = new PaymentHead();
  paymentHeadCategory: PaymentHeadCategory = new PaymentHeadCategory();
  courseType: CourseType = new CourseType();
  courseCategory: CourseCategory = new CourseCategory()
  levelTerm:LevelTerm = new LevelTerm();
}
