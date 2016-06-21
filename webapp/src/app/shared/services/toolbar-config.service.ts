import { Injectable } from '@angular/core';

@Injectable()
export class ToolbarConfigService {

  public title: string = "Faraday";
  public titleLink: string = "/";
  public hidden: boolean = false;

  constructor() {}

}
