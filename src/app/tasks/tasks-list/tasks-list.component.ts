import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';

import { Task } from '../task.model';
import { TasksService } from '../../tasks.service';
import { TasksListDataSource } from './tasks-list-data-source';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, AfterViewInit {
  tasks: Task[];
  tasksSource: TasksListDataSource;

  displayedColumns = ['id', 'name', 'isCompleted'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.getTasks();
    this.tasks = this.route.snapshot.data['tasks'];
    this.tasksSource = new TasksListDataSource(this.tasksService);
    this.tasksSource.loadTasksList(0, 3);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.loadTasksListPage());
  }

  loadTasksListPage() {
    this.tasksSource.loadTasksList(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  // getTasks(): void {
  //   this.tasksService
  //     .getTasks()
  //     .subscribe((tasks) => (this.tasksSource = tasks));
  // }
}
