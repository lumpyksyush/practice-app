import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';

import { By } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SignInComponent } from './sign-in.component';

import { User } from '../user.model';

import { AuthService } from '../auth.service';

const authServiceMock = {
  signIn: () => {},
};

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;
  let router: Router;
  let email;
  let matErrorEl: HTMLElement;

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
      declarations: [SignInComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SignInComponent);

    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    email = component.signInFormGroup.controls.email;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    expect(component.signInFormGroup.valid).toBeFalsy();
  });

  it('displayErrorMessage(field) should return an error message if email field is invalid', () => {
    component.signInFormGroup.controls.email.markAsTouched();
    email.setValue('test');
    fixture.detectChanges();

    matErrorEl = fixture.debugElement.query(By.directive(MatError))
      .nativeElement;

    expect(matErrorEl.innerHTML).toContain('This is not a valid email');
  });

  it('should navigate authenticated user to tasks page', fakeAsync(() => {
    const emptyObservable = new Subject();
    spyOn(authService, 'signIn').and.returnValue(
      emptyObservable as Observable<User>
    );
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit();
    emptyObservable.next();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['tasks']);
  }));
});
