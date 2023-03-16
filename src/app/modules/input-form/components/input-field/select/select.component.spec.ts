import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
    let component: SelectComponent<never>;
    let fixture: ComponentFixture<SelectComponent<never>>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ SelectComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SelectComponent<never>);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
