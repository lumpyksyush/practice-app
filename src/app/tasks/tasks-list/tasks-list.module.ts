import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { TasksListRoutingModule } from './tasks-list-routing.module';

import { SharedModule } from '../../shared/shared.module';

import { TasksListComponent } from './tasks-list.component';

@NgModule({
  declarations: [TasksListComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,

    TasksListRoutingModule,
  ],
})
export class TasksListModule {}