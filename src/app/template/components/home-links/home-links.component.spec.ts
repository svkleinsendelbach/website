import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalPath } from 'src/app/app.component';

import { HomeLinksComponent } from './home-links.component';

describe('HomeLinksComponent', () => {
  let component: HomeLinksComponent<InternalPath>;
  let fixture: ComponentFixture<HomeLinksComponent<InternalPath>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLinksComponent<InternalPath>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
