import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalPath } from 'src/app/app.component';

import { CookieSelectorMessageComponent } from './cookie-selector-message.component';

describe('CookieSelectorMessageComponent', () => {
  let component: CookieSelectorMessageComponent<InternalPath>;
  let fixture: ComponentFixture<CookieSelectorMessageComponent<InternalPath>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieSelectorMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookieSelectorMessageComponent<InternalPath>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
