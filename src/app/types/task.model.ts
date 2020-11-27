export interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
  isCompletedFrom?: string | Date;
}
