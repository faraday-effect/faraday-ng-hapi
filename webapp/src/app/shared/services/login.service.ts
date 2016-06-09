import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class LoginService {

  private loginUrl = "http://localhost:3000/login";
  private logoutUrl = "http://localhost:3000/logout";

  constructor(
    private http: Http) {}

  login(email: string, password: string) {
    let message = JSON.stringify({
      email: email.toLowerCase(),
      password: password,
    });
    return this.http.post(this.loginUrl, message)
        .map(response => response.json())
        .catch(this.handleError);
  }

  logout() {
    return this.http.post(this.logoutUrl, "")
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

//  private handleError(err) {
//    console.error("LoginService", err);
//  }

}
