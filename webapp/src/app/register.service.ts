import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getUsers() {
    return this.http.get(this.userUrl)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(err) {
    console.error("RegisterService", err);
  }

}
