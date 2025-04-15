import { TestBed } from '@angular/core/testing';

import { PharmNameService } from './pharm-name.service';

describe('PharmNameService', () => {
  let service: PharmNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
