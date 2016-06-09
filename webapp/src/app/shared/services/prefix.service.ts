import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

//import { Prefix } from './shared';

@Injectable()
export class PrefixService {

  private prefixesUrl = 'http://localhost:3000/prefixes';  // URL to web api

  constructor(private http: Http) { }

  getPrefixes() {
    return this.http.get(this.prefixesUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getPrefix(id: number) {
    return this.http.get(this.prefixesUrl+'/'+id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log('PrefixService: there is an error');
    console.log(error);
    return Observable.throw(errMsg);
  }

}
