import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetickerComponent } from './liveticker.component';

describe('LivetickerComponent', () => {
    let component: LivetickerComponent;
    let fixture: ComponentFixture<LivetickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ LivetickerComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LivetickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
