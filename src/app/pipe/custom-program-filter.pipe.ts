import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'customProgramFilter'
})
export class CustomProgramFilterPipe implements PipeTransform {
  transform(items: any[], searchProgram: any): any[] {
    if (!items || !searchProgram) {
      return items;
    }
    return items.filter(item =>
      item.admissionCircularPrograms.some((program:any) => program.program.name === searchProgram.name)
    );
  }
}
