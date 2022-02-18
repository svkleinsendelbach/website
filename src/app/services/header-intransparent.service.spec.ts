import { TestBed } from '@angular/core/testing';

import { HeaderIntransparentService } from './header-intransparent.service';

describe('HeaderIntransparentService', () => {
  let service: HeaderIntransparentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderIntransparentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
