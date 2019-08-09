import { TestBed } from '@angular/core/testing';

import { ProvedorService } from './provedor.service';

describe('ProvedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvedorService = TestBed.get(ProvedorService);
    expect(service).toBeTruthy();
  });
});
