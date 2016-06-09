import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { CourseService } from './course.service';

describe('Course Service', () => {
  beforeEachProviders(() => [CourseService]);

  it('should ...',
      inject([CourseService], (service: CourseService) => {
    expect(service).toBeTruthy();
  }));
});
