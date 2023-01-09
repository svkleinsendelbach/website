import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctions, REGION } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        AngularFireFunctions,
        { provide: REGION, useValue: 'europe-west1' },
      ]
    });
    service = TestBed.inject(ApiService);
    expect(service).toBeTruthy();
  });
});
