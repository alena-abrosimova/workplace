import { NgModule } from '@angular/core';
import { FirstUppercasePipe } from './first-uppercase.pipe';



@NgModule({
  declarations: [FirstUppercasePipe],
  exports: [FirstUppercasePipe]
})
export class FirstUppercaseModule { }
