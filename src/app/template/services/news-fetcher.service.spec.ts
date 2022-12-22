import { TestBed } from '@angular/core/testing';

import { NewsFetcherService } from './news-fetcher.service';

describe('NewsFetcherService', () => {
  let service: NewsFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
