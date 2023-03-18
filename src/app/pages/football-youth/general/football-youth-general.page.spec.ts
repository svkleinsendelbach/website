import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballYouthGeneralPage } from './football-youth-general.page';

describe('FootballYouthGeneralPage', () => {
    let component: FootballYouthGeneralPage;
    let fixture: ComponentFixture<FootballYouthGeneralPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ FootballYouthGeneralPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FootballYouthGeneralPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
