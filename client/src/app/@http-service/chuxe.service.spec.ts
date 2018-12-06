import { TestBed, inject } from '@angular/core/testing';

import { ChuxeService } from './chuxe.service';

describe('ChuxeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChuxeService]
    });
  });

  it('should be created', inject([ChuxeService], (service: ChuxeService) => {
    expect(service).toBeTruthy();
  }));
});
