import { TestBed } from '@angular/core/testing';

import { ObservedDataService } from './observed-data.service';

describe('ObservedDataService', () => {
  let service: ObservedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
