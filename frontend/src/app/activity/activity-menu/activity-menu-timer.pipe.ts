import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'activityMenuTimer'
})
export class ActivityMenuTimerPipe implements PipeTransform {

  transform(duration: Duration): string {
    if (!duration) {
      return '';
    }
    const years = duration.years ? `Лет: ${duration.years}; ` : '';
    const days = duration.days ? `Дней: ${duration.days}; ЧЧ:ММ:СС: ` : '';
    const hours = duration.hours < 10 ? `0${duration.hours}` : `${duration.hours}`;
    const minutes = duration.minutes < 10 ? `0${duration.minutes}` : `${duration.minutes}`;
    const seconds = duration.seconds < 10 ? `0${duration.seconds}` : `${duration.seconds}`;

    return `${years}${days}${hours}:${minutes}:${seconds}`;
  }
}
