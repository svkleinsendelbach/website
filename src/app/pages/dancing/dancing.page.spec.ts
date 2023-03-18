import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DancingPage } from './dancing.page';

describe('DancingPage', () => {
    let component: DancingPage;
    let fixture: ComponentFixture<DancingPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ DancingPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DancingPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
