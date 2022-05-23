import { TestBed } from '@angular/core/testing';

import { SharedNewsEditService } from './shared-news-edit.service';

describe('SharedNewsEditService', () => {
  let service: SharedNewsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedNewsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
