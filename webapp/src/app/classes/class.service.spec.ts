/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ClassService } from './class.service';

describe('Class Service', () => {
  beforeEachProviders(() => [ClassService]);

  it('should ...',
      inject([ClassService], (service: ClassService) => {
    expect(service).toBeTruthy();
  }));
});
