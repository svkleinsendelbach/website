import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormComponent } from './input-form.component';

describe('InputFormComponent', () => {
  let component: InputFormComponent<never>;
  let fixture: ComponentFixture<InputFormComponent<never>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFormComponent<never>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
