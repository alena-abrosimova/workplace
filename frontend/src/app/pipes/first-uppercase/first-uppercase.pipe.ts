import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUppercase'
})
export class FirstUppercasePipe implements PipeTransform {

  transform(value: string): any {
    if (value && typeof value === 'string') {
      return this.getValueWithFirstUppercase(value);
    }
    return null;
  }

  getValueWithFirstUppercase(value: string): string {
    return `${value.substr(0, 1).toUpperCase()}${value.substr(1)}`;
  }
}
