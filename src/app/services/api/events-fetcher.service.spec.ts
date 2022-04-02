import { TestBed } from '@angular/core/testing';

import { EventsFetcherService } from './events-fetcher.service';

describe('EventsFetcherService', () => {
  let service: EventsFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
