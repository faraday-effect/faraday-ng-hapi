import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Term } from './shared';

@Injectable()
export class TermService {

  private termsUrl = 'http://localhost:3000/term';  // URL to web api

  constructor(private http: Http) { }

  getTerms(): Promise<Term[]> {
    return this.http.get(this.termsUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTerm(id: number) {
    return this.http.get(this.termsUrl+'/'+id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  handleError(err: any) {
    console.error("TermService", err);
  }

}
