import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

import { User } from './user.model';
import { HttpErrorResponse } from '@angular/common/http';

const existingUser = {
  email: 'kartman@yandex.ru',
  password: 'kartman99',
};

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be a POST request', () => {
    service
      .signIn(existingUser.email, existingUser.password)
      .subscribe((res) => expect(res.email).toEqual('kartman@yandex.ru'));

    const req = httpMock.expectOne('http://localhost:3000/login');

    expect(req.request.method).toBe('POST');
  });

  it('signOut() should trigger sessionStorage cleanup', fakeAsync(() => {
    spyOn(service, 'signOut').and.callThrough();
    tick();
    expect(sessionStorage.length).toBe(0);
  }));

  it('signOut() should trigger navigation to sign-in page', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(service, 'signOut').and.callThrough();
    service.signOut();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['sign-in']);
  }));

  it('authorizeUser(res) should return an authorized user', () => {
    const user = service.authorizeUser(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcnRtYW5AeWFuZGV4LnJ1IiwiaWF0IjoxNjA1NTIwODA5LCJleHAiOjE2MDU1MjQ0MDksInN1YiI6IjYifQ.jEdTQUWGzIqVzRQlZsvVGMMds7kp7P6Jd5ztjaoQY3Y'
    );

    expect(user).toBeTruthy();
    expect(user).toBeInstanceOf(User);
  });

  it('handleError() should be called if request fails', fakeAsync(() => {
    const handleErrorSpy = spyOn(service, 'handleError');

    service.signIn('unknown@mail.ru', '123456789').subscribe(
      () => {},
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

    const req = httpMock.expectOne('http://localhost:3000/login');

    req.error(new ErrorEvent('something went wrong'));
    expect(handleErrorSpy).toHaveBeenCalled();
  }));
});
