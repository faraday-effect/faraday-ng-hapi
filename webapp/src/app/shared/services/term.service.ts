import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

//import { Term } from './shared';
import { TermsUrl } from './constants';

@Injectable()
export class TermService {

  constructor(private http: Http) { }

  getTerms() {
    return this.http.get(TermsUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getTerm(id: number) {
    return this.http.get(TermsUrl+'/'+id)
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
