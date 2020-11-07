import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../task.model';

import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  tasks: Task[];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasksService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
}
