import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Prefix } from './shared';

@Injectable()
export class PrefixService {

  private prefixesUrl = 'http://localhost:3000/prefix';  // URL to web api

  constructor(private http: Http) { }

  getPrefixes(): Promise<Prefix[]> {
    return this.http.get(this.prefixesUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPrefix(id: number) {
    return this.http.get(this.prefixesUrl+'/'+id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  handleError(err: any) {
    console.error("PrefixService", err);
  }

}
