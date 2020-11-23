import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { TasksListRoutingModule } from './tasks-list-routing.module';

import { TasksListComponent } from './tasks-list.component';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { HighlightDirective } from '../highlight.directive';

@NgModule({
  declarations: [
    TasksListComponent,
    CreateTaskDialogComponent,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,

    TasksListRoutingModule,
  ],
  entryComponents: [CreateTaskDialogComponent],
})
export class TasksListModule {}
