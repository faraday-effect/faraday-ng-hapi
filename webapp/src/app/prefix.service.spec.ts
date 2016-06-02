import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { PrefixService } from './prefix.service';

describe('Prefix Service', () => {
  beforeEachProviders(() => [PrefixService]);

  it('should ...',
      inject([PrefixService], (service: PrefixService) => {
    expect(service).toBeTruthy();
  }));
});
