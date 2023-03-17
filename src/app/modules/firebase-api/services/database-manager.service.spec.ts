import { TestBed } from '@angular/core/testing';
import { DatabaseScheme } from '../database-scheme';

import { DatabaseManagerTestService } from './database-manager.service';

describe('DatabaseManagerService', () => {
    let service: DatabaseManagerTestService<DatabaseScheme>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DatabaseManagerTestService<DatabaseScheme>);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
