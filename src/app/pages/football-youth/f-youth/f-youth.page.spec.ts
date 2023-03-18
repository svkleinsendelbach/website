import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FYouthPage } from './f-youth.page';

describe('FYouthPage', () => {
    let component: FYouthPage;
    let fixture: ComponentFixture<FYouthPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ FYouthPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FYouthPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
