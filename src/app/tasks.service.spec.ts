import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { Task } from './tasks/task.model';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  const expectedTasks: Task[] = [
    {
      id: 1,
      name: 'Meet Alice at 3.00 PM',
    },
    {
      id: 2,
      name: 'Do all the household chores',
    },
    {
      id: 3,
      name: 'Cook some diet pancakes',
    },
    {
      id: 4,
      name: 'Finish reading Angular documentation',
    },
    {
      id: 5,
      name: 'Read JJBA manga',
    },
    {
      id: 6,
      name: 'Play Hades',
    },
  ];

  let httpMock: HttpTestingController;
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TasksService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should use GET request method and return and Observable<Task[]>', () => {
    service.getTasks().subscribe((res) => {
      expect(res.length).toBe(6);
      expect(res).toEqual(expectedTasks);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');

    expect(req.request.method).toBe('GET');

    req.flush(expectedTasks);
  });

  it('should return an error when the server returns a 404', () => {
    const message = 'Not Found';

    service.getTasks().subscribe(
      () => {},
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(404, 'status');
        expect(err.error).toBe(message, 'message');
      }
    );

    const req = httpMock.expectOne('http://localhost:3000/tasks');

    expect(req.request.method).toBe('GET');

    req.flush(message, {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
