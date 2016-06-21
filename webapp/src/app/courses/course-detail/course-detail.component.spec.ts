/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CourseDetailComponent } from './course-detail.component';

describe('Component: CourseDetail', () => {
  it('should create an instance', () => {
    let component = new CourseDetailComponent();
    expect(component).toBeTruthy();
  });
});
