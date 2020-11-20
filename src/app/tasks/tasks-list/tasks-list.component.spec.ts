import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TasksListComponent } from './tasks-list.component';

import { TasksService } from '../../tasks.service';
import { Task } from '../task.model';

const tasksServiceMock = {
  getTasks: () => {},
};

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let tasksService: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TasksListComponent],
      providers: [{ providers: TasksService, useValue: tasksServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    tasksService = TestBed.inject(TasksService);
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTasks() OnInit', () => {
    const getTasksSpy = spyOn(component, 'getTasks');
    component.ngOnInit();

    expect(getTasksSpy).toHaveBeenCalled();
  });
});
