import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { TasksListComponent } from './tasks-list.component';
import { TasksService } from '../../tasks.service';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListComponent],
      providers: [HttpClient, HttpHandler, TasksService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get an array of tasks from the server', () => {
  //   let tasksService = fixture.debugElement.injector.get(TasksService);
  //   let spy = spyOn(tasksService, 'getTasks');
  // });
});
