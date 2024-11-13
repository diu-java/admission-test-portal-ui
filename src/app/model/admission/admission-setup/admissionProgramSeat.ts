export class AdmissionProgramSeat {
  id: number | undefined;
  semesterId: number | undefined;
  studyCampusId: number | undefined;
  semesterTypeId: number | undefined;
  programId: number | undefined;
  seat: number | undefined;
  studentIssueDate: string | undefined;
  studentExpireDate: string | undefined;
  lateRegistrationId: string | undefined;
  lateStudentId: string | undefined;
  active:boolean = false;
}
