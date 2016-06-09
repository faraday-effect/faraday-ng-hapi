import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

//import { Term } from './shared';

@Injectable()
export class TermService {

  private termsUrl = 'http://localhost:3000/terms';  // URL to web api

  constructor(private http: Http) { }

  getTerms() {
    return this.http.get(this.termsUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getTerm(id: number) {
    return this.http.get(this.termsUrl+'/'+id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log('TermService: there is an error');
    console.log(error);
    return Observable.throw(errMsg);
  }

}
