import { Injectable } from '@angular/core';

@Injectable()
export class ToolbarConfig {

  title: string = "Welcome to Faraday";
  titleLink: string = "/";
  hidden: boolean = false;

}
