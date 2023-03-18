import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetickerResultComponent } from './liveticker-result.component';

describe('LivetickerResultComponent', () => {
    let component: LivetickerResultComponent;
    let fixture: ComponentFixture<LivetickerResultComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ LivetickerResultComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LivetickerResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
