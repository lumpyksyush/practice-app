import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { AccessTasksGuard } from './access-tasks.guard';

describe('AccessTasksGuard', () => {
  let guard: AccessTasksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient, HttpHandler] });
    guard = TestBed.inject(AccessTasksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
