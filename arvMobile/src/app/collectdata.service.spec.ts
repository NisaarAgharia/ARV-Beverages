import { TestBed } from '@angular/core/testing';

import { CollectdataService } from './collectdata.service';

describe('CollectdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollectdataService = TestBed.get(CollectdataService);
    expect(service).toBeTruthy();
  });
});
