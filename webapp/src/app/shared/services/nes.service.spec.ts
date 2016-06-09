import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { NesService } from './nes.service';

describe('Nes Service', () => {
  beforeEachProviders(() => [NesService]);

  it('should ...',
      inject([NesService], (service: NesService) => {
    expect(service).toBeTruthy();
  }));
});
