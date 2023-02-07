import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GYouthComponent } from './g-youth.component';

describe('GYouthComponent', () => {
  let component: GYouthComponent;
  let fixture: ComponentFixture<GYouthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GYouthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
