import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './user.model';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  signIn(email: string, password: string) {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { email, password }, this.httpOptions)
      .pipe(
        map((res) => {
          let user = new User();

          if (res && res.accessToken) {
            let decodedToken = helper.decodeToken(res.accessToken);

            user.token = res.accessToken;
            user.id = Number(decodedToken.sub);
            user.email = decodedToken.email;

            sessionStorage.setItem('currentUser', JSON.stringify(user));
          }

          console.log(`${user.email} has successfully signed in`);
          return user;
        }),
        catchError(this.handleError<User>('sign in'))
      );
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['sign-in']);
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
