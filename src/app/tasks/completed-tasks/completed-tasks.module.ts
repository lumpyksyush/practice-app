import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CompletedTasksRoutingModule } from './completed-tasks-routing.module';
import { CompletedTasksComponent } from './completed-tasks.component';

@NgModule({
  declarations: [CompletedTasksComponent],
  imports: [
    CommonModule,
    SharedModule,

    HttpClientModule,

    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,

    CompletedTasksRoutingModule,
  ],
})
export class CompletedTasksModule {}
