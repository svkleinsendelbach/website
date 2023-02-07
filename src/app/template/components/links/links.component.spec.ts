import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalPath } from 'src/app/app.component';

import { LinksComponent } from './links.component';

describe('LinksComponent', () => {
  let component: LinksComponent<InternalPath>;
  let fixture: ComponentFixture<LinksComponent<InternalPath>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksComponent<InternalPath>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
