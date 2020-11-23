import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';

import { Task } from '../task.model';
import { TasksService } from '../../tasks.service';
import { TasksListDataSource } from './tasks-list-data-source';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, AfterViewInit {
  taskName: string = '';
  tasks: Task[];
  tasksLength: number;
  tasksSource: TasksListDataSource;

  displayedColumns = ['id', 'name', 'isCompleted', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.tasks = this.route.snapshot.data['tasks'];
    this.tasksSource = new TasksListDataSource(this.tasksService);
    this.tasksSource.loadTasksList(0, 3);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.loadTasksListPage());
  }

  getTasks(): void {
    this.tasksService.getTasks().subscribe((res) => {
      this.tasksLength = res.body.length;
    });
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
      if (data) {
        this.tasksService
          .createTask({
            id: this.tasksLength + 1,
            name: data,
            isCompleted: false,
          })
          .subscribe();
        this.table.renderRows();
      }
    });
  }

  complete(task: Task) {
    this.tasksService
      .updateTask({
        id: task.id,
        name: task.name,
        isCompleted: true,
        isCompletedFrom: Date(),
      })
      .subscribe();
  }

  delete(task: Task) {
    this.tasksService.deleteTask(task).subscribe();
  }
}
