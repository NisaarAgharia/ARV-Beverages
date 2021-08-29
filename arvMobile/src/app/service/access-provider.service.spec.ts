import { TestBed } from '@angular/core/testing';

import { AccessProviderService } from './access-provider.service';

describe('AccessProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessProviderService = TestBed.get(AccessProviderService);
    expect(service).toBeTruthy();
  });
});
