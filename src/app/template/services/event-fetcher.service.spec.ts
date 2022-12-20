import { TestBed } from '@angular/core/testing';

import { EventFetcherService } from './event-fetcher.service';

describe('EventFetcherService', () => {
  let service: EventFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
