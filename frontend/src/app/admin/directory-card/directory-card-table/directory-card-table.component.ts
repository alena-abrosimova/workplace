import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmDialogService, EntityService, isOnChanges } from 'ng-project-helper';
import { ClassType } from 'class-transformer/ClassTransformer';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DirectoryDialog, DirectoryItem, DirectoryItemColumns, DirectoryPath } from '../directory-card';
import { ActivityTypeDialog } from '../activity-type-dialog/activity-type.dialog';
import { ProjectDialog } from '../project-dialog/project.dialog';
import { DirectionDialog } from '../direction-dialog/direction.dialog';
import { AppUrl } from '../../../app.data';


@UntilDestroy()
@Component({
  selector: 'directory-card-table',
  templateUrl: './directory-card-table.component.html',
  styleUrls: ['./directory-card-table.component.scss']
})
export class DirectoryCardTableComponent implements OnChanges {
  @Input() items: DirectoryItem[];
  @Input() displayedColumns: DirectoryItemColumns[];
  @Input() cls: ClassType<DirectoryItem>;
  @Input() path: DirectoryPath;
  @Output() itemsChange: EventEmitter<null> = new EventEmitter<null>();

  dataSource: MatTableDataSource<DirectoryItem> = new MatTableDataSource<DirectoryItem>();

  get dialogComponent(): ComponentType<DirectoryDialog> {
    switch (this.path) {
      case 'ActivityType':
        return ActivityTypeDialog;
      case 'Direction':
        return DirectionDialog;
      case 'Project':
        return ProjectDialog;
    }
  }

  constructor(private entityService: EntityService,
              private confirmDialogService: ConfirmDialogService,
              private toastrService: ToastrService,
              private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChanges(changes.items)) {
      this.dataSource.data = this.items;
    }
  }

  deleteDirectory(itemId: number): void {
    this.openConfirmDialog()
      .pipe(
        switchMap(result => this.checkResultAndDelete(result, itemId)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeEdit('Сохранено'));
  }

  editDirectory(item: DirectoryItem = null): void {
    this.openEditDialog(item)
      .pipe(
        switchMap(value => this.checkValueAndEditItem(value)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeEdit('Сохранено'));
  }

  private openEditDialog(data: DirectoryItem): Observable<DirectoryItem> {
    return this.dialog.open(this.dialogComponent, {data, disableClose: true, width: '600px'})
      .afterClosed();
  }

  private openConfirmDialog(): Observable<boolean> {
    return this.confirmDialogService.openConfirmDialogWithResult();
  }

  private checkValueAndEditItem(value: DirectoryItem): Observable<DirectoryItem> {
    return value ? this.createOrUpdateItem(value) : of<DirectoryItem>();
  }

  private checkResultAndDelete(result: boolean, itemId: number): Observable<boolean> {
    return result ? this.deleteItem(itemId) : of<boolean>();
  }

  private createOrUpdateItem(item: DirectoryItem): Observable<DirectoryItem> {
    return item.id ? this.updateItem(item) : this.createItem(item);
  }

  private updateItem(item: DirectoryItem): Observable<DirectoryItem> {
    return this.entityService.updateEntity(item, item.id, AppUrl[this.path], this.cls);
  }

  private createItem(item: DirectoryItem): Observable<DirectoryItem> {
    return this.entityService.createEntity(item, AppUrl[this.path], this.cls);
  }

  private deleteItem(itemId: number): Observable<boolean> {
    return this.entityService.deleteEntity(itemId, AppUrl[this.path]);
  }

  private completeEdit(message: string): void {
    this.toastrService.success(message);
    this.itemsChange.emit();
  }
}
