import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfvWidgetComponent } from './bfv-widget.component';

describe('BfvWidgetComponent', () => {
  let component: BfvWidgetComponent;
  let fixture: ComponentFixture<BfvWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfvWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BfvWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
