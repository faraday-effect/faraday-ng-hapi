import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {
  Person,
  NesService,
} from './shared';

// MOCK
const PERSONS: Person[] = [
  { id: 1,  first_name: 'Abram', last_name: 'Stamper',  email: 'abram_stamper@taylor.edu' },
  { id: 2,  first_name: 'Keith', last_name: 'Bauson',   email: 'kwbauson@gmail.com' },
  { id: 3,  first_name: 'Ken',   last_name: 'Kiers',    email: 'knkiers@taylor.edu' },
  { id: 4,  first_name: 'Tom',   last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
  { id: 11, first_name: 'Abram', last_name: 'Stamper',  email: 'abram_stamper@taylor.edu' },
  { id: 12, first_name: 'Keith', last_name: 'Bauson',   email: 'kwbauson@gmail.com' },
  { id: 13, first_name: 'Ken',   last_name: 'Kiers',    email: 'knkiers@taylor.edu' },
  { id: 14, first_name: 'Tom',   last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
  { id: 21, first_name: 'Abram', last_name: 'Stamper',  email: 'abram_stamper@taylor.edu' },
  { id: 22, first_name: 'Keith', last_name: 'Bauson',   email: 'kwbauson@gmail.com' },
  { id: 23, first_name: 'Ken',   last_name: 'Kiers',    email: 'knkiers@taylor.edu' },
  { id: 24, first_name: 'Tom',   last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
  { id: 31, first_name: 'Abram', last_name: 'Stamper',  email: 'abram_stamper@taylor.edu' },
  { id: 32, first_name: 'Keith', last_name: 'Bauson',   email: 'kwbauson@gmail.com' },
  { id: 33, first_name: 'Ken',   last_name: 'Kiers',    email: 'knkiers@taylor.edu' },
  { id: 34, first_name: 'Tom',   last_name: 'Nurkkala', email: 'thnurkkala@taylor.edu' },
];

@Injectable()
export class AttendanceService {

  sectionsUrl = "http://localhost:3000/sections";

  arriveHandler: Function;
  departHandler: Function;

  constructor(
    private nesService: NesService,
    private http: Http) {
  }

  getStudents(id) {
    return Promise.resolve(PERSONS);
    /*
    return this.http.get(this.sectionsUrl+`/${id}/students`)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    //*/
  }

  handleArrive(handler: Function) {
    this.arriveHandler = handler;
  }

  handleDepart(handler: Function) {
    this.departHandler = handler;
  }

  attend(id: number) {
    this.arriveHandler([id]);
  }

  depart(id: number) {
    this.departHandler([id]);
  }

  handleError(err) {
    console.log("AttendanceService", err);
  }

  private randId() {
    return Math.floor((Math.random() * PERSONS.length));
  }

}
