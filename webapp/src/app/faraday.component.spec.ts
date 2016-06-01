import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { FaradayAppComponent } from '../app/faraday.component';

beforeEachProviders(() => [FaradayAppComponent]);

describe('App: Faraday', () => {
  it('should create the app',
      inject([FaradayAppComponent], (app: FaradayAppComponent) => {
    expect(app).toBeTruthy();
  }));
});
