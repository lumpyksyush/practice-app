import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { customPassValidator } from '../shared/compare-passwords.validator';

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
    passGroup: new FormGroup(
      {
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      },
      customPassValidator
    ),
  });

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.registerService
      .signUp(
        this.signUpFormGroup.controls.email.value,
        this.signUpFormGroup.controls.password.value
      )
      .subscribe((_) => {
        this.router.navigate(['tasks']);
      });
  }

  displayErrorMessage(field: string) {
    if (field === 'email') {
      return this.signUpFormGroup.controls.email.hasError('email')
        ? 'This is not a valid email'
        : '';
    }
    return `'Password' and 'Confirm password' fields should be the same`;
  }
}
