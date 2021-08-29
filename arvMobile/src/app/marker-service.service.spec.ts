import { TestBed } from '@angular/core/testing';

import { Markers } from './marker-service.service';

describe('MarkerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Markers = TestBed.get(Markers);
    expect(service).toBeTruthy();
  });
});
