import { TestBed } from '@angular/core/testing';

import { SliderLinksService } from './slider-links.service';

describe('SliderLinksService', () => {
  let service: SliderLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
