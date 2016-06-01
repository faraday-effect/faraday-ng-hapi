import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Section } from './shared';


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

  handleError(err: any) {
    console.error("SectionService", err);
  }

}

