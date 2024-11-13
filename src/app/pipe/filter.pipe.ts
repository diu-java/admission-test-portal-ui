import {NgModule, Pipe, PipeTransform} from "@angular/core";
@Pipe({ name: 'filter' })
@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe]
})
export class FilterPipe implements PipeTransform{
  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item =>
      Object.values(item).some((value:any) =>
        value.toString().toLowerCase().includes(filter.toLowerCase())
      )
    );
  }
}
