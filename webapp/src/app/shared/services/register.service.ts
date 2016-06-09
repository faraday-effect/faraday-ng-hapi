import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class RegisterService {

  private userUrl = "http://localhost:3000/users";

  constructor(
    private http: Http) {
  }

  register(first_name, last_name, email, password) {
    let message = JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(),
      password: password,
    });
    return this.http.post(this.userUrl, message)
               .map(response => response.json())
               .catch(this.handleError);
  }

  getUsers() {
    return this.http.get(this.userUrl)
               .map(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log('RegisterService: there is an error');
    console.log(error);
    return Observable.throw(errMsg);
  }

}
