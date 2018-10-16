import { TestBed, inject } from '@angular/core/testing';

import { FitTextService } from './fit-text.service';

describe('FitTextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitTextService]
    });
  });

  it('should be created', inject([FitTextService], (service: FitTextService) => {
    expect(service).toBeTruthy();
  }));
});
