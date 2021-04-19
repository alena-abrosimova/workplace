import { Component } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { EntitiesParams } from 'ng-project-helper';
import { Observable } from 'rxjs';

import { Directories, DirectoryCard, DirectoryItem } from './directory-card';
import { ActivityTypeApi, DirectionApi, ProjectApi } from '../../server-api';
import { RouterHelperService } from '../../services/router-helper.service';
import { AppUrl } from '../../app.data';


@Component({
  selector: 'directory-card',
  templateUrl: './directory-card.component.html',
  styleUrls: ['./directory-card.component.scss']
})
export class DirectoryCardComponent {
  directory: DirectoryCard = this.getDirectory();

  items$: Observable<DirectoryItem[]>;
  params: EntitiesParams<DirectoryItem>;

  get directoryCls(): ClassType<DirectoryItem> {
    switch (this.directory.path) {
      case 'ActivityType':
        return ActivityTypeApi;
      case 'Direction':
        return DirectionApi;
      case 'Project':
        return ProjectApi;
    }
  }

  constructor(private routerHelper: RouterHelperService) {
    this.setEntitiesParams();
  }

  getDirectory(): DirectoryCard {
    return Directories.find(card => card.id === this.routerHelper.getIntParam('id'));
  }

  setEntitiesParams(): void {
    this.params = new EntitiesParams(AppUrl[this.directory.path], this.directoryCls, {ordering: 'name'});
  }
}
