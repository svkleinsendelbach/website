import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutePage } from './statute.page';

describe('StatutePage', () => {
    let component: StatutePage;
    let fixture: ComponentFixture<StatutePage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ StatutePage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(StatutePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
