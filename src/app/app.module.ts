import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AccessTasksGuard } from './access-tasks.guard';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,

    HttpClientModule,
  ],
  providers: [AccessTasksGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
