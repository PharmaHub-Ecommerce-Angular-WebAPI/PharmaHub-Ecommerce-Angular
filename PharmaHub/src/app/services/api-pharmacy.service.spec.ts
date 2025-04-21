import { TestBed } from '@angular/core/testing';

import { ApiPharmacyService } from './api-pharmacy.service';

describe('ApiPharmacyService', () => {
  let service: ApiPharmacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPharmacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
