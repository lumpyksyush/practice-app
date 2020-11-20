import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AccessTasksGuard } from './access-tasks.guard';

describe('AccessTasksGuard', () => {
  let guard: AccessTasksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    guard = TestBed.inject(AccessTasksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
