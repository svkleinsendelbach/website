import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalPath } from 'src/app/app.component';

import { MobileHeaderItemComponent } from './header-item.component';

describe('MobileHeaderItemComponent', () => {
  let component: MobileHeaderItemComponent<InternalPath>;
  let fixture: ComponentFixture<MobileHeaderItemComponent<InternalPath>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileHeaderItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileHeaderItemComponent<InternalPath>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
