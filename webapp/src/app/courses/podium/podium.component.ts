import { Component, OnInit } from '@angular/core';
import { ToolbarConfig } from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-podium',
  templateUrl: 'podium.component.html',
  styleUrls: ['podium.component.css'],
})
export class PodiumComponent implements OnInit {

  constructor(private toolbarConfig: ToolbarConfig) {}

  ngOnInit() {
    this.toolbarConfig.title = 'Podium';
  }

}
