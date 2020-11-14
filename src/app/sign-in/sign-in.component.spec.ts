import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    expect(component.signInFormGroup.valid).toBeFalsy();
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
