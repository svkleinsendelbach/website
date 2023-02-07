import { TestBed } from '@angular/core/testing';

import { DatabaseManagerTestService } from './database-manager.service';

describe('DatabaseManagerService', () => {
  let service: DatabaseManagerTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseManagerTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
