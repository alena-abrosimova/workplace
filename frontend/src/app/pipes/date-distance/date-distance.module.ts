import { NgModule } from '@angular/core';
import { DateDistancePipe } from './date-distance.pipe';


@NgModule({
  declarations: [DateDistancePipe],
  exports: [DateDistancePipe]
})
export class DateDistanceModule {
}
