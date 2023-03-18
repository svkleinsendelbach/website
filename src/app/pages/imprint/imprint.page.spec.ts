import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintPage } from './imprint.page';

describe('ImprintPage', () => {
    let component: ImprintPage;
    let fixture: ComponentFixture<ImprintPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ImprintPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ImprintPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
