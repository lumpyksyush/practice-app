import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { TasksService } from '../../tasks.service';
import { Task } from '../task.model';

export class TasksListDataSource implements DataSource<Task> {
  constructor(private tasksService: TasksService) {}

  connect(collectionViewer: CollectionViewer): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tasksSubject.complete();
  }

  loadTasksList(pageIndex: number, pageSize: number) {
    this.tasksService
      .getTasksWithPagination(pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => console.log('tasks fetched'))
      )
      .subscribe((tasks) => this.tasksSubject.next(tasks));
  }

  private tasksSubject = new BehaviorSubject<Task[]>([]);
}
