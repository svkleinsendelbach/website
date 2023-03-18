import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewsPage } from './edit-news.page';

describe('EditNewsPage', () => {
    let component: EditNewsPage;
    let fixture: ComponentFixture<EditNewsPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EditNewsPage ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EditNewsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
