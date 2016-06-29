import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { LoginUrl, LogoutUrl } from './constants';
import { NesService } from './nes.service';

// DEBUG
import { UsersUrl } from './constants';

@Injectable()
export class UserService {

  public user: any = {};
  public isLoggedIn: boolean = false;

  constructor(
    private nesService: NesService,
    private http: Http) {
    this.getCurrentUser().subscribe();
  }

  getCurrentUser() {
    return this.http.get(LoginUrl)
      .map(response => response.json())
      .map(json => this.user = json)
      .map(() => this.isLoggedIn = this.user.id != undefined)
      .catch(this.handleError);
  }

  login(email: string, password: string) {
    let message = JSON.stringify({
      email: email.toLowerCase(),
      password: password,
    });
    return this.http.post(LoginUrl, message)
               .map(response => response.json())
               .map(json => this.user = json)
               .map(() => this.isLoggedIn = true)
               .map(() => this.nesService.startNes())
               .catch(this.handleError);
  }

  logout() {
    return this.http.post(LogoutUrl, "")
               .map(() => this.isLoggedIn = false)
               .map(() => this.user = {})
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
    console.log('UserService: there is an error');
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
