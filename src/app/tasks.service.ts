import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Task } from './tasks/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.tasksUrl)
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  getTasksWithPagination(pageIndex = 0, pageSize = 3): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.tasksUrl}?`, {
        params: new HttpParams()
          .set('_start', (3 * pageIndex).toString())
          .set('_end', (pageSize * (pageIndex + 1)).toString())
          .set('_limit', pageSize.toString()),
      })
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      console.log(`${operation} failed`);
      return of(result as T);
    };
  }

  private tasksUrl = 'http://localhost:3000/tasks';
}
