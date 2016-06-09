import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { SectionService } from './section.service';

describe('Section Service', () => {
  beforeEachProviders(() => [SectionService]);

  it('should ...',
      inject([SectionService], (service: SectionService) => {
    expect(service).toBeTruthy();
  }));
});
