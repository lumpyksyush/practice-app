import { Task } from './task.model';

export interface TasksList {
  displayedColumns: displayedColumns;

  getCompletedTasks: () => void;
  loadTasksListPage: () => void;
  markAsIncomplete: (task: Task) => void;
}

enum displayedColumns {
  'id',
  'name',
  'isCompletedFrom',
  'isCompleted',
}
