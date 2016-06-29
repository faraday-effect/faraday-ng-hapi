/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ToolbarConfigService } from './toolbar-config.service';

describe('ToolbarConfig Service', () => {
  beforeEachProviders(() => [ToolbarConfigService]);

  it('should ...',
      inject([ToolbarConfigService], (service: ToolbarConfigService) => {
    expect(service).toBeTruthy();
  }));
});
