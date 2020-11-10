import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInFormGroup = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([Validators.email, Validators.required])
    ),
    password: new FormControl('', Validators.required),
  });

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.auth
      .signIn(
        this.signInFormGroup.controls.email.value,
        this.signInFormGroup.controls.password.value
      )
      .subscribe((_) => this.router.navigate(['tasks']));
  }

  displayErrorMessage() {
    return this.signInFormGroup.controls.email.hasError('email')
      ? 'This is not a valid email'
      : '';
  }
}
