import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersPage } from './managers.page';

describe('ManagersPage', () => {
    let component: ManagersPage;
    let fixture: ComponentFixture<ManagersPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ManagersPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ManagersPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
