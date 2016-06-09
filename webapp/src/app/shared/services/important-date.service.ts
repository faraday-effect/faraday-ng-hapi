import { Injectable } from '@angular/core';

import { ImportantDate } from '../models';

// MOCK
const IMPORTANTDATES: ImportantDate[] = [
  {
    id: 1,
    date: 'Due: Monday, 11/12/16',
    title:      'Assignment 4',
    description:
    'Yikes this one is brutal might as well give up now. Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit.'
  },
  {
    id: 2,
    date: 'Wednesday, 11/14/16 at 7 p.m.',
    title:      'Exam 2',
    description:
    'Could study, but doubtful that will help. Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit.'
  },
  {
    id: 1,
    date: 'Friday, 11/16/16; 7 a.m.',
    title:      'Chick-fil-A Field Trip',
    description:
    'Eat Mor Chikin.  Depart from the D.C.  Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit.'
  },
];

@Injectable()
export class ImportantDateService {

  constructor() {}

  getImportantDates() {
    return Promise.resolve(IMPORTANTDATES);
  }

}

