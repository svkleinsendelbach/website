import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalPath } from 'src/app/app.component';

import { MobileHeaderComponent } from './mobile-header.component';

describe('MobileHeaderComponent', () => {
  let component: MobileHeaderComponent<InternalPath>;
  let fixture: ComponentFixture<MobileHeaderComponent<InternalPath>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileHeaderComponent<InternalPath>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
