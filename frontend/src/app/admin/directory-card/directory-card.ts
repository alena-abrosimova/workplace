import { ClassType } from 'class-transformer/ClassTransformer';
import { ActivityTypeApi, DirectionApi, ProjectApi } from '../../server-api';
import { ProjectDialog } from './project-dialog/project.dialog';
import { DirectionDialog } from './direction-dialog/direction.dialog';
import { ActivityTypeDialog } from './activity-type-dialog/activity-type.dialog';


export type DirectoryPath = 'Project' | 'Direction' | 'ActivityType';
export type DirectoryItem = ProjectApi | DirectionApi | ActivityTypeApi;
export type DirectoryItemColumns = keyof ProjectApi | keyof DirectionApi | keyof ActivityTypeApi | 'actions';
export type DirectoryDialog = ProjectDialog | DirectionDialog | ActivityTypeDialog;

export class DirectoryCard {
  constructor(public id: number,
              public path: DirectoryPath,
              public title: string,
              public columns: DirectoryItemColumns[],
              public cls: ClassType<DirectoryItem>) {
  }
}

export const Directories: DirectoryCard[] = [
  new DirectoryCard(1, 'Project', 'Проект', ['name', 'actions'], ProjectApi),
  new DirectoryCard(2, 'Direction', 'Направление', ['name', 'projectName', 'actions'], DirectionApi),
  new DirectoryCard(3, 'ActivityType', 'Вид работы', ['name', 'directionName', 'actions'], ActivityTypeApi)
];
