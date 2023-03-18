import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhTeamPage } from './ah-team.page';

describe('AhTeamPage', () => {
    let component: AhTeamPage;
    let fixture: ComponentFixture<AhTeamPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ AhTeamPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AhTeamPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
