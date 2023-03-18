import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportshomePage } from './sportshome.page';

describe('SportshomePage', () => {
    let component: SportshomePage;
    let fixture: ComponentFixture<SportshomePage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SportshomePage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SportshomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
