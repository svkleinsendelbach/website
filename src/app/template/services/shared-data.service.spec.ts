import { TestBed } from '@angular/core/testing';

import { SharedDataService } from './shared-data.service';

describe('SharedDataService', () => {
    let service: SharedDataService<Record<string, never>>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SharedDataService<Record<string, never>>);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
