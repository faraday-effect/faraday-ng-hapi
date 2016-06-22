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
import { TodaysTopicsComponent } from './todays-topics.component';

describe('Component: TodaysTopics', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [TodaysTopicsComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([TodaysTopicsComponent],
      (component: TodaysTopicsComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(TodaysTopicsComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(TodaysTopicsComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-todays-topics></app-todays-topics>
  `,
  directives: [TodaysTopicsComponent]
})
class TodaysTopicsComponentTestController {
}

