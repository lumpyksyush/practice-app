import { Component, Inject, OnInit } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>) {}

  ngOnInit(): void {}

  save() {
    this.dialogRef.close(this.formGroup.controls.name.value);
  }

  close() {
    this.dialogRef.close();
  }
}
