import { TestBed, inject } from '@angular/core/testing';

import { ApiUrlService } from './api-url.service';

describe('ApiUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUrlService]
    });
  });

  it('should ...', inject([ApiUrlService], (service: ApiUrlService) => {
    expect(service).toBeTruthy();
  }));
});
