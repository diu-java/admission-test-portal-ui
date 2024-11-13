export class AdmissionMarkApplicant {
  id: number | undefined;
  admissionExamId: number | undefined;
  admissionApplicationId: number | undefined;
  attendance: number | undefined;
  facultyId: number | undefined;
  programId: number | undefined;
  batchId: number | undefined;
  deadline: string | undefined;
  status: number | undefined;
  active: boolean = true;
}
