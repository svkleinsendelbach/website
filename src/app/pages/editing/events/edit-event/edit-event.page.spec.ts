import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventPage } from './edit-event.page';

describe('EditEventPage', () => {
    let component: EditEventPage;
    let fixture: ComponentFixture<EditEventPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EditEventPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EditEventPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
