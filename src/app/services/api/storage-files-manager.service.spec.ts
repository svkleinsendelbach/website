import { TestBed } from '@angular/core/testing';

import { StorageFilesManagerService } from './storage-files-manager.service';

describe('StorageFilesManagerService', () => {
  let service: StorageFilesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageFilesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
