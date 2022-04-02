import { TestBed } from '@angular/core/testing';

import { SendContactMailService } from './send-contact-mail.service';

describe('SendContactMailService', () => {
  let service: SendContactMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendContactMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
