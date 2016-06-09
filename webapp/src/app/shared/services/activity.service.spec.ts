import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ActivityService } from './activity.service';

describe('Activity Service', () => {
  beforeEachProviders(() => [ActivityService]);

  it('should ...',
      inject([ActivityService], (service: ActivityService) => {
    expect(service).toBeTruthy();
  }));
});
