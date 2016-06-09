import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { RegisterService } from './register.service';

describe('Register Service', () => {
  beforeEachProviders(() => [RegisterService]);

  it('should ...',
      inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeTruthy();
  }));
});
