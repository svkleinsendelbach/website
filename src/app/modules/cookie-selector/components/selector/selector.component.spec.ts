import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieSelectorComponent } from './selector.component';

describe('CookieSelectorComponent', () => {
    let component: CookieSelectorComponent;
    let fixture: ComponentFixture<CookieSelectorComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [CookieSelectorComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CookieSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
