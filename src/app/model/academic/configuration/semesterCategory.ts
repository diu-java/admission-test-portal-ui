export class SemesterCategory{
  id: number | undefined;
  code: string | undefined;
  name: string | undefined;
  semesterTypeId: number | undefined;
  startMonth: string | undefined;
  startMonthNo: number | undefined;
  endMonth: string | undefined;
  endMonthNo: number | undefined;
  active: boolean = true;
}
