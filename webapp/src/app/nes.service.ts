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
      this.client.subscribe('/hello', (update, flags) => {
        console.log("update: ", update);
        console.log("flags: ", flags);
      }, (err) => console.error("Nes", err));
      console.error(err);
    });
  }

}
