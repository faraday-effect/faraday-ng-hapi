import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

//import { Prefix } from './shared';
import { PrefixesUrl } from './constants';

@Injectable()
export class PrefixService {

  constructor(private http: Http) { }

  getPrefixes() {
    return this.http.get(PrefixesUrl)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getPrefix(id: number) {
    return this.http.get(PrefixesUrl+'/'+id)
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
