import { TestBed } from '@angular/core/testing';

import { MomentDateFormatterService } from './moment-date-formatter.service';

describe('MomentDateFormatterService', () => {
  let service: MomentDateFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentDateFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
