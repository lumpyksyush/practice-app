import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

import { AuthService } from '../../auth.service';

let component: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;

describe('HeaderComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header text correctly', () => {
    const titleElement: HTMLElement = fixture.debugElement.nativeElement;
    const title = titleElement.querySelector('h1');
    expect(title.textContent).toContain('Tasks List');
  });
});
