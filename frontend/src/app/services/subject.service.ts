import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private activityChangeSubject: Subject<undefined> = new Subject<undefined>();

  get activityChange$(): Observable<undefined> {
    return this.activityChangeSubject.asObservable();
  }

  setActivityChange$() {
    this.activityChangeSubject.next();
  }
}
