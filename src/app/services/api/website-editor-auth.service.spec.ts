import { TestBed } from '@angular/core/testing';

import { WebsiteEditorAuthService } from './website-editor-auth.service';

describe('WebsiteEditorAuthService', () => {
  let service: WebsiteEditorAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteEditorAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
