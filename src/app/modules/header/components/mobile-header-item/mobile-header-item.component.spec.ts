import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileHeaderItemComponent } from './mobile-header-item.component';

describe('MobileHeaderItemComponent', () => {
    let component: MobileHeaderItemComponent;
    let fixture: ComponentFixture<MobileHeaderItemComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ MobileHeaderItemComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MobileHeaderItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
