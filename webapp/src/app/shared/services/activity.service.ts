import { Injectable } from '@angular/core';

import { Activity } from '../models';

// MOCK
const ACTIVITIES: Activity[] = [
  {
    id: 1,
    title:      'Multi-Core Processors',
    description:
    'Secondary line text Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit. Nam sollicitudin urna' +
    'a auctor fringilla. Quisque placerat pellentesque ornare. ' +
    'In pharetra enim id metus malesuada, nec condimentum dolor' +
    'luctus. Suspendisse mollis aliquet urna congue lacinia.',
    details: 'json object - showing details',
    slides: [
      {
        id: 1,
        title: 'Single CPU Core',
        slideDetail: 'json object - slide#1 detail'
      },
      {
        id: 2,
        title: 'Quiz',
        slideDetail: 'json object - slide#2 detail'
      },
      {
        id: 3,
        title: 'Additional Material',
        slideDetail: 'json object - slide#3 detail'
      }
        ],
  },
  {
    id: 2,
    title:      'Debugging Like Krazy',
    description:
    'Secondary line text Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit. Nam sollicitudin urna' +
    'a auctor fringilla. Quisque placerat pellentesque ornare. ' +
    'In pharetra enim id metus malesuada, nec condimentum dolor' +
    'luctus. Suspendisse mollis aliquet urna congue lacinia.',
    details: 'json object - showing details',
    slides: [],
  },
  {
    id: 3,
    title:      'Pthreads Library',
    description:
    'Secondary line text Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit. Nam sollicitudin urna' +
    'a auctor fringilla. Quisque placerat pellentesque ornare. ' +
    'In pharetra enim id metus malesuada, nec condimentum dolor' +
    'luctus. Suspendisse mollis aliquet urna congue lacinia.',
    details: 'json object - showing details',
    slides: [],
  }
];

@Injectable()
export class ActivityService {

  constructor() {}

  getTodaysActivities() {
    return Promise.resolve(ACTIVITIES);
  }

}
