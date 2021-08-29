import { TestBed } from '@angular/core/testing';

import { NearbystoresdataService } from './nearbystoresdata.service';

describe('NearbystoresdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NearbystoresdataService = TestBed.get(NearbystoresdataService);
    expect(service).toBeTruthy();
  });
});
