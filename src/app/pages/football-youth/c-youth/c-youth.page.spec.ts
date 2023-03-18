import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CYouthPage } from './c-youth.page';

describe('CYouthPage', () => {
    let component: CYouthPage;
    let fixture: ComponentFixture<CYouthPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CYouthPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CYouthPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
