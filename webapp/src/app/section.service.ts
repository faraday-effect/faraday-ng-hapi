import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Section } from './shared';

// MOCK
const SECTIONS: any[] = [
  {
    id: 1,
    course: {
      id: 1,
      prefix: 'COS',
      number: '121',
      title: 'Foundations of Comp Sci',
      active: true,
      department_id: 1,
    },
    term_id: 1,
    reg_number: '12345',
    title: 'Section 1'
  },
  {
    id: 2,
    course: {
      id: 2,
      prefix: 'COS',
      number: '243',
      title: 'Multi-Tier Web Applications',
      active: true,
      department_id: 1,
    },
    term_id: 1,
    reg_number: '54321',
    title: 'Section 2'
  },
];


@Injectable()
export class SectionService {

  private sectionUrl = 'http://localhost:3000/sections';  // URL to web api

  constructor(private http: Http) { }

  getSections(): Promise<Section[]> {
    return this.http.get(this.sectionUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSection(id: number) {
    return this.http.get(this.sectionUrl+'/'+id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  // FIXME MOCK method
  getMockSections() {
    return Promise.resolve(SECTIONS);
  }

  // FIXME MOCK method
  getMockSection(id: number) {
    return Promise.resolve(SECTIONS[0]);
  }

  handleError(err: any) {
    console.error("SectionService", err);
  }

}
