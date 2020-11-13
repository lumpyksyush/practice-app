import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up.component';

import { RegisterService } from '../register.service';

let component: SignUpComponent;
let fixture: ComponentFixture<SignUpComponent>;
let email;
let password;

describe('SignUpComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [SignUpComponent],
      providers: [RegisterService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    email = component.signUpFormGroup.controls['email'];
    password = component.signUpFormGroup.controls['password'];
    fixture.detectChanges();
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
});
