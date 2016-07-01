import { Injectable } from '@angular/core';

@Injectable()
export class ToolbarConfigService {

  public title: string = "Welcome to Faraday";
  public titleLink: string = "/";
  public hidden: boolean = false;

  constructor() {}

}
