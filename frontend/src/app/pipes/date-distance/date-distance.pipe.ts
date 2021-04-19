import { Pipe, PipeTransform } from '@angular/core';
import { formatRelative, isDate } from 'date-fns';
import { ru as locale } from 'date-fns/locale';


@Pipe({
  name: 'dateDistance'
})
export class DateDistancePipe implements PipeTransform {

  transform(value: Date): any {
    if (value && isDate(value)) {
      return formatRelative(value, new Date(), { locale });
    }

    return value;
  }

}
