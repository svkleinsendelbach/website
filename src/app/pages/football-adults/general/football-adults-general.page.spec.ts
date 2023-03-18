import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballAdultsGeneralPage } from './football-adults-general.page';

describe('FootballAdultsGeneralPage', () => {
    let component: FootballAdultsGeneralPage;
    let fixture: ComponentFixture<FootballAdultsGeneralPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ FootballAdultsGeneralPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FootballAdultsGeneralPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
