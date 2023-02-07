import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FYouthComponent } from './f-youth.component';

describe('FYouthComponent', () => {
  let component: FYouthComponent;
  let fixture: ComponentFixture<FYouthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FYouthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
