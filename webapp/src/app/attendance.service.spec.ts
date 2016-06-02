import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { AttendanceService } from './attendance.service';

describe('Attendance Service', () => {
  beforeEachProviders(() => [AttendanceService]);

  it('should ...',
      inject([AttendanceService], (service: AttendanceService) => {
    expect(service).toBeTruthy();
  }));
});
