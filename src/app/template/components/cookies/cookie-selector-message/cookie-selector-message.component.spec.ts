import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieSelectorMessageComponent } from './cookie-selector-message.component';

describe('CookieSelectorMessageComponent', () => {
  let component: CookieSelectorMessageComponent;
  let fixture: ComponentFixture<CookieSelectorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieSelectorMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookieSelectorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
