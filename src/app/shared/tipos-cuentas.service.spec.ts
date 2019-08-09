import { TestBed } from '@angular/core/testing';

import { TiposCuentasService } from './tipos-cuentas.service';

describe('TiposCuentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposCuentasService = TestBed.get(TiposCuentasService);
    expect(service).toBeTruthy();
  });
});
