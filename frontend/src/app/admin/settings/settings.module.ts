import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { GetEntityModule, SaveEntityModule } from 'ng-project-helper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    RouterModule.forChild([{path: '', component: SettingsComponent}]),
    CommonModule,
    GetEntityModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    MatButtonModule,
    SaveEntityModule
  ],
})
export class SettingsModule {
}
