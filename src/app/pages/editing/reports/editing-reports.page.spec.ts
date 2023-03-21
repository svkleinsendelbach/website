import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingReportsPage } from './editing-reports.page';

describe('EditingReportsPage', () => {
    let component: EditingReportsPage;
    let fixture: ComponentFixture<EditingReportsPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EditingReportsPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EditingReportsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
