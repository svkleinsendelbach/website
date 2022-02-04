import { TestBed } from '@angular/core/testing';

import { FetchHomeTopService } from './fetch-home-top.service';

describe('FetchHomeTopService', () => {
  let service: FetchHomeTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchHomeTopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
