import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { Observable, Subject } from 'rxjs';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';

import { SignUpComponent } from './sign-up.component';

import { RegisterService } from '../register.service';

import { User } from '../user.model';

const registerServiceMock = {
  signUp: () => {},
};

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let registerService: RegisterService;
  let email;
  let password;
  let confirmPass;
  let matErrorEl: HTMLElement;
  let matErrorDe: DebugElement;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        RouterTestingModule,
      ],

      declarations: [SignUpComponent],
      providers: [{ provide: RegisterService, useValue: registerServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    registerService = TestBed.inject(RegisterService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    email = component.signUpFormGroup.controls.email;
    password = component.signUpFormGroup.controls.passGroup.get('password');
    confirmPass = component.signUpFormGroup.controls.passGroup.get(
      'confirmPass'
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form OnInit should be empty when component is initialized', () => {
    expect(email.value).toBe('');
    expect(password.value).toBe('');
  });

  it('form should be invalid when form is empty', () => {
    email.setValue('');
    password.setValue('');

    expect(component.signUpFormGroup.valid).toBeFalsy();
  });

  it(`email field should be invalid if it's empty or doesn't match the pattern`, () => {
    expect(email.valid).toBeFalsy();
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('testing');
    expect(email.valid).toBeFalsy();
    expect(email.hasError('email')).toBeTruthy();
  });

  it('displayErrorMessage(field) should return an error message if email field is invalid', () => {
    component.signUpFormGroup.controls.email.markAsTouched();
    email.setValue('test');
    fixture.detectChanges();

    matErrorEl = fixture.debugElement.query(By.directive(MatError))
      .nativeElement;

    expect(matErrorEl.innerHTML).toContain('This is not a valid email');
  });

  it('displayErrorMessage(field) should not return an error message if email field is valid', () => {
    component.signUpFormGroup.controls.email.markAsTouched();
    email.setValue('test@gmail.com');
    fixture.detectChanges();

    matErrorDe = fixture.debugElement.query(By.directive(MatError));

    expect(matErrorDe).toBe(null);
  });

  it(`displayErrorMessage(field) should return an error essage if passwords aren't identical`, () => {
    component.signUpFormGroup.controls.passGroup.markAsDirty();
    password.setValue('111');
    confirmPass.setValue('222');
    fixture.detectChanges();

    matErrorEl = fixture.debugElement.query(By.directive(MatError))
      .nativeElement;

    expect(matErrorEl.innerHTML).toContain(
      `'Password' and 'Confirm password' fields should be the same`
    );
  });

  it(`displayErrorMessage(field) should return an error essage if passwords aren't identical`, () => {
    component.signUpFormGroup.controls.passGroup.markAsDirty();
    password.setValue('test');
    confirmPass.setValue('test');
    fixture.detectChanges();

    matErrorDe = fixture.debugElement.query(By.directive(MatError));

    expect(matErrorDe).toBe(null);
  });

  // it('should navigate new user to tasks page', fakeAsync(() => {
  //   const mockObservable = new Subject();
  //   spyOn(registerService, 'signUp').and.returnValue(
  //     mockObservable as Observable<User>
  //   );

  //   const navigateSpy = spyOn(router, 'navigate');

  //   component.onSubmit();
  //   mockObservable.next();
  //   tick();
  //   expect(navigateSpy).toHaveBeenCalledWith(['tasks']);
  // }));
});
