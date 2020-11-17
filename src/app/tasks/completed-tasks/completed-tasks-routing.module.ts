import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedTasksComponent } from './completed-tasks.component';

const routes: Routes = [{ path: '', component: CompletedTasksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedTasksRoutingModule { }
