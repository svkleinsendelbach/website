import { TestBed } from '@angular/core/testing';

import { SharedEventEditService } from './shared-event-edit.service';

describe('SharedEventEditService', () => {
  let service: SharedEventEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedEventEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
