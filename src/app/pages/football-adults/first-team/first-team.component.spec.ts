import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTeamComponent } from './first-team.component';

describe('FirstTeamComponent', () => {
  let component: FirstTeamComponent;
  let fixture: ComponentFixture<FirstTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
