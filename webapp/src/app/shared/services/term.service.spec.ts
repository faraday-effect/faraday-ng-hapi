import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { TermService } from './term.service';

describe('Term Service', () => {
  beforeEachProviders(() => [TermService]);

  it('should ...',
      inject([TermService], (service: TermService) => {
    expect(service).toBeTruthy();
  }));
});
