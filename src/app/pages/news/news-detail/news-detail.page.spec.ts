import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailPage } from './news-detail.page';

describe('NewsDetailPage', () => {
    let component: NewsDetailPage;
    let fixture: ComponentFixture<NewsDetailPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ NewsDetailPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NewsDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
