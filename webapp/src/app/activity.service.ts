import { Injectable } from '@angular/core';

import { Activity } from './shared';

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
    details: 'json object - showing details'
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
    details: 'json object - showing details'
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
    details: 'json object - showing details'
  }
];

@Injectable()
export class ActivityService {

  constructor() {}

  getTodaysActivities() {
    return Promise.resolve(ACTIVITIES);
  }

}
