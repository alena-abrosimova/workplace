import { Component } from '@angular/core';
import { Directories, DirectoryCard } from '../directory-card/directory-card';


@Component({
  selector: 'directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent {
  directories: DirectoryCard[] = Directories;
}
