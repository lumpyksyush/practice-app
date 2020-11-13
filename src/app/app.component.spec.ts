import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';

import { Location } from '@angular/common';

import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent, SignInComponent, SignUpComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);

    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'practice-app'`, () => {
    expect(component.title).toEqual('practice-app');
  });

  it('should navigate to sign-in by default', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/sign-in');
  }));

  it(`navigate to 'sign-up' takes you to sign-up page`, fakeAsync(() => {
    router.navigate(['sign-up']);
    tick();
    expect(location.path()).toBe('/sign-up');
  }));
});
