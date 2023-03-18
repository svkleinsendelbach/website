import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingEventsPage } from './editing-events.page';

describe('EditingEventsPage', () => {
    let component: EditingEventsPage;
    let fixture: ComponentFixture<EditingEventsPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EditingEventsPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EditingEventsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
