import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

let service: AuthService;
let httpMock: HttpTestingController;

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
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
    req.flush(existingUser);
  });
});
