import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HeaderComponent } from './header.component';

import { AuthService } from '../../auth.service';

const authServiceMock = {
  signOut: () => {},
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header text correctly', () => {
    const titleEl: HTMLElement = fixture.debugElement.nativeElement.querySelector(
      'h1'
    );
    expect(titleEl.textContent).toContain('Tasks List');
  });

  it('clicking sign-out button should trigger onSignOut() method', fakeAsync(() => {
    const signOutSpy = spyOn(component, 'onSignOut');
    signOutSpy();
  }));
});
