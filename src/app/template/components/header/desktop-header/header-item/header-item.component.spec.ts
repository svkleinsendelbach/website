import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalPath } from 'src/app/app.component';

import { DesktopHeaderItemComponent } from './header-item.component';

describe('DesktopHeaderItemComponent', () => {
  let component: DesktopHeaderItemComponent<InternalPath>;
  let fixture: ComponentFixture<DesktopHeaderItemComponent<InternalPath>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopHeaderItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopHeaderItemComponent<InternalPath>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
