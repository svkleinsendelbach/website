import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnasticsComponent } from './gymnastics.component';

describe('GymnasticsComponent', () => {
  let component: GymnasticsComponent;
  let fixture: ComponentFixture<GymnasticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymnasticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnasticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
