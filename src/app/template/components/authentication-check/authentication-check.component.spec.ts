import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationCheckComponent } from './authentication-check.component';

describe('AuthenticationCheckComponent', () => {
  let component: AuthenticationCheckComponent;
  let fixture: ComponentFixture<AuthenticationCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
