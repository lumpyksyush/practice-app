import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TasksListComponent } from './tasks-list.component';

import { TasksService } from '../../tasks.service';

const tasksServiceMock = {
  getTasks: () => {},
};

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let tasksService: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TasksListComponent],
      //providers: [{ providers: TasksService, useValue: tasksServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    tasksService = TestBed.inject(TasksService);
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
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
