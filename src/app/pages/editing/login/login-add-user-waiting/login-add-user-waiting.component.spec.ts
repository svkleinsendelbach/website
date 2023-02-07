import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAddUserWaitingComponent } from './login-add-user-waiting.component';

describe('LoginAddUserWaitingComponent', () => {
  let component: LoginAddUserWaitingComponent;
  let fixture: ComponentFixture<LoginAddUserWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAddUserWaitingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAddUserWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
