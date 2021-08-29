import { TestBed } from '@angular/core/testing';

import { HTTPCallsService } from './httpcalls.service';

describe('HTTPCallsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HTTPCallsService = TestBed.get(HTTPCallsService);
    expect(service).toBeTruthy();
  });
});
