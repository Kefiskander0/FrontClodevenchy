import { TestBed } from '@angular/core/testing';

import { AlarmeservicesService } from './alarmeservices.service';

describe('AlarmeservicesService', () => {
  let service: AlarmeservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmeservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
