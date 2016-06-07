import { Injectable } from '@angular/core';

import {
  Person,
  NesService,
} from './shared';

// MOCK
const PERSONS: Person[] = [
  { id: 1,  first_name: '01Abram', last_name: 'Stamper',  email: 'abram_stamper@taylor.edu' },
  { id: 2,  first_name: '02Keith', last_name: 'Bauson',   email: 'kwbauson@gmail.com' },
  { id: 3,  first_name: '03Ken',   last_name: 'Kiers',    email: 'knkiers@taylor.edu' },
  { id: 4,  first_name: '04Tom',   last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
  { id: 11, first_name: '05Abram', last_name: 'Stamper',  email: 'abram_stamper@taylor.edu' },
  { id: 12, first_name: '06Keith', last_name: 'Bauson',   email: 'kwbauson@gmail.com' },
  { id: 13, first_name: '07Ken',   last_name: 'Kiers',    email: 'knkiers@taylor.edu' },
  { id: 14, first_name: '08Tom',   last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
  { id: 21, first_name: '09Abram', last_name: 'Stamper',  email: 'abram_stamper@taylor.edu' },
  { id: 22, first_name: '10Keith', last_name: 'Bauson',   email: 'kwbauson@gmail.com' },
  { id: 23, first_name: '11Ken',   last_name: 'Kiers',    email: 'knkiers@taylor.edu' },
  { id: 24, first_name: '12Tom',   last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
  { id: 31, first_name: '13Abram', last_name: 'Stamper',  email: 'abram_stamper@taylor.edu' },
  { id: 32, first_name: '14Keith', last_name: 'Bauson',   email: 'kwbauson@gmail.com' },
  { id: 33, first_name: '15Ken',   last_name: 'Kiers',    email: 'knkiers@taylor.edu' },
  { id: 34, first_name: '16Tom',   last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
];

@Injectable()
export class AttendanceService {

  constructor(
    private nesService: NesService) {
  }

  getStudents() {
    return Promise.resolve(PERSONS);
  }

  handleArrive(handler: Function) {
    // MOCK
    let f = () => {
      setTimeout(() => {
        handler([this.randId()]);
        f();
      }, Math.random()*3000);
    };
    f();
  }

  handleDepart(handler: Function) {
    // MOCK
    let f = () => {
      setTimeout(() => {
        handler([this.randId()]);
        f();
      }, Math.random()*3000);
    };
    f();
  }

  private randId() {
    return Math.floor((Math.random() * PERSONS.length));
  }

}
