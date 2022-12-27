import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhTeamComponent } from './ah-team.component';

describe('AhTeamComponent', () => {
  let component: AhTeamComponent;
  let fixture: ComponentFixture<AhTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
