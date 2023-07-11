import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyPage } from './occupancy.page';

describe('OccupancyPage', () => {
    let component: OccupancyPage;
    let fixture: ComponentFixture<OccupancyPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ OccupancyPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OccupancyPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
