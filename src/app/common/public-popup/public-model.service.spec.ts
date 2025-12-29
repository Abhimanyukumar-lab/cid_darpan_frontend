import { TestBed } from '@angular/core/testing';

import { PublicModelService } from './public-model.service';

describe('ModelService', () => {
  let service: PublicModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
