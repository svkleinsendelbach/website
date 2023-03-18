import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondTeamPage } from './second-team.page';

describe('SecondTeamPage', () => {
    let component: SecondTeamPage;
    let fixture: ComponentFixture<SecondTeamPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SecondTeamPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SecondTeamPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
