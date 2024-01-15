import { TestBed } from '@angular/core/testing';

import { CargarscripsService } from './cargarscrips.service';

describe('CargarscripsService', () => {
  let service: CargarscripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarscripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
