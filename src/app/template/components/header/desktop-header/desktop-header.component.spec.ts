import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalPath } from 'src/app/app.component';

import { DesktopHeaderComponent } from './desktop-header.component';

describe('DesktopHeaderComponent', () => {
  let component: DesktopHeaderComponent<InternalPath>;
  let fixture: ComponentFixture<DesktopHeaderComponent<InternalPath>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopHeaderComponent<InternalPath>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
