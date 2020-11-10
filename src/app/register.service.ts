import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  signUp(email, password): Observable<User> {
    return this.http
      .post<User>(
        `${this.baseUrl}/users/register`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        tap((_) => {
          console.log(`new user with email ${email} has been registered`);
          sessionStorage.setItem('currentUser', `${email}`);
        }),
        catchError(this.handleError<User>('register a new user'))
      );
  }

  get isLoggedIn(): boolean {
    return sessionStorage.getItem('currentUser') !== null;
  }

  private baseUrl = 'http://localhost:3000';

  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      console.log(`${operation} failed`);
      return of(result as T);
    };
  }
}
