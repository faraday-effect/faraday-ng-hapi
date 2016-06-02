import { Component, OnInit } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {
  AttendanceService,
  Person,
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-attendance',
  templateUrl: 'attendance.component.html',
  styleUrls: ['attendance.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ],
})
export class AttendanceComponent implements OnInit {

  attending: [Person, boolean][] = [];

  constructor(
    private attendanceService: AttendanceService) {
  }

  ngOnInit() {
    this.attendanceService.getStudents().then(
      students => {
        for (let i in students) {
          this.attending[i] = [students[i], false];
        }
        this.attendanceService.handleArrive(
          is => {
            for (let i of is) {
              this.attending[i][1] = true;
            }
          }
        );
        this.attendanceService.handleDepart(
          is => {
            for (let i of is) {
              this.attending[i][1] = false;
            }
          }
        );
      }
    );
  }

  getPresent() {
    return this.attending.filter(at => at[1]);
  }

  getAbsent() {
    return this.attending.filter(at => ! at[1]);
  }

}
