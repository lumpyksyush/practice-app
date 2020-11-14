import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

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
    const existingUser = {
      email: 'kartman@yandex.ru',
      password: 'kartman99',
    };

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
});
