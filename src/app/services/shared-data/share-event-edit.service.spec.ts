import { TestBed } from '@angular/core/testing';

import { ShareEventEditService } from './share-event-edit.service';

describe('ShareEventEditService', () => {
  let service: ShareEventEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareEventEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
