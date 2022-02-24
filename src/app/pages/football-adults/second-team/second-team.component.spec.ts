import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondTeamComponent } from './second-team.component';

describe('SecondTeamComponent', () => {
  let component: SecondTeamComponent;
  let fixture: ComponentFixture<SecondTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
