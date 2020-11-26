import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksListComponent } from './tasks-list.component';

const routes: Routes = [
  { path: '', component: TasksListComponent },
  {
    path: 'completed',
    loadChildren: () =>
      import('../completed-tasks/completed-tasks.module').then(
        (m) => m.CompletedTasksModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksListRoutingModule {}
