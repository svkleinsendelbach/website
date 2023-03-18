import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChroniclePage } from './chronicle.page';

describe('ChroniclePage', () => {
    let component: ChroniclePage;
    let fixture: ComponentFixture<ChroniclePage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ChroniclePage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ChroniclePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
