import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

declare var require: any;
var Nes = require('nes/client');

import { WebSocketUrl, WebSocketAuthUrl } from './constants';

@Injectable()
export class NesService {
  client: any;
  connected = false;
  toSubscribe = [];
  toRequest = [];

  constructor(private http: Http) { }

  startNes() {
    this.http.get(WebSocketAuthUrl).subscribe(() => {
      this.client = new Nes.Client(WebSocketUrl);
      this.client.connect(this.handleError);
      this.client.onConnect = () => {
        this.connected = true;
        for (let sub of this.toSubscribe) {
          this.subscribe(sub[0], sub[1]);
        }
        for (let req of this.toRequest) {
          this.request(req[0], req[1]);
        }
      };
    });
  }

  subscribe(path, callback) {
    if (this.connected) {
      this.client.subscribe(path, callback, this.handleError);
    } else {
      this.toSubscribe.push([path, callback]);
    }
  }

  request(path, callback) {
    if (this.connected) {
      this.client.request(path, callback);
    } else {
      this.toRequest.push([path, callback]);
    }
  }

  handleError(err) {
    if (err) {
      console.error('Nes', err);
    }
  }

}
