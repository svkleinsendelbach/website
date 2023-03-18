import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingNewsPage } from './editing-news.page';

describe('EditingNewsPage', () => {
    let component: EditingNewsPage;
    let fixture: ComponentFixture<EditingNewsPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EditingNewsPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EditingNewsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
