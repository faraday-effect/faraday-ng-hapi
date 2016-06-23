import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { QuizService } from './quiz.service';

describe('Quiz Service', () => {
  beforeEachProviders(() => [QuizService]);

  it('should ...',
      inject([QuizService], (service: QuizService) => {
    expect(service).toBeTruthy();
  }));
});
