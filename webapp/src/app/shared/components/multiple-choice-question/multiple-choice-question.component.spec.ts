import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question.component';

describe('Component: MultipleChoiceQuestion', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [MultipleChoiceQuestionComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([MultipleChoiceQuestionComponent],
      (component: MultipleChoiceQuestionComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(MultipleChoiceQuestionComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(MultipleChoiceQuestionComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-multiple-choice-question></app-multiple-choice-question>
  `,
  directives: [MultipleChoiceQuestionComponent]
})
class MultipleChoiceQuestionComponentTestController {
}

