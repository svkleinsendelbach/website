import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnasticsPage } from './gymnastics.page';

describe('GymnasticsPage', () => {
    let component: GymnasticsPage;
    let fixture: ComponentFixture<GymnasticsPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ GymnasticsPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GymnasticsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
