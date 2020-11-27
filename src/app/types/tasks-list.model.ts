import { Task } from './task.model';

export interface TasksList {
  displayedColumns: displayedColumns;

  getTasks: () => void;
  loadTasksListPage: () => void;
  openDialog: () => void;
  markAsCompleted: (task: Task) => void;
  delete: (task: Task) => void;
}

enum displayedColumns {
  'id',
  'name',
  'isCompleted',
  'delete',
}
