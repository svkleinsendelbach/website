import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewsPage } from './all-news.page';

describe('AllNewsPage', () => {
    let component: AllNewsPage;
    let fixture: ComponentFixture<AllNewsPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ AllNewsPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AllNewsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
