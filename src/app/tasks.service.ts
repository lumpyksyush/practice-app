import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, Subscription, interval } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

import { Task } from './types/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http
      .get<any>(this.tasksUrl, { observe: 'response' })
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.tasksUrl, { observe: 'response' })
      .pipe(
        map((res) => res.body.filter((task) => task.isCompleted === true)),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  getTasksWithPagination(pageIndex = 0, pageSize = 3): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.tasksUrl}?`, {
        params: new HttpParams()
          .set('_start', (3 * pageIndex).toString())
          .set('_end', (pageSize * (pageIndex + 1)).toString()),
      })
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  getCompletedTasksWithPagination(
    pageIndex = 0,
    pageSize = 3
  ): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.tasksUrl}?`, {
        params: new HttpParams()
          .set('_start', (3 * pageIndex).toString())
          .set('_end', (pageSize * (pageIndex + 1)).toString()),
      })
      .pipe(
        map((res) => res.filter((task) => task.isCompleted === true)),
        catchError(this.handleError<Task[]>('getCompletedTasks'))
      );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError<Task>('createTask'))
    );
  }

  completeTask(task: Task): Observable<any> {
    return this.http
      .put<Task>(`${this.tasksUrl}/${task.id}`, task, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateTask')));
  }

  removeFromCompleted(task: Task): Observable<any> {
    return this.http
      .put<Task>(`${this.tasksUrl}/${task.id}`, task, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateTask')));
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http
      .delete<Task>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('deleteTask')));
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
