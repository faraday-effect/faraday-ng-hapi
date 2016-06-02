import { Injectable } from '@angular/core';

import {
  Person,
} from './shared';

// MOCK
const PERSONS: Person[] = [
  { id: 1, first_name: 'Abram', last_name: 'Stamper', email: 'abram_stamper@taylor.edu' },
  { id: 2, first_name: 'Keith', last_name: 'Bauson', email: 'kwbauson@gmail.com' },
  { id: 3, first_name: 'Ken', last_name: 'Kiers', email: 'knkiers@taylor.edu' },
  { id: 4, first_name: 'Tom', last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
  { id: 11, first_name: 'Abram', last_name: 'Stamper', email: 'abram_stamper@taylor.edu' },
  { id: 12, first_name: 'Keith', last_name: 'Bauson', email: 'kwbauson@gmail.com' },
  { id: 13, first_name: 'Ken', last_name: 'Kiers', email: 'knkiers@taylor.edu' },
  { id: 14, first_name: 'Tom', last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
  { id: 21, first_name: 'Abram', last_name: 'Stamper', email: 'abram_stamper@taylor.edu' },
  { id: 22, first_name: 'Keith', last_name: 'Bauson', email: 'kwbauson@gmail.com' },
  { id: 23, first_name: 'Ken', last_name: 'Kiers', email: 'knkiers@taylor.edu' },
  { id: 24, first_name: 'Tom', last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
  { id: 31, first_name: 'Abram', last_name: 'Stamper', email: 'abram_stamper@taylor.edu' },
  { id: 32, first_name: 'Keith', last_name: 'Bauson', email: 'kwbauson@gmail.com' },
  { id: 33, first_name: 'Ken', last_name: 'Kiers', email: 'knkiers@taylor.edu' },
  { id: 34, first_name: 'Tom', last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
];

@Injectable()
export class AttendanceService {

  constructor() {}

  getStudents() {
    return Promise.resolve(PERSONS);
  }

  handle(handler: Function) {
    // MOCK
    setTimeout(() => handler([0,1]), 1000);
    setTimeout(() => handler([2]), 2000);
    setTimeout(() => handler([3]), 3000);
  }

}
