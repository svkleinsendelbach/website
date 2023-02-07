import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalPath } from 'src/app/app.component';

import { SocialMediaLinksComponent } from './social-media-links.component';

describe('SocialMediaLinksComponent', () => {
  let component: SocialMediaLinksComponent<InternalPath>;
  let fixture: ComponentFixture<SocialMediaLinksComponent<InternalPath>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaLinksComponent<InternalPath>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
