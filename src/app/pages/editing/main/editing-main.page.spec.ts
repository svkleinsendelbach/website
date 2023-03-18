import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingMainPage } from './editing-main.page';

describe('EditingMainPage', () => {
    let component: EditingMainPage;
    let fixture: ComponentFixture<EditingMainPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EditingMainPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EditingMainPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
