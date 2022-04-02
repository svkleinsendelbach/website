import { TestBed } from '@angular/core/testing';

import { WebsiteEditingService } from './website-editing.service';

describe('WebsiteEditingService', () => {
  let service: WebsiteEditingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteEditingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
