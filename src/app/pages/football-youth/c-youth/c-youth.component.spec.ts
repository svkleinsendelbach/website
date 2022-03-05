import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CYouthComponent } from './c-youth.component';

describe('CYouthComponent', () => {
  let component: CYouthComponent;
  let fixture: ComponentFixture<CYouthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CYouthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
