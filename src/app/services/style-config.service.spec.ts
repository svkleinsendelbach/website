import { TestBed } from '@angular/core/testing';

import { StyleConfigService } from './style-config.service';

describe('StyleConfigService', () => {
    let service: StyleConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StyleConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
