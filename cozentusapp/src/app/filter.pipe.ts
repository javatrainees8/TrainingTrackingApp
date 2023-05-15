import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value:any[], args: any) {
    if (!value || !args) {
      return value;
    }
    // filter value array, value which match and return true will be
    // kept, false will be filtered out
    return value.filter((item: any) => item.name.toLowerCase().indexOf(args.toLowerCase()) !== -1);
  }
}
