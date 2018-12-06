import { TestBed, inject } from '@angular/core/testing';

import { KhachhangService } from './khachhang.service';

describe('KhachhangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KhachhangService]
    });
  });

  it('should be created', inject([KhachhangService], (service: KhachhangService) => {
    expect(service).toBeTruthy();
  }));
});
