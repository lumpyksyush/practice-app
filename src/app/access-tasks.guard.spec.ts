import { TestBed } from '@angular/core/testing';

import { AccessTasksGuard } from './access-tasks.guard';

describe('AccessTasksGuard', () => {
  let guard: AccessTasksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessTasksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
