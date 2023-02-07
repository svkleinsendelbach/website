import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadPersonComponent } from './squad-person.component';

describe('SquadPersonComponent', () => {
  let component: SquadPersonComponent;
  let fixture: ComponentFixture<SquadPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
