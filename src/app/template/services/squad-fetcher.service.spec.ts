import { TestBed } from '@angular/core/testing';

import { SquadFetcherService } from './squad-fetcher.service';

describe('SquadFetcherService', () => {
  let service: SquadFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquadFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
