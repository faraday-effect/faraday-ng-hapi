import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { LoginUrl, LogoutUrl } from './constants';

// DEBUG
import { UsersUrl } from './constants';

@Injectable()
export class UserService {

  constructor(
    private http: Http) {}

  login(email: string, password: string) {
    let message = JSON.stringify({
      email: email.toLowerCase(),
      password: password,
    });
    return this.http.post(LoginUrl, message)
               .map(response => response.json())
               .catch(this.handleError);
  }

  logout() {
    return this.http.post(LogoutUrl, "")
               .map(response => response.json())
               .catch(this.handleError);
  }

  register(first_name, last_name, email, password) {
    let message = JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(),
      password: password,
    });
    return this.http.post(UsersUrl, message)
               .map(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log('LoginService: there is an error');
    console.log(error);
    return Observable.throw(errMsg);
  }

  // DEBUG
  getUsers() {
    return this.http.get(UsersUrl)
               .map(response => response.json())
               .catch(this.handleError);
  }

}
