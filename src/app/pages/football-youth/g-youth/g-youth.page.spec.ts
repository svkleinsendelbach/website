import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GYouthPage } from './g-youth.page';

describe('GYouthPage', () => {
    let component: GYouthPage;
    let fixture: ComponentFixture<GYouthPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ GYouthPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GYouthPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
