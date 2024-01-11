import { TestBed } from '@angular/core/testing';

import { SailService } from './sail.service';

describe('SailService', () => {
  let service: SailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
