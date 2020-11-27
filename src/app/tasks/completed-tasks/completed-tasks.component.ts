import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';

import { Task } from '../../types/task.model';
import { TasksService } from '../../tasks.service';
import { TasksListDataSource } from '../tasks-list/tasks-list-data-source';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss'],
})
export class CompletedTasksComponent implements OnInit, AfterViewInit {
  tasks: Task[];
  tasksLength: number;
  tasksSource: TasksListDataSource;

  displayedColumns = ['id', 'name', 'isCompletedFrom', 'isCompleted'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCompletedTasks();
    this.tasks = this.route.snapshot.data['tasks'];
    this.tasksSource = new TasksListDataSource(this.tasksService);
    this.tasksSource.loadCompletedTasksList(0, 3);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.loadTasksListPage());
  }

  getCompletedTasks(): void {
    this.tasksService.getCompletedTasks().subscribe((res) => {
      this.tasks = res;
      this.tasksLength = res.length;
    });
  }

  loadTasksListPage(): void {
    this.tasksSource.loadCompletedTasksList(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  markAsIncomplete(task: Task): void {
    this.tasksService
      .completeTask({
        id: task.id,
        name: task.name,
        isCompleted: false,
      })
      .subscribe(() => this.loadTasksListPage());
  }
}
