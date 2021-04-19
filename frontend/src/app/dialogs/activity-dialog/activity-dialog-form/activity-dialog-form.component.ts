import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseForm, EntitiesParams, isOnChanges } from 'ng-project-helper';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { ActivityControlsConfig } from '../activity-dialog.data';
import { ActivityApi, ActivityTypeApi, DirectionApi, ProjectApi } from '../../../server-api';
import { AppUrl } from '../../../app.data';


@Component({
  selector: 'activity-dialog-form',
  templateUrl: './activity-dialog-form.component.html',
  styleUrls: ['./activity-dialog-form.component.scss']
})
export class ActivityDialogFormComponent extends BaseForm implements OnChanges {
  @Input() item: ActivityApi;
  cardForm = this.initForm(ActivityControlsConfig);

  projectParams: EntitiesParams<ProjectApi>;
  directionParams: EntitiesParams<DirectionApi>;
  typeParams: EntitiesParams<ActivityTypeApi>;
  directions$: Observable<DirectionApi[]>;
  projects$: Observable<ProjectApi[]>;
  types$: Observable<ProjectApi[]>;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
    this.resetProjectParams();
    this.resetDirectionParams();
    this.resetTypeParams();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChanges(changes.item)) {
      this.cardForm.patchValue(this.item);
      if (this.hasValue('task')) {
        this.enable('task');
        this.setValue('withoutTask', false);
      }
    }
  }

  checkTimes(): void {
    const start = this.getValue<string>('start');
    const end = this.getValue<string>('end');
    if (start && end && start > end) {
      this.setErrorToTimeControl(start, end);
    } else {
      this.updateTimeControl();
    }
  }

  setErrorToTimeControl(start: string, end: string): void {
    this.control('start').setErrors({maxTime: end});
    this.control('end').setErrors({minTime: start});
    this.control('end').markAsTouched();
    this.control('start').markAsTouched();
  }

  updateTimeControl(): void {
    this.control('end').updateValueAndValidity();
    this.control('start').updateValueAndValidity();
  }

  resetProjectParams(ordering: string = 'name'): void {
    this.projectParams = new EntitiesParams(AppUrl.Project, ProjectApi, {ordering}, 'search');
  }

  resetDirectionParams(ordering: string = 'name'): void {
    const projects = this.getFiltersId('project');
    this.directionParams = new EntitiesParams(AppUrl.Direction, DirectionApi, {ordering, projects}, 'search');
  }

  resetTypeParams(ordering: string = 'name'): void {
    const projects = this.getFiltersId('project');
    const directions = this.getFiltersId('direction');
    this.typeParams = new EntitiesParams(AppUrl.ActivityType, ActivityTypeApi, {ordering, directions, projects}, 'search');
  }

  changeFilterControl(name: 'project' | 'direction', clear?: boolean): void {
    if (clear) {
      this.clear(name);
    }
    if (name === 'project') {
      this.resetDirectionParams();
    }
    this.resetTypeParams();
  }

  getFiltersId(name: 'project' | 'direction'): number | null {
    return this.hasValue(name) ? this.getValue<ProjectApi | DirectionApi>(name).id : null;
  }

  checkTaskOptions(withoutTask: boolean): void {
    withoutTask ? this.disable('task') : this.enable('task');
  }
}
