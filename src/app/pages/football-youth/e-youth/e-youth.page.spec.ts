import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EYouthPage } from './e-youth.page';

describe('EYouthPage', () => {
    let component: EYouthPage;
    let fixture: ComponentFixture<EYouthPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EYouthPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EYouthPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
