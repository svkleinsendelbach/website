import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EYouthComponent } from './e-youth.component';

describe('EYouthComponent', () => {
  let component: EYouthComponent;
  let fixture: ComponentFixture<EYouthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EYouthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
