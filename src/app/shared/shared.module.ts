import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class SharedModule {}
