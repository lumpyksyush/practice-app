import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { RegisterService } from '../register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpFormGroup = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([Validators.email, Validators.required])
    ),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.registerService.signUp(
      this.signUpFormGroup.controls.email.value,
      this.signUpFormGroup.controls.password.value
    );
  }

  displayErrorMessage() {
    return this.signUpFormGroup.controls.email.hasError('email')
      ? 'This is not a valid email'
      : '';
  }
}
