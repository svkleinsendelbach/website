import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTeamPage } from './first-team.page';

describe('FirstTeamPage', () => {
    let component: FirstTeamPage;
    let fixture: ComponentFixture<FirstTeamPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ FirstTeamPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FirstTeamPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
