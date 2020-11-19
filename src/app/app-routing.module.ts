import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessTasksGuard } from './access-tasks.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: 'tasks-list',
    loadChildren: () =>
      import('./tasks/tasks-list/tasks-list.module').then(
        (m) => m.TasksListModule
      ),
    canActivate: [AccessTasksGuard],
  },
  {
    path: 'completed-tasks',
    loadChildren: () =>
      import('./tasks/completed-tasks/completed-tasks.module').then(
        (m) => m.CompletedTasksModule
      ),
    canActivate: [AccessTasksGuard],
  },
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },

  // {
  //   path: 'sign-in',
  //   component: SignInComponent,
  // },
  // {
  //   path: 'sign-up',
  //   component: SignUpComponent,
  // },
  // {
  //   path: 'tasks',
  //   component: TasksComponent,
  //   canActivate: [AccessTasksGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
