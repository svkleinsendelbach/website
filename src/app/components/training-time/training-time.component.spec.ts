import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTimeComponent } from './training-time.component';

describe('TrainingTimeComponent', () => {
  let component: TrainingTimeComponent;
  let fixture: ComponentFixture<TrainingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
