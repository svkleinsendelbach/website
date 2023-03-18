import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivePage } from './drive.page';

describe('DrivePage', () => {
    let component: DrivePage;
    let fixture: ComponentFixture<DrivePage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ DrivePage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DrivePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
