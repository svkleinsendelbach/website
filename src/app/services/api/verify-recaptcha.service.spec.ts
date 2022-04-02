import { TestBed } from '@angular/core/testing';

import { VerifyRecaptchaService } from './verify-recaptcha.service';

describe('VerifyRecaptchaService', () => {
  let service: VerifyRecaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyRecaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
