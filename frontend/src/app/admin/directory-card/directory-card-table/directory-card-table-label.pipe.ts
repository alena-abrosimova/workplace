import { Pipe, PipeTransform } from '@angular/core';
import { DirectoryItemColumns } from '../directory-card';


@Pipe({
  name: 'directoryCardTableLabel'
})
export class DirectoryCardTableLabelPipe implements PipeTransform {
  transform(value: DirectoryItemColumns): string {
    switch (value) {
      case 'name':
        return 'Наименование';
      case 'projectName':
        return 'Проект';
      case 'directionName':
        return 'Направление';
      default:
        return '';
    }
  }
}
