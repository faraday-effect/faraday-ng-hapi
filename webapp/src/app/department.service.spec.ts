import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { DepartmentService } from './department.service';

describe('Department Service', () => {
  beforeEachProviders(() => [DepartmentService]);

  it('should ...',
      inject([DepartmentService], (service: DepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
