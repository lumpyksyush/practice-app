import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';

import { Task } from '../task.model';
import { TasksService } from '../../tasks.service';
import { TasksListDataSource } from './tasks-list-data-source';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, AfterViewInit {
  taskName: string = '';
  tasks: Task[];
  tasksSource: TasksListDataSource;

  displayedColumns = ['id', 'name', 'isCompleted'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private dialog: MatDialog
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

  openDialog() {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig = {
      height: '200px',
      width: '400px',
      data: {
        name: this.taskName,
      },
    };

    const dialogRef = this.dialog.open(CreateTaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      this.taskName = data;
      console.log(this.taskName)
    });
  }

  // getTasks(): void {
  //   this.tasksService
  //     .getTasks()
  //     .subscribe((tasks) => (this.tasksSource = tasks));
  // }
}
