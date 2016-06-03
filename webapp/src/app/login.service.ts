import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  logout() {
    this.http.post(this.logoutUrl, "");
  }

  private handleError(err) {
    console.error("LoginService", err);
  }

}
