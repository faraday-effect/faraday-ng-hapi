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
import { ImportantDatesComponent } from './important-dates.component';

describe('Component: ImportantDates', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ImportantDatesComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ImportantDatesComponent],
      (component: ImportantDatesComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ImportantDatesComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ImportantDatesComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-important-dates></app-important-dates>
  `,
  directives: [ImportantDatesComponent]
})
class ImportantDatesComponentTestController {
}

