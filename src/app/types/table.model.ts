import { TasksService } from '../tasks.service';
import { Task } from './task.model';
import { TasksListDataSource } from '../tasks/tasks-list/tasks-list-data-source';

export class TasksTable {
  data: Task[];
  dataSource: TasksListDataSource;
  length: number;
  pageSize: number;
  displayedColumns: string[];

  constructor(private tasksService: TasksService) {}

  renderColumns() {}
}
