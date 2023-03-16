import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopHeaderItemComponent } from './desktop-header-item.component';

describe('DesktopHeaderItemComponent', () => {
    let component: DesktopHeaderItemComponent;
    let fixture: ComponentFixture<DesktopHeaderItemComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ DesktopHeaderItemComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DesktopHeaderItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
