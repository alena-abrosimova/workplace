import { NgModule } from '@angular/core';
import { MonthFieldComponent } from './month-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [MonthFieldComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  exports: [MonthFieldComponent]
})
export class MonthFieldModule { }
