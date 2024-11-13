export class Semester{
  id: number | undefined;
  code: string | undefined;
  semesterCategoryId: number | undefined;
  year: number = new Date().getFullYear();
  runningSemester: boolean | undefined;
  active: boolean = true;
}
