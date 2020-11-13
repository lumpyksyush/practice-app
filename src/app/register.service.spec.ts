import { TestBed, async } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RegisterService } from './register.service';

let service: RegisterService;
let httpMock: HttpTestingController;

describe('RegisterService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService],
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be a POST request method', () => {
    const mockUser = {
      email: 'mockEmail@gmail.com',
      password: 'mockPassword123',
    };

    service
      .signUp(mockUser.email, mockUser.password)
      .subscribe((res) => expect(res.email).toEqual('mockEmail@gmail.com'));

    const req = httpMock.expectOne('http://localhost:3000/users/register');

    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
});
