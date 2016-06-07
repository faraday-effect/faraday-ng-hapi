import { Injectable } from '@angular/core';

declare var require: any;
var Nes = require('nes/client');

@Injectable()
export class NesService {
  wsUrl = 'ws://localhost:3000';
  client: any;

  constructor() {
    this.startNes();
  }

  startNes() {
    this.client = new Nes.Client(this.wsUrl);
    this.client.connect(err => {

      let handleError = err => {
        if (err) {
          console.error("Nes", err);
        }
      };

      this.client.subscribe('/attendence', (update, flags) => {
        console.log("update: ", update);
        console.log("flags: ", flags);
      }, handleError);

      this.client.request('/hello', (err, payload) => {
        handleError(err);
        console.log("payload: ", payload);
      });

      if (err) {
        console.error(err);
      }
    });
  }

}
