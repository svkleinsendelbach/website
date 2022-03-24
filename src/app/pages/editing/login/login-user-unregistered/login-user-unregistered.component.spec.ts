import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserUnregisteredComponent } from './login-user-unregistered.component';

describe('LoginUserUnregisteredComponent', () => {
  let component: LoginUserUnregisteredComponent;
  let fixture: ComponentFixture<LoginUserUnregisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUserUnregisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserUnregisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
