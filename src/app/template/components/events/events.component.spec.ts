import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventGroupId } from 'src/app/app.component';

import { EventsComponent } from './events.component';

describe('EventsComponent', () => {
  let component: EventsComponent<EventGroupId>;
  let fixture: ComponentFixture<EventsComponent<EventGroupId>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsComponent<EventGroupId>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
